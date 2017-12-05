import {
  Difficulty, Levels, MainMenuButtons, States, TankLayout, TileLayers,
  UIComponents
} from '../constants/GameConstants';
import { MenuConfig } from '../config/menu.config';
import Vector from '../util/vector';
import { DataConfig } from '../config/data.config';
import {Extras, IStateMessanger} from '../util/IStateMessanger';

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

  // Class Global vars
  private _fakeMapExists: boolean = false;
  private _fakeMap: Phaser.Tilemap;

  /**
   * @constructor
   * Will generate all required paths for the assets
   * */
  constructor() {

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
    this.loader.image(UIComponents.CANDY_LIGHT_IMG, this._tank4Url);
    this.loader.image(UIComponents.CANDY_FORTRESS_IMG, this._tank3Url);
    this.loader.image(UIComponents.CANDY_RECON_IMG, this._tank5Url);
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
                    childRelevantPosition: Vector = new Vector(0.5, 0.5)): Array<Phaser.Sprite> {
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
        if (attachment.includes('level') || attachment.includes('img')) {
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
    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
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
    if (state.key === States.GAMEOVER_SATE) {
      state.game.state.start(States.BOOT_STATE, true, true);
      this._fakeMapExists = false;
      this._fakeMap = null;
      return;
    }
    let textArr = ['New Game', 'High Score', 'Preferences'];
    let config = new MenuConfig();

    let arr = this.drawBoxes(3,
      [
        new Vector(state.game.world.centerX, state.game.world.centerY - 110),
        new Vector(state.game.world.centerX, state.game.world.centerY - 50),
        new Vector(state.game.world.centerX, state.game.world.centerY + 10)],
      state,
      textArr);

    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      config.setSprite(MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
      state.game.camera.focusOn(value);
      value.bringToTop();
    });
    let map: Phaser.Tilemap;

    if (!this._fakeMapExists) {
      map = config.fakeTileMap = state.game.add.tilemap(Levels.LEVEL_ONE);
      map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
      map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

      map.createLayer('SkyPrimary').resizeWorld();
      map.createLayer('GroundSecondary').resizeWorld();
      map.createLayer('GroundPrimary').resizeWorld();
      this._fakeMapExists = true;
      this._fakeMap = map;
    }

    config.getSprite(MainMenuButtons.NEW_GAME).events.onInputDown.add(() => {
      this._fakeMapExists ? this._fakeMap.destroy() : null;
      console.log(DataConfig.level);
      state.game.state.start(States.GAME_STATE); // Phaser cant detect start on first state???
    });

    config.getSprite(MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
    });

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
    return new Promise((resolve, reject) => {
      if (fadeoutSprites) {
        fadeoutSprites.forEach((sprite: Phaser.Sprite) => {
          state.game.add.tween(sprite.scale).to({
            x: 0.0,
            y: 0.0
          }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(() => {
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
    let textArr = ['Select Level', 'Select Player', 'Select Difficulty', 'Back'];

    let arr = this.drawBoxes(4,
      [
        new Vector(state.game.world.centerX, state.game.world.centerY - 110),
        new Vector(state.game.world.centerX, state.game.world.centerY - 50),
        new Vector(state.game.world.centerX, state.game.world.centerY + 10),
        new Vector(state.game.world.centerX, state.game.world.centerY + 70)],
      state,
      textArr);

    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      config.setSprite(MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
      // Gives the change of scenery effect
      state.game.camera.focusOn(value);
    });

    // Back Button
    config.getSprite(MainMenuButtons.BACK).events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawMainMenu(state);
      });
    });
    config.getSprite(MainMenuButtons.SELECT_DIFFICULTY).events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawDifficulty(state);
      });
    });
    // Select level Button
    config.getSprite(MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, arr);
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        // Preference menu has faded out
        AssetsUtils.drawLevels(state);
      });
    });

    config.getSprite(MainMenuButtons.SELECT_PLAYER).events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, arr);
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        // Preference menu has faded out
        AssetsUtils.drawPlayerChoice(state);
      });
    });
    return config;
  }

  /**
   * @description
   * Function to draw the player options of tank choices
   * @param {Phaser.State} state
   * @return config
   * */
  public drawPlayerChoice(state: Phaser.State): MenuConfig {
    let centerX = state.game.world.centerX;
    let centerY = state.game.world.centerY;
    let config: MenuConfig = new MenuConfig();
    let tanks = [
      UIComponents.CANDY_RECON_IMG,
      UIComponents.CANDY_LIGHT_IMG,
      UIComponents.CANDY_HUNTER_IMG,
      UIComponents.CANDY_ARTILLERY_IMG,
      UIComponents.CANDY_FORTRESS_IMG
    ];
    let vecs: Vector[] = [
      new Vector(centerX, centerY),
      new Vector(centerX + 110, centerY),
      new Vector(centerX + 220, centerY),
      new Vector(centerX , centerY + 110),
      new Vector(centerX + 110, centerY + 110)
    ];

    let arr = AssetsUtils.drawBoxes(
      tanks.length,
      vecs,
      state,
      tanks,
      true,
      UIComponents.PANEL
    );
    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      config.setSprite(UIComponents[tanks[index].toUpperCase().replace(' ', '_')], value);
      // Gives the change of scenery effect
    });

    config.getSprite(UIComponents.CANDY_ARTILLERY_IMG).events.onInputDown.add(() => {
      DataConfig.tank = TankLayout.CANDY_ARTILLERY;
    });
    config.getSprite(UIComponents.CANDY_FORTRESS_IMG).events.onInputDown.add(() => {
      DataConfig.tank = TankLayout.CANDY_FORTRESS;
    });
    config.getSprite(UIComponents.CANDY_HUNTER_IMG).events.onInputDown.add(() => {
      DataConfig.tank = TankLayout.CANDY_HUNTER;
    });
    config.getSprite(UIComponents.CANDY_LIGHT_IMG).events.onInputDown.add(() => {
      DataConfig.tank = TankLayout.CANDY_LIGHT;
    });
    config.getSprite(UIComponents.CANDY_RECON_IMG).events.onInputDown.add(() => {
      DataConfig.tank = TankLayout.CANDY_RECON;
    });

    let lastSprite = arr[arr.length - 2];
    let bArr = AssetsUtils.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);
    bArr[0].events.onInputDown.add(() => {
      DataConfig.applyCahnges();
      AssetsUtils.fadeoutSprites(state, bArr);
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
    });
    bArr[1].events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, bArr);
      DataConfig.revertChanges();
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
    });

    return config;
  }

  public drawDifficulty(state: Phaser.State) {
    let centerX = state.game.world.centerX;
    let centerY = state.game.world.centerY;
    let config: MenuConfig = new MenuConfig();
    let difficulties = ['Easy', 'Normal', 'Hard', 'Insane'];
    let loc = [
      new Vector(centerX, centerY - 110),
      new Vector(centerX, centerY - 50),
      new Vector(centerX, centerY + 10),
      new Vector(centerX, centerY + 70)
    ];

    let arr = AssetsUtils.drawBoxes(4,
      loc,
      state,
      difficulties);

    arr.forEach( (sprite: Phaser.Sprite, index: number) => {
      state.game.add.tween(sprite.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      switch (index) {
        case 3:
          config.setSprite(Difficulty.EASY, sprite);
          break;
        case 2:
          config.setSprite(Difficulty.NORMAL, sprite);
          break;
        case 1:
          config.setSprite(Difficulty.HARD, sprite);
              break;
        case 0:
          config.setSprite(Difficulty.INSANE, sprite);
          break;
        default:
          break;
      }
    });

    config.getSprite(Difficulty.EASY).events.onInputDown.add(() => {
      DataConfig.difficulty = Difficulty.EASY;
    });
    config.getSprite(Difficulty.NORMAL).events.onInputDown.add(() => {
      DataConfig.difficulty = Difficulty.NORMAL;
    });
    config.getSprite(Difficulty.HARD).events.onInputDown.add(() => {
      DataConfig.difficulty = Difficulty.HARD;
    });
    config.getSprite(Difficulty.INSANE).events.onInputDown.add(() => {
      DataConfig.difficulty = Difficulty.INSANE;
    });

    let lastSprite = arr[arr.length - 1];
    let bArr = AssetsUtils.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);
    bArr[0].events.onInputDown.add(() => {
      DataConfig.applyCahnges();
      AssetsUtils.fadeoutSprites(state, bArr);
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
        console.log(DataConfig.difficulty);
      });
    });
    bArr[1].events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, bArr);
      DataConfig.revertChanges();
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
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
    let levels = [UIComponents.LEVEL_ONE_IMAGE, UIComponents.LEVEL_TWO_IMAGE];

    let arr = this.drawBoxes(2,
      [
        new Vector(centerX, centerY),
        new Vector(centerX + 110, centerY)],
      state,
      levels, true,
      UIComponents.PANEL);

    arr.forEach((value, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      let name = UIComponents[levels[index].toUpperCase().replace(' ', '_')];
      config.setSprite(name, value);
      value.events.onInputDown.add(() => {
        let lName = name.toString();
        if (lName.includes('one')) {
          DataConfig.level = Levels.LEVEL_ONE;
        } else if (lName.includes('two')) {
          DataConfig.level = Levels.LEVEL_TWO;
        }
      });
    });

    // Setup ok/no buttons
    let lastSprite = arr[arr.length - 1];
    let bArr = AssetsUtils.drawAcceptCancelButtons(new Vector(lastSprite.x - arr.length * 50, lastSprite.y + 100), new Vector(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
    bArr[0].events.onInputDown.add(() => {
      DataConfig.applyCahnges();
      AssetsUtils.fadeoutSprites(state, bArr);
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
    });
    bArr[1].events.onInputDown.add(() => {
      AssetsUtils.fadeoutSprites(state, bArr);
      DataConfig.revertChanges();
      AssetsUtils.fadeoutSprites(state, arr).then(() => {
        AssetsUtils.drawPreferences(state);
      });
    });

    return config;
  }

  public drawGameOver(state: Phaser.State) {
    let map: Phaser.Tilemap;
    if (this._fakeMapExists) {
      this._fakeMapExists = false;
      this._fakeMap.destroy();
    }
    map = state.game.add.tilemap(Levels.LEVEL_ONE);
    map.addTilesetImage(TileLayers.GRASS_LAYER, TileLayers.GRASS_LAYER);
    map.addTilesetImage(TileLayers.BACKGROUND, TileLayers.BACKGROUND);

    map.createLayer('SkyPrimary').resizeWorld();
    map.createLayer('GroundSecondary').resizeWorld();
    map.createLayer('GroundPrimary').resizeWorld();
    this._fakeMapExists = true;
    this._fakeMap = map;

    state.game.camera.unfollow();
    let centerX = state.game.world.centerX;
    let centerY = state.game.world.centerY;
    let loc = [new Vector(centerX, centerY)];

    this.drawBoxes(1, loc, state, ['Main Menu']).forEach((value: Phaser.Sprite, index) => {
      state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
      state.game.camera.focusOn(value);
      value.events.onInputDown.add( () => {
        AssetsUtils.drawMainMenu(state);
      });
    });
    let gameOver = state.game.add.text(centerX - 145, centerY + 110, 'You lost :( your score was ... todo!', {font: '22px Arial', fill: '#ff0044'});
    gameOver.scale.setTo(0.0, 0.0);
    state.game.add.tween(gameOver.scale).to({x: 1.0, y: 1.0}, 1000, Phaser.Easing.Bounce.Out, true);
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
