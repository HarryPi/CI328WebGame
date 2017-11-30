import {Levels} from '../constants/GameConstants';

/**
 * @class
 * Will hold the options selected by the player
 * */
export class DataConfig {
  /**
   * @static
   * Represents the level selected by the player
   * */
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
    this._level = value;
  }
}
