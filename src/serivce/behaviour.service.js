"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class BehaviourService {
    static moveEntity(entity, direction) {
        let mComponent = entity.getComponent(GameConstants_1.ComponentType.MOVABLE);
        if (mComponent) {
            mComponent.move(direction);
        }
    }
}
exports.default = BehaviourService;
//# sourceMappingURL=behaviour.service.js.map