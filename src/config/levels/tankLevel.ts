import { Entity } from '../../entities/entity';
import Vector from '../../util/vector';

export default abstract class TankLevel {
  // vars
  protected _enemies: Phaser.Group;
  protected _playerStartPos: Vector;
  protected _enemyStartPos: Vector;
  protected _game: Phaser.Game;
  protected _collisionLayer: Array<Phaser.Physics.P2.Body>;


  protected _capEnemies: number;
  protected _enemiesCount: number; // total of enemies the level will have
  protected _enemiesSpawnTime: number;
  protected _totalEnemies: number;

  constructor(game: Phaser.Game){
    this._game = game;
  }

  // functions
  public abstract init(): void;
  public abstract destroy(): void;
  protected spawnEnemy(): Entity {
    return null;
  }

  /**
   * @description
   * Gets total enemies that will ever exist on current level
   * @return {number} this._totalEnemies
   * */
  get totalEnemies(): number {
    return this._totalEnemies;
  }

  /**
   * @description
   * Gets how many enemies currently are alive at a level
   * @return {number} this._enemiesCount
   * */
  get enemiesCount(): number {
    return this._enemiesCount;
  }
  /**
   * @description
   * Sets how many enemies currently are alive at a level
   * @param {number} value
   * */
  set enemiesCount(value: number) {
    this._enemiesCount = value;
  }
  get enemiesSpawnTime(): number {
    return this._enemiesSpawnTime;
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
  get collisionLayer(): Array<Phaser.Physics.P2.Body>{
    return this._collisionLayer;
  }

  /**
   * @description
   * Total of enemies a level can have at a time
   * @return {number} this._capEnemies
   *
   * */
  get capEnemies(): number {
    return this._capEnemies;
  }
}
