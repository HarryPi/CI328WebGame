"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const camera_component_1 = require("./component/camera.component");
const movable_component_1 = require("./component/movable.component");
const entity_1 = require("./entities/entity");
const world_service_1 = require("./serivce/world.service");
const GameConstants_1 = require("./constants/GameConstants");
const physics_component_1 = require("./component/physics.component");
const physics_service_1 = require("./serivce/physics.service");
class TankWorldFactory {
    constructor() {
    }
    static newPlayer(game) {
        let player = new entity_1.Entity(game, world_service_1.default.level.playerStartPos.x, world_service_1.default.level.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(), new camera_component_1.CameraComponent(game), new physics_component_1.PhysicsComponent(game)]);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        physics_service_1.default.enablePhysics(player);
        return player;
    }
    newEnemy() {
    }
}
exports.default = TankWorldFactory;
//# sourceMappingURL=TankWorldFactory.js.map