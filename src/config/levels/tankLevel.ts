import { Entity } from '../../entities/entity';
import Vector from '../../util/vector';

export default abstract class TankLevel {
  // vars
  protected _enemies: Phaser.Group;
  protected _playerStartPos: Vector;
  protected _enemyStartPos: Vector;
  protected _game: Phaser.Game;

  constructor(game: Phaser.Game){
    this._game = game;
  }

  // functions
  public abstract init(): void;
  public abstract destroy(): void;
  protected spawnEnemy(): Entity {
    return null;
  }

  get enemies(): Phaser.Group {
    return this._enemies;
  }

  get playerStartPos(): Vector {
    return this._playerStartPos;
  }

  get enemyStartPos(): Vector {
    return this._enemyStartPos;
  }
}
