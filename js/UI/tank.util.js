"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TankUtil {
    static isArtilleryTank(tankKind) {
        return tankKind.toString().includes('1');
    }
    static isFortressTank(tankKind) {
        return tankKind.toString().includes('3');
    }
    static isHunterTank(tankKind) {
        return tankKind.toString().includes('2');
    }
    static isLightTank(tankKind) {
        return tankKind.toString().includes('5');
    }
    static isReconTank(tankKind) {
        return tankKind.toString().includes('4');
    }
}
exports.TankUtil = TankUtil;
//# sourceMappingURL=tank.util.js.map