"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entities/entity");
const guid_1 = require("./util/guid");
const data_config_1 = require("./config/data.config");
const GameConstants_1 = require("./constants/GameConstants");
const fsm_states_1 = require("./AI/fsm/fsm.states");
const collision_components_1 = require("./component/collision.components");
const control_components_1 = require("./component/control.components");
const data_components_1 = require("./component/data.components");
const action_components_1 = require("./component/action.components");
var IdleState = fsm_states_1.FsmStates.IdleState;
var PursuingState = fsm_states_1.FsmStates.PursuingState;
var FleeState = fsm_states_1.FsmStates.FleeState;
var SeekState = fsm_states_1.FsmStates.SeekState;
var PhysicsComponent = collision_components_1.CollisionComponents.PhysicsComponent;
var CollisionsComponent = collision_components_1.CollisionComponents.CollisionsComponent;
var CameraComponent = control_components_1.ControlComponents.CameraComponent;
var AiComponent = control_components_1.ControlComponents.AiComponent;
var BulletComponent = control_components_1.ControlComponents.BulletComponent;
var LayerComponent = data_components_1.DataComponents.LayerComponent;
var HealthComponent = data_components_1.DataComponents.HealthComponent;
var TankComponent = data_components_1.DataComponents.TankComponent;
var OwnerComponent = data_components_1.DataComponents.OwnerComponent;
var MovableComponent = action_components_1.ActionComponents.MovableComponent;
var ShootComponent = action_components_1.ActionComponents.ShootComponent;
var SuicideState = fsm_states_1.FsmStates.SuicideState;
const math_util_1 = require("./util/math.util");
const vector_1 = require("./util/vector");
var EvadeState = fsm_states_1.FsmStates.EvadeState;
const state_component_1 = require("./component/state.component");
var DisasterComponent = control_components_1.ControlComponents.DisasterComponent;
/**
 * @class TankWorldFactory
 * @description
 * This is the game factory and exposes functions to
 * create a new player {@link TankWorldFactory#newPlayer}
 * create a new bullet {@link TankWorldFactory#newBullet}
 * create a new enemy {@link TankWorldFactory#newEnemy}
 * start spawning enemies {@Link TankWorldFactory#spawnEnemies}
 * All of the above are dependant on the information passed to the factory by what {@link TankLevel} is loaded
 * */
