import { Subject } from 'rxjs/Subject';
import { Direction } from '../constants/GameConstants';

export default class Input {
  private _emitter: Subject<Direction>;
  private _map: Map<any, Direction>;
  private _game: Phaser.Game;

  constructor(){
    this._map = new Map<Phaser.Key, Direction>();
    this._emitter = new Subject();
  }
  add(condition: Phaser.Key, action: Direction){
    this._map.set(condition, action);
  }

  run(){
    this._map.forEach((value: Direction, key: Phaser.Key) => {
      if (key.isDown === true)  {
        this._emitter.next(value);
      }
    });
  }
  get emitter(): Subject<Direction> {
    return this._emitter;
  }
}
