import {FsmStateName} from '../../constants/GameConstants';
import {FsmStates} from './fsm.states';
import State = FsmStates.State;

export default class StateMachine {

  private _states: Map<FsmStateName, State>;
  private _current: State;

  constructor(){
    this._states = new Map();
  }
  public add(name: FsmStateName, state: State) {
    this._states.set(name, state);
  }
  public enter(name: FsmStateName){
    if (this._current) {
      this._current.leave();
    }
    this._current = this._states.get(name);
    this._current.enter();
  }
  public update(){
    if (this._current) {
      this._current.update();
    }
  }
  public hasState(name: FsmStateName): boolean {
    return this._states.has(name);
  }
  public get current(): State{
    return this._current;
  }

}
