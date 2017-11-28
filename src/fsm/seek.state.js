"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const GameConstants_1 = require("../constants/GameConstants");
class SeekState extends state_1.State {
    enter() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.LEFT_INPUT;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
    }
    update() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
    }
}
exports.SeekState = SeekState;
//# sourceMappingURL=seek.state.js.map