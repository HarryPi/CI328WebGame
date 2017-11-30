"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
class TankComponent extends component_1.Component {
    constructor(tankKind) {
        super(GameConstants_1.ComponentType.TANK);
        this._tankKind = tankKind;
    }
    get bulletSpeed() {
        switch (this._tankKind) {
            case GameConstants_1.TankLayout.CANDY_LIGHT:
                return 1000;
            case GameConstants_1.TankLayout.CANDY_HUNTER:
                return 1250;
            case GameConstants_1.TankLayout.CANDY_FORTRESS:
                return 2000;
            case GameConstants_1.TankLayout.CANDY_ARTILLERY:
                return 2500;
            case GameConstants_1.TankLayout.CANDY_RECON:
                return 1250;
            default:
                break;
        }
    }
    get bulletKind() {
        switch (this._tankKind) {
            case GameConstants_1.TankLayout.CANDY_LIGHT:
                return GameConstants_1.TankLayout.BULLET_ONE;
            case GameConstants_1.TankLayout.CANDY_HUNTER:
                return GameConstants_1.TankLayout.BULLET_THREE;
            case GameConstants_1.TankLayout.CANDY_FORTRESS:
                return GameConstants_1.TankLayout.BULLET_SIX;
            case GameConstants_1.TankLayout.CANDY_ARTILLERY:
                return GameConstants_1.TankLayout.BULLET_FOUR;
            case GameConstants_1.TankLayout.CANDY_RECON:
                return GameConstants_1.TankLayout.BULLET_FIVE;
            default:
                break;
        }
    }
    get speed() {
        switch (this._tankKind) {
            case GameConstants_1.TankLayout.CANDY_LIGHT:
                return 200;
            case GameConstants_1.TankLayout.CANDY_HUNTER:
                return 200;
            case GameConstants_1.TankLayout.CANDY_FORTRESS:
                return 100;
            case GameConstants_1.TankLayout.CANDY_ARTILLERY:
                return 100;
            case GameConstants_1.TankLayout.CANDY_RECON:
                return 250;
            default:
                break;
        }
    }
}
exports.TankComponent = TankComponent;
//# sourceMappingURL=tank.component.js.map