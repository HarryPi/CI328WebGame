"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class PhysicsService {
    static enablePhysics(entity) {
        let pComponent = entity.getComponent(GameConstants_1.ComponentType.PHYSICS);
        if (pComponent) {
            pComponent.addPhysics();
        }
    }
}
exports.default = PhysicsService;
//# sourceMappingURL=physics.service.js.map