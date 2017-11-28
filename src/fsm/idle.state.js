"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
class IdleState extends state_1.State {
    enter() {
        console.log('Idle state enter function');
    }
    leave() {
        console.log('Idle state leave function');
    }
    update() {
    }
}
exports.IdleState = IdleState;
//# sourceMappingURL=idle.state.js.map