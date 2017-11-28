"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
const stateMachine_1 = require("../fsm/stateMachine");
class StateComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.STATE);
        this._fsm = new stateMachine_1.default();
    }
    addState(name, state) {
        this._fsm.add(name, state);
        state.entity = this.target;
        return this;
    }
    setState(name) {
        this._fsm.enter(name);
        return this;
    }
    update() {
        this._fsm.update();
    }
}
exports.StateComponent = StateComponent;
//# sourceMappingURL=state.component.js.map