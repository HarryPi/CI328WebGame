import { TankLayout } from '../constants/Constants';
import { Entity} from './Entity';

export abstract class Tank extends Entity{

  private _health: number;
  private _layout: TankLayout;
  private _speed: number;
  private _rateOfFire: number;
  private _angleToFire: number;

  protected fire(): void {
    throw new Error('Not Implemented');
  }

  get health(): number {
    return this._health;
  }

  set health(value: number) {
    this._health = value;
  }

  get layout(): TankLayout {
    return this._layout;
  }

  set layout(value: TankLayout) {
    this._layout = value;
  }

  get speed(): number {
    return this._speed;
  }

  set speed(value: number) {
    this._speed = value;
  }

  get rateOfFire(): number {
    return this._rateOfFire;
  }

  set rateOfFire(value: number) {
    this._rateOfFire = value;
  }

  get angleToFire(): number {
    return this._angleToFire;
  }

  set angleToFire(value: number) {
    this._angleToFire = value;
  }

}
