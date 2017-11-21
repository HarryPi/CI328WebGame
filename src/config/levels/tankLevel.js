"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TankLevel {
    constructor(game) {
        this._game = game;
    }
    spawnEnemy() {
        return null;
    }
    get enemies() {
        return this._enemies;
    }
    get playerStartPos() {
        return this._playerStartPos;
    }
    get enemyStartPos() {
        return this._enemyStartPos;
    }
    get collisionLayer() {
        return this._collisionLayer;
    }
}
exports.default = TankLevel;
//# sourceMappingURL=tankLevel.js.map