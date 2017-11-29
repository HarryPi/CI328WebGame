import { Levels, TankLayout, TileLayers, UIComponents } from '../constants/GameConstants';

/**
 * @class
 * Class to load assets into the cached memory
 * */
class AssetLoader {

  // Asset URL;

  private _levelOneUrl: string;
  private _tankSpritesheetUrl: string;
  private _tankSpritesheetUrlXLM: string;
  private _progressBarUrl: string;
  private _logoUrl: string;
  private _grassLayerUrl: string;
  private _backgroundUrl: string;
  private _uiBackgroundUrl: string;
  private uiBackgroundUrlXML: string;
  // Phaser.Loader
  private _loader: Phaser.Loader;

  // Animations
  private _animations: Map<string, Phaser.Animation> = new Map();

  /**
   * @constructor
   * Will generate all required paths for the assets
   * */
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
    this._uiBackgroundUrl = require('assets/spritesheet/UISpritesheet.png');
    this.uiBackgroundUrlXML = require('assets/spritesheet/UISpritesheet_xml.xml');
  }

  /**
   * Run once during Boot state to pass reference to loader.
   * @param {Phaser.Loader} loader   The phaser loader
   * @return {void}
   **/
  init(loader: Phaser.Loader): void {
    this.loader = loader;
  }

  /**
   * @description
   * Loads the pre-requisites for the loading screen
   * */
  loadBoot(): void {
    try {
      this.loader.image(UIComponents.PROGRESS_BAR, this._progressBarUrl);
      this.loader.image(UIComponents.LOGO, this._logoUrl);
    } catch (e) {
      console.log(e);
      // todo: Exception handling class
    }
  }

  /**
   * @description
   * Draws the loading screen at state passed
   * @param {Phaser.State} state
   * */
  public setLoadingScreen(state: Phaser.State): void {
    let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, UIComponents.LOGO);
    let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, UIComponents.PROGRESS_BAR);

    logo.anchor.setTo(0.5);
    progressBar.anchor.setTo(0.5);
    state.load.setPreloadSprite(progressBar);
  }
  /**
   * @description
   * Loads all assets into the cached memory **Note this doesnt include loading screen assets see {@link AssetLoader#loadBoot}
   * */
  loadAll(): void {
    this.loader.tilemap(Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
    this.loader.atlasXML(TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
    this.loader.atlasXML(UIComponents.UI_SPRITESHEET, this._uiBackgroundUrl, this.uiBackgroundUrlXML);
    this.loader.image(TileLayers.GRASS_LAYER, this._grassLayerUrl);
    this.loader.image(TileLayers.BACKGROUND, this._backgroundUrl);
  }

  /**
   * @description
   * Use to draw the main menu at selected state
   * */
  public drawMainMenu(state: Phaser.State){
    let newGame = state.add.sprite(state.game.world.centerX, state.game.world.centerY - 100, UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);
    let hightScore = state.add.sprite(state.game.world.centerX, state.game.world.centerY - 50, UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);
    let preferences = state.add.sprite(state.game.world.centerX, state.game.world.centerY - 50, UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);
    let map = state.game.add.tilemap(Levels.LEVEL_ONE);
    map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
    map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);
  }
  /**
   * @description
   * Returns the cached memory object see {@link Phaser.Loader}
   * @return {Phaser.Loader} AssetLoader._loader
   * */
  get loader(): Phaser.Loader {
    if (this._loader === null) {
      throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
    }
    return this._loader;
  }
  /**
   * @description
   * Sets current loader
   * @param {Phaser.Loader} value
   * */
  set loader(value: Phaser.Loader) {
    this._loader = value;
  }

}

// noinspection TsLint
const AssetsUtils = new AssetLoader();
export default AssetsUtils;
