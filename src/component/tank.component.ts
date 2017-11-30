import { ComponentType, TankLayout } from '../constants/GameConstants';
import { Component } from './component';

export class TankComponent extends Component {

 /* private _bulletSpeed: number;
  private _bulletKind: TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO;
  private _speed: number;*/
  private _tankKind: TankLayout.CANDY_RECON | TankLayout.CANDY_ARTILLERY | TankLayout.CANDY_FORTRESS | TankLayout.CANDY_HUNTER | TankLayout.CANDY_LIGHT;

  constructor(tankKind: TankLayout.CANDY_RECON | TankLayout.CANDY_ARTILLERY | TankLayout.CANDY_FORTRESS | TankLayout.CANDY_HUNTER | TankLayout.CANDY_LIGHT) {
    super(ComponentType.TANK);
    this._tankKind = tankKind;
  }


  get bulletSpeed(): number {
    switch (this._tankKind) {
      case TankLayout.CANDY_LIGHT:
        return 1000;
      case TankLayout.CANDY_HUNTER:
        return 1250;
      case TankLayout.CANDY_FORTRESS:
        return 2000;
      case TankLayout.CANDY_ARTILLERY:
        return 2500;
      case TankLayout.CANDY_RECON:
        return 1250;
      default:
        break;
    }
  }

  get bulletKind(): TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO {
    switch (this._tankKind) {
      case TankLayout.CANDY_LIGHT:
        return TankLayout.BULLET_ONE;
      case TankLayout.CANDY_HUNTER:
        return TankLayout.BULLET_THREE;
      case TankLayout.CANDY_FORTRESS:
        return TankLayout.BULLET_SIX;
      case TankLayout.CANDY_ARTILLERY:
        return TankLayout.BULLET_FOUR;
      case TankLayout.CANDY_RECON:
        return TankLayout.BULLET_FIVE;
      default:
        break;
    }
  }

  get speed(): number {
    switch (this._tankKind) {
      case TankLayout.CANDY_LIGHT:
        return 200;
      case TankLayout.CANDY_HUNTER:
        return 200;
      case TankLayout.CANDY_FORTRESS:
        return 100;
      case TankLayout.CANDY_ARTILLERY:
        return 100;
      case TankLayout.CANDY_RECON:
        return 250;
      default:
        break;
    }
  }
}
