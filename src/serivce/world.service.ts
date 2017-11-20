import World from '../world';
import TankLevel from '../config/levels/tankLevel';

export default class WorldService {
  private static _world: World;
  private static _level: TankLevel;
  private static _game: Phaser.Game;


  static set game(value: Phaser.Game) {
    this._game = value;
  }

  static get level(): TankLevel {
    return this._level;
  }

  static set level(value: TankLevel) {
    this._level = value;
  }

  static  initLevel() {
    this._world = new World(this._game);
    this._level.init();
  }

  static get world() {
    return this._world;
  }

  static set world(value: World) {
    this._world = value;
  }
}

