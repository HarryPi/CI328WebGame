"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_component_1 = require("./component/camera.component");
const movable_component_1 = require("./component/movable.component");
const entity_1 = require("./entities/entity");
const GameConstants_1 = require("./constants/GameConstants");
const physics_component_1 = require("./component/physics.component");
const shoot_component_1 = require("./component/shoot.component");
const layer_component_1 = require("./component/layer.component");
const bullet_component_1 = require("./component/bullet.component");
const collisions_component_1 = require("./component/collisions.component");
const ai_component_1 = require("./component/ai.component");
const state_component_1 = require("./component/state.component");
const idle_state_1 = require("./fsm/idle.state");
const seek_state_1 = require("./fsm/seek.state");
const firing_state_1 = require("./fsm/firing.state");
const owner_component_1 = require("./component/owner.component");
const guid_1 = require("./util/guid");
const flee_state_1 = require("./fsm/flee.state");
const tank_component_1 = require("./component/tank.component");
const data_config_1 = require("./config/data.config");
const health_component_1 = require("./component/health.component");
/**
 * @class TankWorldFactory
 * @description
 * This is the game factory and exposes functions to
 * create a new player {@link TankWorldFactory#newPlayer}
 * create a new bullet {@link TankWorldFactory#newBullet}
 * create a new enemy {@link TankWorldFactory#newEnemy}
 * start spawning enemies {@Link TankWorldFactory#spawnEnemiesAsCurrentLevel}
 * All of the above are dependant on the information passed to the factory by what {@link TankLevel} is loaded
 * */
class TankWorldFactory {
    /**
     * @constructor
     * @param {Phaser.Game} game
     * @param state - Current state
     * */
    constructor(game, state) {
        this._entitiesSubscriptions = []; // Keep a record of the subscriptions to remove later
        // Arrays
        this._entities = [];
        // keep record of spawn time in miliseconds
        this._timer = 0;
        this._enemiesCount = 0; // Enemies in game
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
            .withComponent([new movable_component_1.MovableComponent(),
            new camera_component_1.CameraComponent(this._game),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent(),
            new health_component_1.HealthComponent(),
            new tank_component_1.TankComponent(data_config_1.DataConfig.tank)]);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        player.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.health);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics();
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(data_config_1.DataConfig.tank);
        player.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._tankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyBulletsCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(player);
        this._player = player;
        this._player.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        player.whenDestroyed.subscribe(() => {
            this._game.state.start(GameConstants_1.States.GAMEOVER_SATE, true, false);
        });
        return player;
    }
    /**
     * @description
     * Creates a new enemy based on the loaded level {@link TankLevel#enemyStartPos}
     * */
    newEnemy() {
        let kindOfTank = this.currentLevel.getRandomEnemy(); // As each level can have many random enemies
        // Get one store it and use it where appropriate
        let enemy = new entity_1.Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y, null)
            .withComponent([
            new movable_component_1.MovableComponent(),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent(),
            new state_component_1.StateComponent(),
            new ai_component_1.AiComponent(this._player),
            new health_component_1.HealthComponent(),
            new tank_component_1.TankComponent(kindOfTank)
        ]);
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        enemy.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.enemyHealth);
        enemy.getComponent(GameConstants_1.ComponentType.STATE)
            .addState(GameConstants_1.FSMStates.SEEK, new seek_state_1.SeekState())
            .addState(GameConstants_1.FSMStates.IDLE, new idle_state_1.IdleState())
            .addState(GameConstants_1.FSMStates.FIRING, new firing_state_1.FiringState())
            .addState(GameConstants_1.FSMStates.FLEEING, new flee_state_1.FleeState())
            .setState(GameConstants_1.FSMStates.IDLE);
        enemy.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .flipSprite();
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(kindOfTank);
        enemy.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyTankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._playerBulletCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.NOTHING]);
        this._entities.push(enemy);
        // NECESSARY FOR BULLET TO GET CORRECT GROUP
        enemy.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        let sub = enemy.whenDestroyed.subscribe(() => {
            const index = this._entities.indexOf(enemy);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return enemy;
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([new physics_component_1.PhysicsComponent(this._game),
            new layer_component_1.LayerComponent(),
            new bullet_component_1.BulletComponent(this._game),
            new collisions_component_1.CollisionsComponent(),
            new health_component_1.HealthComponent(),
            new owner_component_1.OwnerComponent()]);
        bullet.getComponent(GameConstants_1.ComponentType.OWNER).owner = owner;
        bullet.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(1);
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.BULLET_FIVE);
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
    spawnEnemiesAsCurrentLevel() {
        if (this.currentLevel) {
            if (typeof this.currentLevel.enemiesCount === 'number' && this.currentLevel.enemiesSpawnTime) {
                // typeof is there as enemiesCount can be 0 and javascript considers that as false what we are looking to avoid is typeof 'undefined'
                if (this.currentLevel.enemiesCount < this.currentLevel.capEnemies) {
                    if (Date.now() - this._timer > this.currentLevel.enemiesSpawnTime * 1000) {
                        this.newEnemy();
                        this.currentLevel.enemiesCount++;
                        this._timer = Date.now();
                    }
                }
            }
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