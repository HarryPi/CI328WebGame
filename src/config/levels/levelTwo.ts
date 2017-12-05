import TankLevel from './tankLevel';
import Vector from '../../util/vector';
import {Levels, TankLayout, TileLayers} from '../../constants/GameConstants';

export class LevelTwo extends  TankLevel {
  constructor(game: Phaser.Game){
    super(game);
    this._enemiesCount = 0;
    this._enemiesSpawnTime = 3;
    this._playerStartPos = new Vector(this._game.world.bounds.left, this._game.world.centerY + 100);
    this._enemyStartPos = new Vector(this._game.world.bounds.right, this._game.world.centerY);
    this._capEnemies = 3;
    this._totalEnemies = 30;
    this._enemyTankKind = [TankLayout.GREY_LIGHT, TankLayout.GREY_RECON, TankLayout.GREY_HUNTER, TankLayout.GREY_FORTRESS, TankLayout.GREY_ARTILERY];
    this._randomDisasterSpawnTime = 5000;
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