class TankWorldFactory {
    /**
     * @constructor
     * @param {Phaser.Game} game
     * @param state - Current conditions
     * */
    constructor(game, state) {
        this._entitiesSubscriptions = []; // Keep a record of the subscriptions to remove later
        // Arrays
        this._entities = [];
        this._game = game;
        this._currentState = state;
    }
    init() {
        // init collision groups
        this._currentLevel.init();
        this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._playerBulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();
        // Have to do this here as we cannot enforce layer to be Entity to attach component
        this._currentLevel.collisionLayer.forEach((layer) => {
            layer.setCollisionGroup(this._groundCollisionGroup);
            layer.collides([
                this._tankCollisionGroup,
                this._playerBulletCollisionGroup,
                this._enemyBulletsCollisionGroup,
                this._enemyTankCollisionGroup
            ]);
        });
        // Force all groups to collide with world bounds
        this._game.physics.p2.updateBoundsCollisionGroup();
    }
    /**
     * @description
     * Creates a new player based on the loaded level {@link TankLevel#playerStartPos}
     * */
    newPlayer() {
        let player = new entity_1.Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
            .withComponent([new MovableComponent(),
            new CameraComponent(this._game),
            new PhysicsComponent(this._game),
            new ShootComponent(this._game, this),
            new LayerComponent(),
            new CollisionsComponent(),
            new HealthComponent(),
            new TankComponent(data_config_1.DataConfig.tank)]);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        player.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.playerMaxHealth);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics();
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(data_config_1.DataConfig.tank);
        player.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._tankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyBulletsCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(player);
        this._player = player;
        this._player.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        let sub = player.whenDestroyed.subscribe(() => {
            this._game.state.start(GameConstants_1.States.GAMEOVER_SATE, true, false);
            sub.unsubscribe();
        });
        return player;
    }
    /**
     * @description
     * Creates a new enemy based on the loaded level {@link TankLevel#enemyStartPos}
     * */
    newEnemy(subFunction) {
        let kindOfTank = this.currentLevel.getRandomEnemy(); // As each level can have many random enemies
        // Get one store it and use it where appropriate
        const startingPost = new vector_1.default();
        const random = math_util_1.MathUtil.randomIntFromInterval(0, 1);
        if (random === 1) {
            startingPost.x = this.currentLevel.playerStartPos.x;
            startingPost.y = this.currentLevel.playerStartPos.y;
        }
        else {
            startingPost.x = this.currentLevel.enemyStartPos.x;
            startingPost.y = this.currentLevel.enemyStartPos.y;
        }
        let enemy = new entity_1.Entity(this._game, startingPost.x, startingPost.y, null)
            .withComponent([
            new MovableComponent(),
            new PhysicsComponent(this._game),
            new ShootComponent(this._game, this),
            new LayerComponent(),
            new CollisionsComponent(),
            new state_component_1.StateComponent(),
            new AiComponent(this._player, this._entities.filter((entity) => {
                return entity.hasComponent(GameConstants_1.ComponentType.AI);
            })),
            new HealthComponent(),
            new TankComponent(kindOfTank)
        ]);
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        enemy.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.enemyHealth);
        enemy.getComponent(GameConstants_1.ComponentType.STATE)
            .addState(GameConstants_1.FsmStateName.SEEK, new SeekState())
            .addState(GameConstants_1.FsmStateName.IDLE, new IdleState())
            .addState(GameConstants_1.FsmStateName.PURSUING, new PursuingState())
            .addState(GameConstants_1.FsmStateName.FLEEING, new FleeState())
            .addState(GameConstants_1.FsmStateName.SUICIDE, new SuicideState())
            .addState(GameConstants_1.FsmStateName.EVADE, new EvadeState())
            .setState(GameConstants_1.FsmStateName.IDLE);
        enemy.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics();
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(kindOfTank);
        enemy.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyTankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._playerBulletCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(enemy);
        // NECESSARY FOR BULLET TO GET CORRECT GROUP
        enemy.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        let sub = enemy.whenDestroyed.subscribe(() => {
            // this is to ensure when the entity is destroyed all memorie refs are released for garbage collection
            subFunction();
            const index = this._entities.indexOf(enemy);
            this._entities.splice(index, 1);
            this._currentLevel.enemiesCount--;
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return enemy;
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([
            new PhysicsComponent(this._game),
            new LayerComponent(),
            new BulletComponent(this._game),
            new CollisionsComponent(),
            new HealthComponent(),
            new OwnerComponent()
        ]);
        bullet.getComponent(GameConstants_1.ComponentType.OWNER).owner = owner;
        bullet.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(1);
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false)
            .scaleSprite(owner.sprite.scale.x);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(owner.getComponent(GameConstants_1.ComponentType.TANK).bulletKind);
        bullet.getComponent(GameConstants_1.ComponentType.BULLET)
            .bulletInit();
        bullet.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this.setBulletColisionGroup(owner))
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        this._entities.push(bullet);
        let sub = bullet.whenDestroyed.subscribe(() => {
            const index = this._entities.indexOf(bullet);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return bullet;
    }
    newDisaster(x, y) {
        let disaster = new entity_1.Entity(this._game, x, y)
            .withComponent([
            new PhysicsComponent(this._game),
            new LayerComponent(),
            new CollisionsComponent(),
            new DisasterComponent(),
            new HealthComponent()
        ]);
        disaster.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false);
        disaster.getComponent(GameConstants_1.ComponentType.LAYER)
            .addLayer(getRandomLayout())
            .addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        disaster.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(1);
        disaster.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyBulletsCollisionGroup)
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(disaster);
        let sub = disaster.whenDestroyed.subscribe(() => {
            const index = this._entities.indexOf(disaster);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return disaster;
        function getRandomLayout() {
            let random = math_util_1.MathUtil.randomIntFromInterval(0, 5);
            let tankLayout = () => {
                switch (random) {
                    case 0:
                        return GameConstants_1.TankLayout.BULLET_ONE;
                    case 1:
                        return GameConstants_1.TankLayout.BULLET_TWO;
                    case 2:
                        return GameConstants_1.TankLayout.BULLET_THREE;
                    case 3:
                        return GameConstants_1.TankLayout.BULLET_FOUR;
                    case 4:
                        return GameConstants_1.TankLayout.BULLET_FIVE;
                }
            };
            return tankLayout();
        }
    }
    cleanUp() {
        this._currentLevel.destroy();
        this._entities = null;
        this._entitiesSubscriptions.forEach((e) => {
            e.unsubscribe();
        });
    }
    get entities() {
        return this._entities;
    }
    setBulletColisionGroup(owner) {
        if (owner.sprite.data.tag === this._player.sprite.data.tag) {
            return this._playerBulletCollisionGroup;
        }
        return this._enemyBulletsCollisionGroup;
    }
    get currentLevel() {
        return this._currentLevel;
    }
    set currentLevel(value) {
        this._currentLevel = value;
    }
}
exports.default = TankWorldFactory;
//# sourceMappingURL=TankWorldFactory.js.map