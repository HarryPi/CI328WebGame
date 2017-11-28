import { ComponentType, FSMStates } from '../constants/GameConstants';
import { Component } from './component';
import StateMachine from '../fsm/stateMachine';
import { State } from '../fsm/state';

export class StateComponent extends Component{
  private _fsm: StateMachine;
  constructor(){
    super(ComponentType.STATE);
    this._fsm = new StateMachine();
  }
  public addState(name: FSMStates, state: State): StateComponent {
    this._fsm.add(name, state);
    state.entity = this.target;
    return this;
  }
  public setState(name: FSMStates): StateComponent {
    this._fsm.enter(name);
    return this;
  }
  update(): void {
      this._fsm.update();
  }
}
