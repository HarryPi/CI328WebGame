import TankLevel from './tankLevel';
import { Levels, TankLayout, TileLayers } from '../../constants/GameConstants';
import Vector from '../../util/vector';

export class LevelOne extends TankLevel {
  constructor(game: Phaser.Game){
    super(game);
    this._enemiesCount = 0;
    this._enemiesSpawnTime = 3;
    this._playerStartPos = new Vector(this._game.world.bounds.left, this._game.world.centerY + 100);
    this._enemyStartPos = new Vector(this._game.world.bounds.right, this._game.world.centerY);
    this._capEnemies = 3;
    this._totalEnemies = 30;

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
  }

  public destroy(): void {
    this._map.destroy();
  }
}
