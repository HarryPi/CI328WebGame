"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateMachine {
    constructor() {
    }
    add(name, state) {
        this._states.set(name, state);
    }
    enter(name) {
        if (this._current) {
            this._current.leave();
        }
        this._current = this._states.get(name);
        this._current.enter();
    }
    update() {
        if (this._current) {
            this._current.update();
        }
    }
}
exports.default = StateMachine;
//# sourceMappingURL=stateMachine.js.map