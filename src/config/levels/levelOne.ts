import TankLevel from './tankLevel';
import { Levels, TankLayout, TileLayers } from '../../constants/GameConstants';

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

    let a = this._game.add.sprite(this._game.world.left, this._game.world.centerY, TankLayout.TANK_SPRITESHEET, TankLayout.CANDY_ARTILLERY);
    this._game.physics.p2.enable(a);
    a.body.allowGravity = true;
    this._game.camera.follow(a);
  }

  public destroy(): void {
  }
}
