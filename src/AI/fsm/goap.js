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
            this._effects.set(name, value);
        }
        addPrecondition(name, value) {
            this._preconditions.set(name, value);
        }
        get preconditions() {
            return this._preconditions;
        }
        get effects() {
            return this._effects;
        }
        get cost() {
            return this._cost;
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
            let root = new Goap.Node(null, null, 0, agent.state);
            let leaves = [];
            let found = this.buildGraph(root, leaves, agent.actions, goal);
            const cheapest = leaves.sort((a, b) => {
                return a.cost - b.cost;
            })[0];
            let plan = [];
            let node = cheapest;
            while (node) {
                if (node.action) {
                    plan.unshift(node.action);
                }
                node = node.parent;
            }
        }
        buildGraph(parent, leaves, actions, goal) {
            let found = false;
            actions.forEach((action) => {
                if (this.inState(parent.state, action.preconditions)) {
                    let currentState = this.applyState(parent.state, action.effects);
                    let node = new Node(parent, action, parent.cost + action.cost, currentState);
                    if (currentState.get(goal.name) === goal.value) {
                        leaves.push(node);
                        found = true;
                    }
                    else {
                        const index = actions.indexOf(action);
                        const subset = actions.slice(0, index).concat(actions.slice(index + 1, actions.length));
                        let foundOne = this.buildGraph(node, leaves, subset, goal);
                        if (foundOne) {
                            found = true;
                        }
                    }
                }
            });
            return found;
        }
        inState(state, preconditions) {
            preconditions.forEach((value, key) => {
                if (state.has(key)) {
                    return state.get(key) === preconditions.get(key);
                }
            });
            return false;
        }
        applyState(old, newState) {
            newState.forEach((value, key) => {
                if (old.has(key)) {
                    old.delete(key);
                    old.set(key, newState.get(key));
                }
            });
            return old;
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