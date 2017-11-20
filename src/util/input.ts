import { Subject } from 'rxjs/Subject';
import { InputType } from '../constants/GameConstants';

export default class Input {
  private _emitter: Subject<InputType>;
  private _map: Map<any, InputType>;
  private _game: Phaser.Game;

  constructor(){
    this._map = new Map<Phaser.Key, InputType>();
    this._emitter = new Subject();
  }
  add(condition: Phaser.Key, action: InputType){
    this._map.set(condition, action);
  }

  run(){
    this._map.forEach((value: InputType, key: Phaser.Key) => {
      if (key.isDown === true)  {
        this._emitter.next(value);
      }
    });
  }
  get emitter(): Subject<InputType> {
    return this._emitter;
  }
}
