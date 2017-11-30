"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TankLevel {
    constructor(game) {
        this._game = game;
    }
    /**
     * @description
     * Gets total enemies that will ever exist on current level
     * @return {number} this._totalEnemies
     * */
    get totalEnemies() {
        return this._totalEnemies;
    }
    /**
     * @description
     * Gets how many enemies currently are alive at a level
     * @return {number} this._enemiesCount
     * */
    get enemiesCount() {
        return this._enemiesCount;
    }
    /**
     * @description
     * Sets how many enemies currently are alive at a level
     * @param {number} value
     * */
    set enemiesCount(value) {
        this._enemiesCount = value;
    }
    get enemiesSpawnTime() {
        return this._enemiesSpawnTime;
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
    /**
     * @description
     * Return the bodies of the ground layer
     * @return {Phaser.Physics.P2.Body[]} this._collisionLayer
     * */
    get collisionLayer() {
        return this._collisionLayer;
    }
    /**
     * @description
     * Total of enemies a level can have at a time
     * @return {number} this._capEnemies
     *
     * */
    get capEnemies() {
        return this._capEnemies;
    }
}
exports.default = TankLevel;
//# sourceMappingURL=tankLevel.js.map