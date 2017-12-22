"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = require("../AI/fsm/stateMachine");
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
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
        try {
            this._fsm.enter(name);
            return this;
        }
        catch (e) {
            console.log(e);
        }
    }
    get currentState() {
        return this._fsm.current;
    }
    update() {
        this._fsm.update();
    }
}
exports.StateComponent = StateComponent;
//# sourceMappingURL=state.component.js.map