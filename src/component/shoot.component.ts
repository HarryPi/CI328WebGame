import { ComponentType, InputType, TankWorldEvents } from '../constants/GameConstants';
import { Component } from './component';
import { EventEmitter } from 'events';
import TankWorldFactory from '../TankWorldFactory';

export class ShootComponent extends Component{
  private _canShoot: boolean;
  private _factory: TankWorldFactory;
  private _timer = 0;

  constructor(game: Phaser.Game, factory: TankWorldFactory){
      super(ComponentType.SHOOT);
      this._factory = factory;
    }

    update(){
      if (this._canShoot) {
        console.log(Date.now() - this._timer );
        if (Date.now() - this._timer > 1500) {
          this.shootBullet();
        }
      }
    }
  set canShoot(value: boolean) {
    this._canShoot = value;
  }

  private shootBullet(){
    this._canShoot = false;
    this._factory.newBullet(this.target.sprite.x + 50 , this.target.sprite.y - 30);
    this._timer = Date.now();
  }
}
