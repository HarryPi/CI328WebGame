import { ComponentType } from '../constants/GameConstants';
import { Component } from './component';
import TankWorldFactory from '../TankWorldFactory';

export class ShootComponent extends Component{
  private _canShoot: boolean = false;
  private _factory: TankWorldFactory;
  private _timer = 0;

  constructor(game: Phaser.Game, factory: TankWorldFactory){
      super(ComponentType.SHOOT);
      this._factory = factory;
    }

    update(){
      if (this._canShoot) {
        this._canShoot = false;
        if (Date.now() - this._timer > 1500) {
          this.shootBullet();
        }
      }
    }
  set canShoot(value: boolean) {
    this._canShoot = value;
  }

  private shootBullet(){
    this._factory.newBullet(this.target.sprite.x + 50 , this.target.sprite.y - 20, this.target);
    this._timer = Date.now();
  }
}
