import { Levels, MainMenuButtons, TankLayout, TileLayers, UIComponents } from '../constants/GameConstants';
import { MenuConfig } from '../config/menu.config';
import Vector from '../util/vector';

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
  private _levelOneImgUrl: string;
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
    this._levelOneImgUrl = require('assets/images/levelOneImage.png');

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
    this.loader.image(UIComponents.LEVEL_ONE_IMAGE, this._levelOneImgUrl);
  }

  /**
   * @description
   * Will use the default box scheme to draw boxes at a location
   * @param {number} noOfBoxes - How many boxes will be created
   * @param {Array<Vector>} location - An Array of vectors see {@Link Vector} the location of where the boxes will be created
   * @param {Phaser.State} state - State to draw the boxes
   * @param {Array<string} itemToAttach - What text to attach (Optional)
   * @param {boolean} enableInput - Enable input on buttons defaults to true
   * @param {UIComponents} componentToDraw - What component will be the parent
   * @param {Vector} childRelevantPosition - Defaults to 0.5, will place the children at this position of parent object
   * @return {Array<Phaser.Sprite>} arr - Returns an array of sprites in the order passed
   * */
  private drawBoxes(noOfBoxes: number, location: Array<Vector>,
                    state: Phaser.State, itemToAttach?: Array<string>,
                    enableInput: boolean = true,
                    componentToDraw: UIComponents = UIComponents.FULL_BUTTON,
                    childRelevantPosition: Vector = new Vector(0.5, 0.5)
  )
  : Array<Phaser.Sprite> {
    let arr = [];

    for (let i = 0; i < noOfBoxes; i++) {

      let sprite = state.add.sprite(location[i].x, location[i].y, UIComponents.UI_SPRITESHEET, componentToDraw);
      let style = {font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center'};
      let attachment: string;

      sprite.scale.setTo(0.0, 0.0);
      sprite.anchor.setTo(0.5, 0.5);

      if (itemToAttach) {
        itemToAttach[i] ? attachment = itemToAttach[i] : null;
      }
      if (attachment) {
        console.log(attachment);
        if (attachment.includes('level')) {
          let imageSprite = state.game.add.sprite(0, 0, attachment);
          imageSprite.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
          sprite.addChild(imageSprite);

        } else {
          let toAttach = state.game.add.text(0, 0, attachment, style);
          toAttach.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
          sprite.addChild(toAttach);
        }
      }
      sprite.inputEnabled = enableInput;
      arr.push(sprite);
    }
    return arr;
  }
  /**
   * @description
   * Draws Tick button and Cross button at provided location
   * @param cancelLocation
   * @param okLocation
   * @param state
   * @return
   * */
  public drawAcceptCancelButtons(okLocation: Vector, cancelLocation: Vector, state: Phaser.State): Phaser.Sprite[] {
    let arr = [];
    debugger;
    console.log('drawing buttons');
    arr = this.drawBoxes(
      1,
      [okLocation],
      state,
      null,
      true,
      UIComponents.YES_BUTTON
    );
    arr.push(this.drawBoxes(
      1,
      [cancelLocation],
      state,
      null,
      true,
      UIComponents.NO_BUTTON
    )[0]);
    arr.forEach( (value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
    });
    return arr;
  }
  /**
   * @description
   * Use to draw the main menu at selected state
   * @return {MenuConfig} config
   * returns the config file with the sprites
   * */
  public drawMainMenu(state: Phaser.State): MenuConfig {

    let textArr = ['New Game', 'High Score', 'Preferences'];
    let config = new MenuConfig();

   let arr = this.drawBoxes(3,
     [
       new Vector(state.game.world.centerX, state.game.world.centerY - 110),
       new Vector(state.game.world.centerX, state.game.world.centerY - 50),
       new Vector(state.game.world.centerX, state.game.world.centerY + 10)],
     state,
     textArr);

   arr.forEach( (value, index) => {
     state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
     config.setSprite(MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
   });
    let map: Phaser.Tilemap;

    map = config.fakeTileMap = state.game.add.tilemap(Levels.LEVEL_ONE);
    map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
    map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

    map.createLayer('SkyPrimary').resizeWorld();
    map.createLayer('GroundSecondary').resizeWorld();
    map.createLayer('GroundPrimary').resizeWorld();

    return config;

  }
  /**
   * @description
   * Fades out passed sprites and then destroys them
   * @param {Phaser.State} state
   * @param {Array<Phaser.Sprite>} fadeoutSprites
   * @return {Promise} promise - The returned promise will be completed when all sprites have fadedout
   * */
  public fadeoutSprites(state: Phaser.State, fadeoutSprites: Array<Phaser.Sprite>): Promise<void> {
    return new Promise( (resolve, reject) => {
      if (fadeoutSprites) {
        fadeoutSprites.forEach((sprite: Phaser.Sprite) => {
          state.game.add.tween(sprite.scale).to({
            x: 0.0,
            y: 0.0
          }, 2400, Phaser.Easing.Linear.None, true).onComplete.add(() => {
            sprite.destroy();
            resolve();
          });
        });
      } else {
        reject();
      }
    });
  }
  /**
   * @description
   * Function to draw preferences options on current state
   * @param {Phaser.State} state - Current State
   * @param {Phaser.Sprite[]} fadeoutSprites
   * @return {MenuConfig} MenuConfig - The menu config to return
   * */
  public drawPreferences(state: Phaser.State): MenuConfig {
    let config = new MenuConfig();
      let textArr = ['Select Level', 'Select Player', 'Select Difficulty'];

      let arr = this.drawBoxes(3,
        [
          new Vector(state.game.world.centerX, state.game.world.centerY - 110),
          new Vector(state.game.world.centerX, state.game.world.centerY - 50),
          new Vector(state.game.world.centerX, state.game.world.centerY + 10)],
        state,
        textArr);

      arr.forEach((value, index) =>  {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
        config.setSprite(MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
        // Gives the change of scenery effect
        state.game.camera.focusOn(value);
      });
      return config;
  }

  /**
   * @description
   * Will Generate the available levels the player can choose from
   * @return {MenuConfig} config - see {@Link MenuConfig}
   * */
  public drawLevels(state: Phaser.State): MenuConfig {
    let centerX = state.game.world.centerX;
    let centerY = state.game.world.centerY;
    let config: MenuConfig = new MenuConfig();
    let levels = [UIComponents.LEVEL_ONE_IMAGE, UIComponents.LEVEL_ONE_IMAGE];

    let arr = this.drawBoxes(2,
      [
        new Vector(centerX, centerY),
        new Vector(centerX + 110, centerY)],
      state,
      levels, true,
      UIComponents.PANEL);

    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 2400, Phaser.Easing.Bounce.Out, true);
      config.setSprite(UIComponents[levels[index].toUpperCase().replace(' ', '_')], value);
    });
    return config;
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
