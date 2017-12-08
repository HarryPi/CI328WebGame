import { Difficulty, Levels, TankLayout } from '../constants/GameConstants';

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
  private static _level: Levels = Levels.LEVEL_ONE;
  private static _tank: TankLayout.CANDY_RECON
    | TankLayout.CANDY_ARTILLERY
    | TankLayout.CANDY_FORTRESS
    | TankLayout.CANDY_HUNTER
    | TankLayout.CANDY_LIGHT
    = TankLayout.CANDY_HUNTER;
  private static _difficulty: Difficulty = Difficulty.NORMAL;
  private static _shadowTank: TankLayout.CANDY_RECON | TankLayout.CANDY_ARTILLERY | TankLayout.CANDY_FORTRESS | TankLayout.CANDY_HUNTER | TankLayout.CANDY_LIGHT;
  private static _shadowDifficulty: Difficulty;
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

  static set tank(value: TankLayout.CANDY_RECON | TankLayout.CANDY_ARTILLERY | TankLayout.CANDY_FORTRESS | TankLayout.CANDY_HUNTER | TankLayout.CANDY_LIGHT) {
    this._shadowTank = this._tank;
    this._tank = value;
  }

  static get tank(): TankLayout.CANDY_RECON | TankLayout.CANDY_ARTILLERY | TankLayout.CANDY_FORTRESS | TankLayout.CANDY_HUNTER | TankLayout.CANDY_LIGHT {
    return this._tank;
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
   * Will revert the values to their prior conditions NOT the initial conditions
   * */
  static revertChanges(): void {
    this._shadowLevel ? this._level = this._shadowLevel : this._level = this._level;
    this._shadowTank ? this._tank = this._shadowTank : this._tank = this._tank;
    this._shadowDifficulty ? this._difficulty = this._shadowDifficulty : this._difficulty = this._difficulty;
    DataConfig.applyCahnges();
  }

  /**
   * @description
   * Use once you set up all the values to confirm the changes
   * */
  static applyCahnges(): void {
    this._shadowLevel = null;
    this._shadowTank = null;
    this._shadowDifficulty = null;
  }


  static get health(): number {
    switch (this._difficulty) {
      case Difficulty.EASY:
        return 7;
      case Difficulty.NORMAL:
        return 5;
      case Difficulty.HARD:
        return 3;
      case Difficulty.INSANE:
        return 1;
      default:
        break;
    }
  }

  static get enemyHealth(): number {
    switch (this._difficulty) {
      case Difficulty.EASY:
      case Difficulty.NORMAL:
        return 4;
      case Difficulty.HARD:
        return 8;
      case Difficulty.INSANE:
        return 10;
      default:
        break;
    }
  }
  static get playerDamage(): number {
    switch (this._difficulty) {
      case Difficulty.EASY:
        return 3;
      case Difficulty.NORMAL:
        return 2;
      case Difficulty.HARD:
      case Difficulty.INSANE:
        return 1;
      default:
        break;
    }
  }

  static get enemyDamage(): number {
    switch (this._difficulty) {
      case Difficulty.EASY:
      case Difficulty.NORMAL:
        return 1;
      case Difficulty.HARD:
        return 2;
      case Difficulty.INSANE:
        return 3;
      default:
        break;
    }
  }

  static get difficulty(): Difficulty {
    return this._difficulty;
  }

  static set difficulty(value: Difficulty) {
    this._shadowDifficulty = this._difficulty;
    this._difficulty = value;
  }
}
