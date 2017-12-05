import {AIConstant, FSMStates, States} from '../../constants/GameConstants';
import {State} from './state';

export namespace Goap {
  export abstract class Action {
    private _name: Type;
    private _agent: IAgent;
    private _effect: Map<ConditionName, Condition>;
    private _cost: number;
    private _preconditions: Map<ConditionName, Condition>;

    constructor(name: Type, cost: number){
      this._name = name;
      this._cost = cost;
    }
     public addEffect(name: ConditionName, value: Condition) {
      this._effect.set(name, value);
    }
    public addPrecondition(name: ConditionName, value: Condition) {
      this._preconditions.set(name, value);
    }
    public abstract execute(): void;
    public abstract canExecute(): boolean;
  }
  export interface IAgent {
    actions: Array<Action>;
    currentActions: Array<Action>;
    addAction(): void;
    applyAction(): void;
    is(stateType: FSMStates, state: State): FSMStates;
    getUsableActions(): Array<Action>;
    getState(): FSMStates;
  }
  export class Node {
    private _parent: Node;
    private _action: Goap.Action;
    private _cost: number;
    private _state: FSMStates;

    constructor(parent, action: Action, cost: number, state: FSMStates) {
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

    get state(): FSMStates {
      return this._state;
    }
  }
  export class Planner {
    public plan(agent: IAgent, goal: Condition) {
      let root: Goap.Node = new Goap.Node(null, null, 0, agent.getState());
      let leaves: Array<Goap.Node> = [];
      let found = this.buildGraph();
    }
    private buildGraph(parent: Node, leaves: Array<Node>, actions: Array<Action>, goal: Condition) {
      let found = false;
      actions.forEach( (action: Action) => {

      });

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
