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
const vector_1 = require("./util/vector");
class TankWorldFactory {
    constructor(game) {
        this._levels = [];
        this._levels.push(new levelOne_1.LevelOne(game));
        this._levels.forEach((level) => {
            level.init();
        });
        this._currentLevel = this._levels[0];
        this._game = game;
        this._bullets = game.physics.p2.createCollisionGroup();
        this._levelCollisionLayer = this._currentLevel.collisionLayer;
    }
    newPlayer() {
        let player = new entity_1.Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(), new camera_component_1.CameraComponent(this._game),
            new physics_component_1.PhysicsComponent(this._game), new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent()]);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS).addPhysics();
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.CANDY_HUNTER);
        return player;
    }
    newEnemy() {
    }
    newBullet(x, y) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([new physics_component_1.PhysicsComponent(this._game), new layer_component_1.LayerComponent()]);
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(0, new vector_1.default(1.4, 0.9))
            .setVelocity(new vector_1.default(1500, 0));
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.BULLET_FIVE);
        return bullet;
    }
}
exports.default = TankWorldFactory;
//# sourceMappingURL=TankWorldFactory.js.map