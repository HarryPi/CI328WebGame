
export namespace Goap {
  export abstract class Action {
    private _name: Type;
    private _agent: IAgent;
    private _effects: Map<ConditionName, boolean>;
    private _preconditions: Map<ConditionName, boolean>;
    private _cost: number;

    constructor(name: Type, cost: number){
      this._name = name;
      this._cost = cost;
    }
     public addEffect(name: ConditionName, value: boolean) {
      this._effects.set(name, value);
    }
    public addPrecondition(name: ConditionName, value: boolean) {
      this._preconditions.set(name, value);
    }
    public abstract execute(): void;
    public abstract canExecute(): boolean;

    get preconditions(): Map<Goap.ConditionName, boolean> {
      return this._preconditions;
    }

    get effects(): Map<Goap.ConditionName, boolean> {
      return this._effects;
    }

    get cost(): number {
      return this._cost;
    }
  }
  export interface IAgent {
    actions: Array<Action>;
    currentActions: Array<Action>;
    state: Map<ConditionName, boolean>; // State object is in
    addAction(action: Action): void;
    applyAction(action: Action): void;
    getUsableActions(): Array<Action>;
    setCondition(conditionName: ConditionName, value: boolean): void;
    is(condition: ConditionName): boolean;

  }
  export class Node {
    private _parent: Node;
    private _action: Goap.Action;
    private _cost: number;
    private _state: Map<ConditionName, boolean>;

    constructor(parent, action: Action, cost: number, state: Map<ConditionName, boolean>) {
      this._parent = parent;
      this._action = action;
      this._cost = cost;
      this._state = state;
    }

    get parent(): Node {
      return this._parent;
    }

    get action(): Action {
      return this._action;
    }

    get cost(): number {
      return this._cost;
    }

    get state(): Map<ConditionName, boolean> {
      return this._state;
    }
  }
  export class Planner {
    public plan(agent: IAgent, goal: Condition) {
      let root: Goap.Node = new Goap.Node(null, null, 0, agent.state);
      let leaves: Array<Node> = [];
      let found = this.buildGraph(root, leaves, agent.actions, goal);
      const cheapest: Node = leaves.sort( (a, b) => {
        return a.cost - b.cost;
      })[0];

      let plan = [];
      let node: Node = cheapest;

      while (node) {
        if (node.action) {
          plan.unshift(node.action);
        }

        node = node.parent;
      }
    }

    private buildGraph(parent: Node, leaves: Array<Node>, actions: Array<Action>, goal: Condition) {
      let found = false;
      actions.forEach( (action: Action) => {
        if (this.inState(parent.state, action.preconditions)) {
          let currentState = this.applyState(parent.state, action.effects);
          let node = new Node(parent, action, parent.cost + action.cost, currentState);

            if (currentState.get(goal.name) === goal.value) {
              leaves.push(node);
              found = true;
            } else {
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
    private inState(state: Map<ConditionName, boolean>, preconditions: Map<ConditionName, boolean>): boolean {
        preconditions.forEach((value: boolean, key: ConditionName) => {
          if (state.has(key)) {
            return state.get(key) === preconditions.get(key);
          }
        });
        return false;
    }
    private applyState(old: Map<ConditionName, boolean>, newState: Map<ConditionName, boolean>) {
      newState.forEach((value, key) => {
        if (old.has(key)) {
          old.delete(key);
          old.set(key, newState.get(key));
        }
      });
      return old;
    }
  }

  export class Condition {
    private _name: ConditionName;
    private _value: boolean;

    constructor(name: ConditionName, value: boolean) {
      this._name = name;
      this._value = value;
    }

    get name(): ConditionName {
      return this._name;
    }

    get value(): boolean {
      return this._value;
    }

    set value(value: boolean) {
      this._value = value;
    }
  }
  export enum ConditionName {

  }
  export enum Type {

  }
}
