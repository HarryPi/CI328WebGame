"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Goap;
(function (Goap) {
    class Action {
        constructor(name, cost) {
            this._name = name;
            this._cost = cost;
        }
        addEffect(name, value) {
            this._effect.set(name, value);
        }
        addPrecondition(name, value) {
            this._preconditions.set(name, value);
        }
    }
    Goap.Action = Action;
    class Node {
        constructor(parent, action, cost, state) {
            this._parent = parent;
            this._action = action;
            this._cost = cost;
            this._state = state;
        }
        get parent() {
            return this._parent;
        }
        get action() {
            return this._action;
        }
        get cost() {
            return this._cost;
        }
        get state() {
            return this._state;
        }
    }
    Goap.Node = Node;
    class Planner {
        plan(agent, goal) {
            let root = new Goap.Node(null, null, 0, agent.getState());
            let leaves = [];
            let found = this.buildGraph();
        }
        buildGraph(parent, leaves, actions, goal) {
            let found = false;
            actions.forEach((action) => {
            });
        }
    }
    Goap.Planner = Planner;
    class Condition {
        constructor(name, value) {
            this._name = name;
            this._value = value;
        }
        get name() {
            return this._name;
        }
        get value() {
            return this._value;
        }
        set value(value) {
            this._value = value;
        }
    }
    Goap.Condition = Condition;
    let ConditionName;
    (function (ConditionName) {
    })(ConditionName = Goap.ConditionName || (Goap.ConditionName = {}));
    let Type;
    (function (Type) {
    })(Type = Goap.Type || (Goap.Type = {}));
})(Goap = exports.Goap || (exports.Goap = {}));
//# sourceMappingURL=goap.js.map