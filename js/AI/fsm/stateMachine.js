"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StateMachine {
    constructor() {
        this._states = new Map();
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
    hasState(name) {
        return this._states.has(name);
    }
    get current() {
        return this._current;
    }
}
exports.default = StateMachine;
//# sourceMappingURL=stateMachine.js.map