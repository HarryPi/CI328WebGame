import { Levels, TankLayout, TileLayers, UIComponents } from '../constants/GameConstants';

class AssetLoader {

  // Asset URL;

  private _levelOneUrl: string;
  private _tankSpritesheetUrl: string;
  private _tankSpritesheetUrlXLM: string;
  private _progressBarUrl: string;
  private _logoUrl: string;
  private _grassLayerUrl: string;
  private _backgroundUrl: string;

  // Phaser.Loader
  private _loader: Phaser.Loader;

  constructor() {

    // Images
    this._progressBarUrl = require('assets/images/progressBar.png');
    this._logoUrl = require('assets/images/logo.png');

    // Levels
    this._levelOneUrl = require('assets/levels/level1.json');

    // Atlas
    this._tankSpritesheetUrlXLM = require('assets/spritesheet/tanks_xml.xml');
    this._tankSpritesheetUrl = require('assets/spritesheet/tanks.png');

    // Spritesheet
    this._grassLayerUrl = require('assets/spritesheet/grassLayer.png');
    this._backgroundUrl = require('assets/spritesheet/backgroundElements.png');
  }

  /**
   * Run once during Boot state to pass reference to loader.
   * @param {Phaser.Loader} loader   The phaser loader
   * @return {void}
   **/
  init(loader: Phaser.Loader): void {
    this.loader = loader;
  }

  loadBoot(): void {
    try {
      this.loader.image(UIComponents.PROGRESS_BAR, this._progressBarUrl);
      this.loader.image(UIComponents.LOGO, this._logoUrl);
    } catch (e) {
      console.log(e);
      // todo: Exception handling class
    }
  }

  public setLoadingScreen(state: Phaser.State): void {
    let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, UIComponents.LOGO);
    let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, UIComponents.PROGRESS_BAR);

    logo.anchor.setTo(0.5);
    progressBar.anchor.setTo(0.5);
    state.load.setPreloadSprite(progressBar);
  }

  loadAll(): void {
    this.loader.tilemap(Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
    this.loader.atlasXML(TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
    this.loader.image(TileLayers.GRASS_LAYER, this._grassLayerUrl);
    this.loader.image(TileLayers.BACKGROUND, this._backgroundUrl);
  }

  get loader(): Phaser.Loader {
    if (this._loader === null) {
      throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
    }
    return this._loader;
  }

  set loader(value: Phaser.Loader) {
    this._loader = value;
  }

}

// noinspection TsLint
const AssetsUtils = new AssetLoader();
export default AssetsUtils;
