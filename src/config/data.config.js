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
        DataConfig.applyCahnges();
    }
    /**
     * @description
     * Use once you set up all the values to confirm the changes
     * */
    static applyCahnges() {
        this._shadowLevel = null;
    }
}
DataConfig._level = GameConstants_1.Levels.LEVEL_ONE;
DataConfig._tank = GameConstants_1.TankLayout.CANDY_HUNTER;
exports.DataConfig = DataConfig;
//# sourceMappingURL=data.config.js.map