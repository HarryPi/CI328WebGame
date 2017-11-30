"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        this._level = value;
    }
}
exports.DataConfig = DataConfig;
//# sourceMappingURL=data.config.js.map