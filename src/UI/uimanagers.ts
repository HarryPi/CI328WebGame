import {
  Difficulty, Levels, MainMenuButtons, States, TankLayout, TileLayers,
  UIComponents
} from '../constants/GameConstants';
import Vector from '../util/vector';
import {DataConfig} from '../config/data.config';
import {MenuConfig} from '../config/menu.config';

export namespace UiManagers {
  export class MenuManager {
    // Class Global vars
    private static _fakeMapExists: boolean = false;

    private static _fakeMap: Phaser.Tilemap;
    private static _animationTime: number = 333;
    private static _buttonHeight: number = 50;
    private static _buttonLength: number = 100;

    /**
     * @description
     * Draws the loading screen at state passed
     * @param {Phaser.State} state
     * */
    public static setLoadingScreen(state: Phaser.State): void {
      let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, UIComponents.LOGO);
      let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, UIComponents.PROGRESS_BAR);

      logo.anchor.setTo(0.5);
      progressBar.anchor.setTo(0.5);
      state.load.setPreloadSprite(progressBar);
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
    private static drawBoxes(noOfBoxes: number, location: Array<Vector>,
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
    public static drawAcceptCancelButtons(okLocation: Vector, cancelLocation: Vector, state: Phaser.State): Phaser.Sprite[] {
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
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
      });
      return arr;
    }

    /**
     * @description
     * Use to draw the main menu at selected state
     * @return {MenuConfig} config
     * returns the config file with the sprites
     * */
    public static drawMainMenu(state: Phaser.State): MenuConfig {
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
          new Vector(state.game.world.centerX, state.game.world.centerY - this._buttonHeight * 2),
          new Vector(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
          new Vector(state.game.world.centerX, state.game.world.centerY)],
        state,
        textArr);

      arr.forEach((value, index) => {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
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
        state.game.state.start(States.GAME_STATE); // Phaser cant detect start on first state???
      });

      config.getSprite(MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
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
    public static fadeoutSprites(state: Phaser.State, fadeoutSprites: Array<Phaser.Sprite>): Promise<void> {
      return new Promise((resolve, reject) => {
        if (fadeoutSprites) {
          fadeoutSprites.forEach((sprite: Phaser.Sprite) => {
            state.game.add.tween(sprite.scale).to({
              x: 0.0,
              y: 0.0
            }, this._animationTime, Phaser.Easing.Linear.None, true).onComplete.add(() => {
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
    public static drawPreferences(state: Phaser.State): MenuConfig {
      let config = new MenuConfig();
      let textArr = ['Select Level', 'Select Player', 'Select Difficulty', 'Back'];

      let arr = this.drawBoxes(4,
        [
          new Vector(state.game.world.centerX, state.game.world.centerY - this._buttonHeight * 2),
          new Vector(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
          new Vector(state.game.world.centerX, state.game.world.centerY),
          new Vector(state.game.world.centerX, state.game.world.centerY + this._buttonHeight)],
        state,
        textArr);

      arr.forEach((value, index) => {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
        config.setSprite(MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
        // Gives the change of scenery effect
        state.game.camera.focusOn(value);
      });

      // Back Button
      config.getSprite(MainMenuButtons.BACK).events.onInputDown.add(() => {
        this.fadeoutSprites(state, arr).then(() => {
          this.drawMainMenu(state);
        });
      });
      config.getSprite(MainMenuButtons.SELECT_DIFFICULTY).events.onInputDown.add(() => {
        this.fadeoutSprites(state, arr).then(() => {
          this.drawDifficulty(state);
        });
      });
      // Select level Button
      config.getSprite(MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
        this.fadeoutSprites(state, arr);
        this.fadeoutSprites(state, arr).then(() => {
          // Preference menu has faded out
          this.drawLevels(state);
        });
      });

      config.getSprite(MainMenuButtons.SELECT_PLAYER).events.onInputDown.add(() => {
        this.fadeoutSprites(state, arr);
        this.fadeoutSprites(state, arr).then(() => {
          // Preference menu has faded out
          this.drawPlayerChoice(state);
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
    public static drawPlayerChoice(state: Phaser.State): MenuConfig {
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
        new Vector(centerX + this._buttonLength, centerY),
        new Vector(centerX + this._buttonLength * 2, centerY),
        new Vector(centerX, centerY + this._buttonLength),
        new Vector(centerX + this._buttonLength, centerY + this._buttonLength)
      ];

      let arr = this.drawBoxes(
        tanks.length,
        vecs,
        state,
        tanks,
        true,
        UIComponents.PANEL
      );
      arr.forEach((value, index) => {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
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
      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);
      bArr[0].events.onInputDown.add(() => {
        DataConfig.applyCahnges();
        this.fadeoutSprites(state, bArr);
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        DataConfig.revertChanges();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });

      return config;
    }

    public static drawDifficulty(state: Phaser.State) {
      let centerX = state.game.world.centerX;
      let centerY = state.game.world.centerY;
      let config: MenuConfig = new MenuConfig();
      let difficulties = ['Easy', 'Normal', 'Hard', 'Insane'];
      let loc = [
        new Vector(centerX, centerY - this._buttonHeight * 2),
        new Vector(centerX, centerY - this._buttonHeight),
        new Vector(centerX, centerY),
        new Vector(centerX, centerY + this._buttonHeight)
      ];

      let arr = this.drawBoxes(4,
        loc,
        state,
        difficulties);

      arr.forEach((sprite: Phaser.Sprite, index: number) => {
        state.game.add.tween(sprite.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
        switch (index) {
          case 0:
            config.setSprite(Difficulty.EASY, sprite);
            break;
          case 1:
            config.setSprite(Difficulty.NORMAL, sprite);
            break;
          case 2:
            config.setSprite(Difficulty.HARD, sprite);
            break;
          case 3:
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
      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);
      bArr[0].events.onInputDown.add(() => {
        DataConfig.applyCahnges();
        this.fadeoutSprites(state, bArr);
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        DataConfig.revertChanges();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });

      return config;
    }

    /**
     * @description
     * Will Generate the available levels the player can choose from
     * @return {MenuConfig} config - see {@Link MenuConfig}
     * */
    public static drawLevels(state: Phaser.State): MenuConfig {
      let centerX = state.game.world.centerX;
      let centerY = state.game.world.centerY;
      let config: MenuConfig = new MenuConfig();
      let levels = [UIComponents.LEVEL_ONE_IMAGE, UIComponents.LEVEL_TWO_IMAGE];

      let arr = this.drawBoxes(2,
        [
          new Vector(centerX, centerY),
          new Vector(centerX + this._buttonLength, centerY)],
        state,
        levels, true,
        UIComponents.PANEL);

      arr.forEach((value, index) => {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
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
      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - arr.length * 50, lastSprite.y + 100), new Vector(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
      bArr[0].events.onInputDown.add(() => {
        DataConfig.applyCahnges();
        this.fadeoutSprites(state, bArr);
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        DataConfig.revertChanges();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });

      return config;
    }

    public static drawGameOver(state: Phaser.State) {
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
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
        state.game.camera.focusOn(value);
        value.events.onInputDown.add(() => {
          this.drawMainMenu(state);
        });
      });
      let gameOver = state.game.add.text(centerX - 145, centerY + 110, 'You lost :( your score was ... todo!', {
        font: '22px Arial',
        fill: '#ff0044'
      });
      gameOver.scale.setTo(0.0, 0.0);
      state.game.add.tween(gameOver.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
    }

  }

  export class PlayerVisualsManager {

    private _state: Phaser.State;
    private static _heartList: Array<Phaser.Sprite> = [];

    constructor(state?: Phaser.State) {
      this._state = state;
    }

    public displayPlayerMaxHealth() {
      this.drawHearts(DataConfig.playerMaxHealth / 2, this._state.game.world.left + 50, this._state.game.world.top + 20, UIComponents.FULL_HEART);
    }

    public removeHeartByDamage(damage: number) {
      for (let i = damage; i > 0; i--) {
        let heart = PlayerVisualsManager._heartList.reverse().find((heartSprite: Phaser.Sprite) => { // we reverse the array to get the last heart
          return heartSprite.frameName === UIComponents.FULL_HEART || heartSprite.frameName === UIComponents.HALF_HEART;
        });
        if (heart) { // if two consecutive bullets hit the player on the same frame, the game doesnt have a chance to call game over and hearts are undefined
          if (heart.frameName === UIComponents.HALF_HEART) {
            heart.frameName = UIComponents.EMPTY_HEART;
          } else {
            heart.frameName = UIComponents.HALF_HEART;
          }
          PlayerVisualsManager._heartList.reverse(); // ensure array returns to its original form
        }
      }
    }

    public addHeartByHealingReceived(healing: number) {
      for (let i = healing; i >= 0; i--) {
        let heart = PlayerVisualsManager._heartList.find((heart: Phaser.Sprite) => {
          return heart.frame === UIComponents.EMPTY_HEART || heart.frame === UIComponents.HALF_HEART;
        });
        if (heart.frame === UIComponents.HALF_HEART) {
          heart.frame = UIComponents.FULL_HEART;
        } else {
          heart.frame = UIComponents.FULL_HEART;
        }
      }
    }

    private drawHearts(no: number, x: number, y: number, kindOfHeart: UIComponents.HALF_HEART | UIComponents.FULL_HEART | UIComponents.EMPTY_HEART) {
      const heartWidth = 128;
      for (let i = 0; i < no; i++) {
        console.log(i);
        let heart = this._state.add.sprite(x + (heartWidth / 2) * i, y, UIComponents.PLAYER_VISUALS_SPRITESHEET, kindOfHeart);
        heart.fixedToCamera = true;
        heart.scale = new Phaser.Point(0.5, 0.5);
        PlayerVisualsManager._heartList.push(heart);
      }
    }
  }
}
