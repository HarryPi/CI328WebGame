import {Levels, TankLayout, TileLayers} from '../../constants/GameConstants';
import {MathUtil} from '../../util/math.util';
import Vector from '../../util/vector';
import {Subject} from 'rxjs/Subject';

export namespace TankGameLevels {
  export abstract class TankLevel {
    // vars
    protected _enemies: Phaser.Group;
    protected _playerStartPos: Vector;
    protected _enemyStartPos: Vector;
    protected _game: Phaser.Game;
    protected _collisionLayer: Array<Phaser.Physics.P2.Body>;
    protected _map: Phaser.Tilemap;

    protected _capEnemies: number;
    protected _enemiesCount: number; // total of enemies the level will have
    protected _enemiesSpawnTime: number;
    protected _randomDisasterSpawnTime: number; // time in ms
    protected _totalEnemies: number;
    protected _enemyTankKind: Array<TankLayout>;
    protected _whenStageCleared: Subject<void>;
    constructor(game: Phaser.Game) {
      this._game = game;
    }

    // functions
    public abstract init(): void;

    /**
     * @description
     * Use to clear any variables that should not exist globally once a level has finished e.g. tilemap
     */
    public abstract destroy(): void;

    /**
     * @description
     * Gets total enemies that will ever exist on current level
     * @return {number} this._totalEnemies
     */
    get totalEnemies(): number {
      return this._totalEnemies;
    }

    /**
     * @description
     * Gets how many enemies currently are alive at a level
     * @return {number} this._enemiesCount
     */
    get enemiesCount(): number {
      return this._enemiesCount;
    }

    /**
     * @description
     * Sets how many enemies currently are alive at a level
     * @param {number} value
     */
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
    get whenStageCleared(): Subject<void> {
      return this._whenStageCleared;
    }
    /**
     * @description
     * Return the bodies of the ground layer
     * @return {Phaser.Physics.P2.Body[]} this._collisionLayer
     */
    get collisionLayer(): Array<Phaser.Physics.P2.Body> {
      return this._collisionLayer;
    }

    /**
     * @description
     * Total of enemies a level can have at a time
     * @return {number} this._capEnemies
     *
     */
    get capEnemies(): number {
      return this._capEnemies;
    }


    get randomDisasterSpawnTime(): number {
      return this._randomDisasterSpawnTime;
    }

    getRandomEnemy(): TankLayout {
      let toReturn = this._enemyTankKind[MathUtil.randomIntFromInterval(0, 4)];
      this._enemiesCount++;
      return toReturn;
    }
  }

  export class LevelOne extends TankLevel {
    constructor(game: Phaser.Game) {
      super(game);
      this._enemiesCount = 0;
      this._enemiesSpawnTime = 3;
      this._playerStartPos = new Vector(this._game.world.bounds.left, this._game.world.centerY + 100);
      this._enemyStartPos = new Vector(this._game.world.bounds.right, this._game.world.centerY);
      this._capEnemies = 3;
      this._totalEnemies = 30;
      this._randomDisasterSpawnTime = 5000;
      this._enemyTankKind = [TankLayout.DARK_RECON, TankLayout.DARK_ARTILLERY, TankLayout.DARK_FORTRESS, TankLayout.DARK_LIGHT, TankLayout.DARK_HUNTER];
    }

    public init(): void {
      let map = this._game.add.tilemap(Levels.LEVEL_ONE);
      map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
      map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

      map.createLayer('SkySecondary').resizeWorld();
      map.createLayer('SkyPrimary').resizeWorld();
      map.createLayer('GroundSecondary').resizeWorld();
      map.createLayer('GroundPrimary').resizeWorld();

      this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);

      this._map = map;

      // Setup game winning condition
      if (this._totalEnemies === 0) {
        this._whenStageCleared.next();
      }
    }

    public destroy(): void {
      this._map.destroy();
    }
  }

  export class LevelTwo extends TankLevel {
    constructor(game: Phaser.Game) {
      super(game);
      this._enemiesCount = 0;
      this._enemiesSpawnTime = 3;
      this._playerStartPos = new Vector(this._game.world.bounds.left, this._game.world.centerY + 100);
      this._enemyStartPos = new Vector(this._game.world.bounds.right, this._game.world.centerY);
      this._capEnemies = 3;
      this._totalEnemies = 30;
      this._enemyTankKind = [TankLayout.GREY_LIGHT, TankLayout.GREY_RECON, TankLayout.GREY_HUNTER, TankLayout.GREY_FORTRESS, TankLayout.GREY_ARTILERY];
      this._randomDisasterSpawnTime = 5000;

      if (this._totalEnemies === 0) {
        this._whenStageCleared.next();
      }

    }

    init(): void {

      let map = this._game.add.tilemap(Levels.LEVEL_TWO);
      map.addTilesetImage(TileLayers.CANDY_LAYER, TileLayers.CANDY_LAYER);
      map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

      map.createLayer('SkySecondary').resizeWorld();
      map.createLayer('SkyPrimary').resizeWorld();
      map.createLayer('GroundSecondary').resizeWorld();
      map.createLayer('GroundPrimary').resizeWorld();

      this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
      this._map = map;
    }

    destroy(): void {
      this._map.destroy();
    }
  }

}
