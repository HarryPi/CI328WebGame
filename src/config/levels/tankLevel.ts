import { Entity } from '../../Entities/entity';
import vec2 = p2.vec2;

export default abstract class TankLevel {
  // vars
  private _enemies: Phaser.Group;
  private _playerStartPos: vec2;
  private _enemyStartPos: vec2;
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
}
