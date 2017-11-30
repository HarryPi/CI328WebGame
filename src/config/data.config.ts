import { Levels } from '../constants/GameConstants';

/**
 * @class
 * Will hold the options selected by the player
 * */
export class DataConfig {
  /**
   * @static
   * Represents the level selected by the player
   * */
  private static _shadowLevel: Levels;
  private static _level: Levels;

  /**
   * @static
   * Returns the selected level
   * */
  static get level(): Levels {
    return this._level;
  }
  /**
   * @static
   * Sets the playable level
   * @param {Levels} value - the enum representation of a level
   * */
  static set level(value: Levels) {
    this._shadowLevel = this._level;
    this._level = value;
  }

  /**
   * @description
   * Checks if the any of the data has been changed see {@link DataConfig}
   * @return {boolean} changed
   * */
  static hasChanged(): boolean {
    let changed = false;

    this._level === this._shadowLevel ? changed = changed : changed = true;

    return changed;
  }

  /**
   * @description
   * Will revert the values to their prior state NOT the initial state
   * */
  static revertChanges(): void {
    this._shadowLevel ? this._level = this._shadowLevel : this._level = this._level;
    DataConfig.applyCahnges();
  }

  /**
   * @description
   * Use once you set up all the values to confirm the changes
   * */
  static applyCahnges(): void {
    this._shadowLevel = null;
  }
}
