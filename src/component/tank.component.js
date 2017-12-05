"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
const tank_util_1 = require("../UI/tank.util");
class TankComponent extends component_1.Component {
    constructor(tankKind) {
        super(GameConstants_1.ComponentType.TANK);
        this._tankKind = tankKind;
    }
    get bulletSpeed() {
        if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
            return 700;
        }
        else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
            return 1000;
        }
        else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
            return 850;
        }
        else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
            return 1200;
        }
        else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
            return 800;
        }
        else {
            throw new Error('NO TANK FOUND TO SET BULLET SPEED');
        }
    }
    get bulletKind() {
        if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
            return GameConstants_1.TankLayout.BULLET_ONE;
        }
        else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
            return GameConstants_1.TankLayout.BULLET_THREE;
        }
        else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
            return GameConstants_1.TankLayout.BULLET_SIX;
        }
        else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
            return GameConstants_1.TankLayout.BULLET_FOUR;
        }
        else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
            return GameConstants_1.TankLayout.BULLET_FIVE;
        }
        else {
            throw new Error('NO TANK FOUND TO SET BULLET KIND');
        }
    }
    get speed() {
        if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
            return 200;
        }
        else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
            return 200;
        }
        else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
            return 100;
        }
        else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
            return 100;
        }
        else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
            return 250;
        }
        else {
            throw new Error('NO TANK FOUND TO SET BULLET KIND');
        }
    }
}
exports.TankComponent = TankComponent;
//# sourceMappingURL=tank.component.js.map