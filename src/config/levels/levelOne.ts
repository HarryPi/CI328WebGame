import TankLevel from './tankLevel';
import { Levels, TankLayout, TileLayers } from '../../constants/GameConstants';
import vec2 = p2.vec2;
import Vector from '../../util/vector';

export class LevelOne extends TankLevel {
  constructor(game: Phaser.Game){
    super(game);
  }

  public init(): void {
    let map = this._game.add.tilemap(Levels.LEVEL_ONE);
    map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
    map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

    map.createLayer('SkySecondary').resizeWorld();
    map.createLayer('SkyPrimary').resizeWorld();
    map.createLayer('GroundSecondary').resizeWorld();
    map.createLayer('GroundPrimary').resizeWorld();

    this._game.physics.p2.convertCollisionObjects(map, 'GroundPath');
    this._playerStartPos = new Vector(this._game.world.left, this._game.world.centerY - 100);
  }

  public destroy(): void {
  }
}
