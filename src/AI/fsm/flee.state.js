"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../../constants/GameConstants");
const state_1 = require("./state");
class FleeState extends state_1.State {
    enter() {
        // We know any component implementing SeekState will have an AI component
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.RIGHT_INPUT;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
    }
    update() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
    }
}
exports.FleeState = FleeState;
//# sourceMappingURL=flee.state.js.map