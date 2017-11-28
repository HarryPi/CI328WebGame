"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const GameConstants_1 = require("../constants/GameConstants");
class IdleState extends state_1.State {
    enter() {
        console.log('Idle state enter function');
    }
    leave() {
        console.log('Idle state leave function');
    }
    update() {
        this._entity.fsm.enter(GameConstants_1.FSMStates.HUNTING);
    }
}
exports.IdleState = IdleState;
//# sourceMappingURL=idle.state.js.map