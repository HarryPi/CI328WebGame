import { Subject } from 'rxjs/Subject';
import { InputType } from '../constants/GameConstants';

export default class Input {
  private _emitter: Subject<InputType>;
  private _map: Map<Phaser.Key | Phaser.DeviceButton | Phaser.SignalBinding, InputType>;

  constructor(){
    this._map = new Map<Phaser.Key | Phaser.DeviceButton | Phaser.SignalBinding, InputType>();
    this._emitter = new Subject();
  }
  add(condition: Phaser.Key | Phaser.DeviceButton | Phaser.SignalBinding, action: InputType){
    this._map.set(condition, action);
  }

  run(){
    this._map.forEach((value: InputType, key: Phaser.Key | Phaser.DeviceButton | Phaser.SignalBinding) => {
      if(key instanceof Phaser.SignalBinding) {

      }
      if (key.isDown)  {
        this._emitter.next(value);
      }
    });
  }
  get emitter(): Subject<InputType> {
    return this._emitter;
  }
}
