import {
  Levels, TankLayout, TileLayers,
  UIComponents
} from '../constants/GameConstants';
/**
 * @class
 * Class to load assets into the cached memory
 * */
class AssetLoader {

  // Asset URL;
  // levels
  private _levelOneUrl: string;
  private _levelTwoUrl: string;

  // Spritesheet
  private _tankSpritesheetUrl: string;
  private _tankSpritesheetUrlXLM: string;

  // loading screen
  private _progressBarUrl: string;
  private _logoUrl: string;

  // Layers
  private _grassLayerUrl: string;
  private _backgroundUrl: string;
  private _candyLayerUrl: string;
  private _uiBackgroundUrl: string;
  private uiBackgroundUrlXML: string;

  // Images
  private _levelOneImgUrl: string;
  private _levelTwoImgUrl: string;
  private _tank1Url: string;
  private _tank2Url: string;
  private _tank3Url: string;
  private _tank4Url: string;
  private _tank5Url: string;

  // loader
  private _loader: Phaser.Loader;


  /**
   * @constructor
   * Will generate all required paths for the assets
   * */
  constructor() {
    // Since Webpack is running in build-time, it can't figure out which modules to bundle when the name is a dynamic variable.
    // Therefor all required targets must be hardcoded

    // Images
    this._progressBarUrl = require('assets/images/progressBar.png');
    this._logoUrl = require('assets/images/logo.png');
    this._levelOneImgUrl = require('assets/images/levelOneImage.png');
    this._levelTwoImgUrl = require('assets/images/levelTwoImage.png');

    this._tank1Url = require('assets/images/tanks_tankDesert1.png');
    this._tank2Url = require('assets/images/tanks_tankDesert2.png');
    this._tank3Url = require('assets/images/tanks_tankDesert3.png');
    this._tank4Url = require('assets/images/tanks_tankDesert4.png');
    this._tank5Url = require('assets/images/tanks_tankDesert5.png');

    // Levels
    this._levelOneUrl = require('assets/levels/level1.json');
    this._levelTwoUrl = require('assets/levels/level2.json');

    // Atlas
    this._tankSpritesheetUrlXLM = require('assets/spritesheet/tanks_xml.xml');
    this._tankSpritesheetUrl = require('assets/spritesheet/tanks.png');

    // Spritesheet
    this._grassLayerUrl = require('assets/spritesheet/grassLayer.png');
    this._candyLayerUrl = require('assets/spritesheet/candyLayer.png');
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
      // todo: Exception handling class
    }
  }


  /**
   * @description
   * Loads all assets into the cached memory **Note this doesnt include loading screen assets see {@link AssetLoader#loadBoot}
   * */
  loadAll(): void {
    this.loader.tilemap(Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
    this.loader.tilemap(Levels.LEVEL_TWO, this._levelTwoUrl, null, Phaser.Tilemap.TILED_JSON);

    this.loader.atlasXML(TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
    this.loader.atlasXML(UIComponents.UI_SPRITESHEET, this._uiBackgroundUrl, this.uiBackgroundUrlXML);

    this.loader.image(TileLayers.GRASS_LAYER, this._grassLayerUrl);
    this.loader.image(TileLayers.BACKGROUND, this._backgroundUrl);
    this.loader.image(UIComponents.LEVEL_ONE_IMAGE, this._levelOneImgUrl);
    this.loader.image(UIComponents.LEVEL_TWO_IMAGE, this._levelTwoImgUrl);
    this.loader.image(TileLayers.CANDY_LAYER, this._candyLayerUrl);

    this.loader.image(UIComponents.CANDY_ARTILLERY_IMG, this._tank1Url);
    this.loader.image(UIComponents.CANDY_HUNTER_IMG, this._tank2Url);
    this.loader.image(UIComponents.CANDY_LIGHT_IMG, this._tank5Url);
    this.loader.image(UIComponents.CANDY_FORTRESS_IMG, this._tank3Url);
    this.loader.image(UIComponents.CANDY_RECON_IMG, this._tank4Url);
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

// Imitate all methods as static as this class needs to be initiated
// noinspection TsLint
const AssetsUtils = new AssetLoader();
export default AssetsUtils;
