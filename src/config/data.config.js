"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
/**
 * @class
 * Will hold the options selected by the player
 * */
class DataConfig {
    /**
     * @static
     * Returns the selected level
     * */
    static get level() {
        return this._level;
    }
    /**
     * @static
     * Sets the playable level
     * @param {Levels} value - the enum representation of a level
     * */
    static set level(value) {
        this._shadowLevel = this._level;
        this._level = value;
    }
    static set tank(value) {
        this._shadowTank = this._tank;
        this._tank = value;
    }
    static get tank() {
        return this._tank;
    }
    /**
     * @description
     * Checks if the any of the data has been changed see {@link DataConfig}
     * @return {boolean} changed
     * */
    static hasChanged() {
        let changed = false;
        this._level === this._shadowLevel ? changed = changed : changed = true;
        return changed;
    }
    /**
     * @description
     * Will revert the values to their prior state NOT the initial state
     * */
    static revertChanges() {
        this._shadowLevel ? this._level = this._shadowLevel : this._level = this._level;
        this._shadowTank ? this._tank = this._shadowTank : this._tank = this._tank;
        this._shadowDifficulty ? this._difficulty = this._shadowDifficulty : this._difficulty = this._difficulty;
        DataConfig.applyCahnges();
    }
    /**
     * @description
     * Use once you set up all the values to confirm the changes
     * */
    static applyCahnges() {
        this._shadowLevel = null;
        this._shadowTank = null;
        this._shadowDifficulty = null;
    }
    static get health() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
                return 7;
            case GameConstants_1.Difficulty.NORMAL:
                return 5;
            case GameConstants_1.Difficulty.HARD:
                return 3;
            case GameConstants_1.Difficulty.INSANE:
                return 1;
            default:
                break;
        }
    }
    static get enemyHealth() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
            case GameConstants_1.Difficulty.NORMAL:
                return 3;
            case GameConstants_1.Difficulty.HARD:
                return 4;
            case GameConstants_1.Difficulty.INSANE:
                return 5;
            default:
                break;
        }
    }
    static get playerDamage() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
                return 3;
            case GameConstants_1.Difficulty.NORMAL:
                return 2;
            case GameConstants_1.Difficulty.HARD:
                return 1;
            case GameConstants_1.Difficulty.INSANE:
                return 1;
            default:
                break;
        }
    }
    static get enemyDamage() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
            case GameConstants_1.Difficulty.NORMAL:
                return 1;
            case GameConstants_1.Difficulty.HARD:
                return 2;
            case GameConstants_1.Difficulty.INSANE:
                return 3;
            default:
                break;
        }
    }
    static get difficulty() {
        return this._difficulty;
    }
    static set difficulty(value) {
        this._shadowDifficulty = this._difficulty;
        this._difficulty = value;
    }
}
DataConfig._level = GameConstants_1.Levels.LEVEL_ONE;
DataConfig._tank = GameConstants_1.TankLayout.CANDY_HUNTER;
DataConfig._difficulty = GameConstants_1.Difficulty.NORMAL;
exports.DataConfig = DataConfig;
//# sourceMappingURL=data.config.js.map