"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const GameConstants_1 = require("../constants/GameConstants");
class FiringState extends state_1.State {
    enter() {
        this._entity.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = true;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = false;
    }
    update() {
    }
}
exports.FiringState = FiringState;
//# sourceMappingURL=firing.state.js.map