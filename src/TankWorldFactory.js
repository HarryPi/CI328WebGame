"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_component_1 = require("./component/camera.component");
const movable_component_1 = require("./component/movable.component");
const entity_1 = require("./entities/entity");
const GameConstants_1 = require("./constants/GameConstants");
const physics_component_1 = require("./component/physics.component");
const levelOne_1 = require("./config/levels/levelOne");
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
class TankWorldFactory {
    constructor(game) {
        // Arrays
        this._levels = [];
        this._entities = [];
        this._levels.push(new levelOne_1.LevelOne(game));
        this._levels.forEach((level) => {
            level.init();
        });
        this._currentLevel = this._levels[0];
        this._game = game;
        // init collision groups
        this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._bulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();
        // Have to do this here as we cannot enforce layer to be Entity to attach component
        this._currentLevel.collisionLayer.forEach((layer) => {
            layer.setCollisionGroup(this._groundCollisionGroup);
            layer.collides([
                this._tankCollisionGroup, this._bulletCollisionGroup,
                this._enemyBulletsCollisionGroup, this._enemyTankCollisionGroup
            ]);
        });
        // Force all groups to collide with world bounds
        this._game.physics.p2.updateBoundsCollisionGroup();
    }
    newPlayer() {
        let player = new entity_1.Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(),
            new camera_component_1.CameraComponent(this._game),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent()]);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .delayGravity(false);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.CANDY_HUNTER);
        player.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._tankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyBulletsCollisionGroup, [GameConstants_1.Action.NOTHING]);
        this._entities.push(player);
        this._player = player;
        this._player.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        return player;
    }
    newEnemy() {
        let enemy = new entity_1.Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y, null)
            .withComponent([
            new movable_component_1.MovableComponent(),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent(),
            new state_component_1.StateComponent(),
            new ai_component_1.AiComponent(this._player)
        ]);
        enemy.getComponent(GameConstants_1.ComponentType.STATE)
            .addState(GameConstants_1.FSMStates.SEEK, new seek_state_1.SeekState())
            .addState(GameConstants_1.FSMStates.IDLE, new idle_state_1.IdleState())
            .addState(GameConstants_1.FSMStates.FIRING, new firing_state_1.FiringState())
            .setState(GameConstants_1.FSMStates.IDLE);
        enemy.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .flipSprite();
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.DARK_ARTILLERY);
        enemy.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyTankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._bulletCollisionGroup, [GameConstants_1.Action.NOTHING]);
        this._entities.push(enemy);
        enemy.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        return enemy;
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([new physics_component_1.PhysicsComponent(this._game), new layer_component_1.LayerComponent(),
            new bullet_component_1.BulletComponent(this._game), new collisions_component_1.CollisionsComponent(),
            new owner_component_1.OwnerComponent()]);
        bullet.getComponent(GameConstants_1.ComponentType.OWNER).owner = owner;
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.BULLET_FIVE);
        bullet.getComponent(GameConstants_1.ComponentType.BULLET)
            .bulletInit();
        bullet.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this.setBulletColisionGroup(owner))
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.EXPLODE, GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.EXPLODE]);
        this._entities.push(bullet);
        return bullet;
    }
    get entities() {
        return this._entities;
    }
    setBulletColisionGroup(owner) {
        if (owner.sprite.data.tag === this._player.sprite.data.tag) {
            return this._bulletCollisionGroup;
        }
        return this._enemyBulletsCollisionGroup;
    }
}
exports.default = TankWorldFactory;
//# sourceMappingURL=TankWorldFactory.js.map