import {Levels, TankLayout} from '../constants/GameConstants';
import game from '../index';

class AssetLoader {

  // Asset URL;

  private _levelOneUrl: string;
  private _tankSpritesheetUrl: string;
  private _tankSpritesheetUrlXLM: string;
  private _progressBarUrl: string;
  private _logoUrl: string;

  // Phaser.Loader
  private _loader: Phaser.Loader;

  constructor() {

    this._progressBarUrl = require('assets/images/progressBar.png');
    this._tankSpritesheetUrl = require('assets/spritesheet/tanks.png');
    this._logoUrl = require('assets/images/logo.png');
    this._levelOneUrl = require('assets/levels/level1.json');
    this._tankSpritesheetUrlXLM = require('assets/spritesheet/tanks_xml.xml');
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
      this.loader.image('progressBar', this._progressBarUrl);
      this.loader.image('logo', this._logoUrl);
    } catch (e) {
      console.log(e);
      // todo: Exception handling class
    }
  }

  public setLoadingScreen(state: Phaser.State): void {
    let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, this.logo);
    let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, this.progressBar);

    logo.anchor.setTo(0.5);
    progressBar.anchor.setTo(0.5);
    state.load.setPreloadSprite(progressBar);
  }

  loadAll(): void {
    this.loader.tilemap(Levels.LEVEL_ONE, this._levelOneUrl);
    this.loader.atlasXML(TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
  }

  get progressBar(): string {
    return 'progressBar';
  }

  get logo(): string {
    return 'logo';
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
