import {TankLayout} from '../constants/GameConstants';

export class TankUtil {
  public static isArtilleryTank(tankKind: TankLayout): boolean {
    return tankKind.toString().includes('2');
  }
  public static isFortressTank(tankKind: TankLayout): boolean {
    return tankKind.toString().includes('1');
  }
  public static isHunterTank(tankKind: TankLayout): boolean {
    return tankKind.toString().includes('3');
  }
  public static isLightTank(tankKind: TankLayout): boolean {
    return tankKind.toString().includes('5');
  }
  public static isReconTank(tankKind: TankLayout): boolean {
    return tankKind.toString().includes('4');
  }
}
