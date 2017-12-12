import StateMachine from '../AI/fsm/stateMachine';
import { ComponentType, FsmStateName } from '../constants/GameConstants';
import { Component } from './component';
import { FsmStates } from '../AI/fsm/fsm.states';
import State = FsmStates.State;

export class StateComponent extends Component{
  private _fsm: StateMachine;
  constructor(){
    super(ComponentType.STATE);
    this._fsm = new StateMachine();
  }
  public addState(name: FsmStateName, state: State): StateComponent {
    this._fsm.add(name, state);
    state.entity = this.target;
    return this;
  }
  public setState(name: FsmStateName): StateComponent {
    try {
      this._fsm.enter(name);
      return this;
    } catch (e) {
      console.log(e);
    }
  }
  public get currentState(): State {
    return this._fsm.current;
  }
  update(): void {
    this._fsm.update();
  }
}
