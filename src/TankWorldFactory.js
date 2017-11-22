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
class TankWorldFactory {
    // Collision Groups
    // They must be created after world boundaries have been finalized/fixed for the groups to collide with bondaries
    /* private _tanksCollisionGroup: CollisionGroup;
     private _groundCollisionGroup: CollisionGroup;
     private _bulletsCollisionGroup: CollisionGroup;
   */
    constructor(game) {
        // Arrays
        this._levels = [];
        this._levelGroupBodies = [];
        this._entities = [];
        this._levels.push(new levelOne_1.LevelOne(game));
        this._levels.forEach((level) => {
            level.init();
        });
        this._currentLevel = this._levels[0];
        this._game = game;
        this._levelGroupBodies = this._currentLevel.collisionLayer;
        /*
        
            this._bulletsCollisionGroup = game.physics.p2.createCollisionGroup();
            this._tanksCollisionGroup = game.physics.p2.createCollisionGroup();
            this._groundCollisionGroup = game.physics.p2.createCollisionGroup();
        */
    }
    newPlayer() {
        let player = new entity_1.Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(), new camera_component_1.CameraComponent(this._game),
            new physics_component_1.PhysicsComponent(this._game), new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(), new collisions_component_1.CollisionsComponent()]);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .delayGravity(false);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.CANDY_HUNTER);
        //  player.getComponent<CollisionsComponent>(ComponentType.COLLISION).enableCollision(this._tanksCollisionGroup, [this._bulletsCollisionGroup, this._groundCollisionGroup]);
        this._entities.push(player);
        return player;
    }
    newEnemy() {
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([new physics_component_1.PhysicsComponent(this._game), new layer_component_1.LayerComponent(),
            new bullet_component_1.BulletComponent(this._game), new collisions_component_1.CollisionsComponent()])
            .withOwner(owner);
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false)
            .delayGravity(true);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.BULLET_FIVE);
        bullet.getComponent(GameConstants_1.ComponentType.BULLET).bulletInit();
        //  bullet.getComponent<CollisionsComponent>(ComponentType.COLLISION).enableCollision(this._bulletsCollisionGroup, [this._tanksCollisionGroup, this._groundCollisionGroup]);
        bullet.sprite.body.
            this._entities.push(bullet);
        return bullet;
    }
    get entities() {
        return this._entities;
    }
}
exports.default = TankWorldFactory;
//# sourceMappingURL=TankWorldFactory.js.map