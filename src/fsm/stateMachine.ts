import {FSMStates} from '../constants/GameConstants';
import {State} from './state';

export default class StateMachine {

  private _states: Map<FSMStates, State>;
  private _current: State;

  constructor(){

  }
  public add(name: FSMStates, state: State) {
    this._states.set(name, state);
  }
  public enter(name: FSMStates){
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
}
