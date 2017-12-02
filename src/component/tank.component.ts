import {ComponentType, TankLayout} from '../constants/GameConstants';
import {Component} from './component';
import {TankUtil} from '../UI/tank.util';

export class TankComponent extends Component {

  private _bulletSpeed: number;
  private _bulletKind: TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO;
  private _speed: number;

  private _tankKind: TankLayout.CANDY_RECON
    | TankLayout.CANDY_ARTILLERY
    | TankLayout.CANDY_FORTRESS
    | TankLayout.CANDY_HUNTER
    | TankLayout.CANDY_LIGHT
    | TankLayout.DARK_ARTILLERY
    | TankLayout.DARK_FORTRESS
    | TankLayout.DARK_HUNTER
    | TankLayout.DARK_LIGHT
    | TankLayout.DARK_RECON
    | TankLayout.GREEN_ARTILERY
    | TankLayout.GREEN_HUNTER
    | TankLayout.GREEN_LIGHT
    | TankLayout.GREEN_RECON
    | TankLayout.GREEN_FORTRESS
    | TankLayout.GREY_ARTILERY
    | TankLayout.GREY_FORTRESS
    | TankLayout.GREY_HUNTER
    | TankLayout.GREY_LIGHT
    | TankLayout.GREY_RECON;

  constructor(tankKind) {
    super(ComponentType.TANK);
    this._tankKind = tankKind;
  }


  get bulletSpeed(): number {
    if (TankUtil.isLightTank(this._tankKind)) {
      return 250;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return 375;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return 500;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return 500;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return 375;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET SPEED');
    }
  }

  get bulletKind(): TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO {

    if (TankUtil.isLightTank(this._tankKind)) {
      return TankLayout.BULLET_ONE;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return TankLayout.BULLET_THREE;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return TankLayout.BULLET_SIX;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return TankLayout.BULLET_FOUR;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return TankLayout.BULLET_FIVE;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET KIND');
    }
  }

  get speed(): number {
    if (TankUtil.isLightTank(this._tankKind)) {
      return 200;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return 200;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return 100;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return 100;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return 250;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET KIND');
    }
  }
}
