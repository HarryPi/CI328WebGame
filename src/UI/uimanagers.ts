import {
  ComponentType, CrateName,
  Difficulty, InputType, Levels, MainMenuButtons, States, TankLayout, TileLayers,
  UIComponents
} from '../constants/GameConstants';
import Vector from '../util/vector';
import {DataConfig} from '../config/data.config';
import {MenuConfig} from '../config/menu.config';
import {Entity} from '../entities/entity';
import {DataComponents} from '../component/data.components';
import TankComponent = DataComponents.TankComponent;
import Input from '../util/input';

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
     */
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
     */
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
     */
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
     */
    public static drawMainMenu(state: Phaser.State, restartGame: boolean = false): MenuConfig {
      if (state.key === States.GAMEOVER_SATE || restartGame) {
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
     */
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
     */
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
     */
    public static drawPlayerChoice(state: Phaser.State): MenuConfig {
      const centerX = state.game.world.centerX;
      const centerY = state.game.world.centerY;
      let style = {font: '22px Calibri', fill: '#19ff7b'};
      const boxWidth = 350;
      const boxHeight = 25;

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
      });
      const firstSprite: Phaser.Sprite = arr[0];

      const selectedTankString = 'Selected Tank: ';
      const selectedTankSpeedString = 'Speed: ';
      const selectedTankBulletSpeedString = 'Bullet Speed: ';
      const selectedTankDamageString = 'Damage: ';
      const extraInfoString = '* Damage is proportional to difficulty';

      const selectedTankTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y - boxHeight, selectedTankString, style);
      const speedTankTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y, selectedTankSpeedString, style);
      const selectedTankBulletSpeedTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y + boxHeight, selectedTankBulletSpeedString, style);
      const selectedTankDamageTxt = state.game.add.text(firstSprite.x - boxWidth, firstSprite.y + boxHeight * 2, selectedTankDamageString, style);
      const extraInfoTxt = state.game.add.text(firstSprite.x - boxWidth, state.game.world.bottom + boxHeight * 2, extraInfoString, style);

      const fakeEntity: Entity = new Entity(state.game, 0, 0);
      fakeEntity.withComponent([new TankComponent(DataConfig.tank)]);
      const tankComponent = fakeEntity.getComponent<TankComponent>(ComponentType.TANK);
      const spriteTxtList = [selectedTankTxt, speedTankTxt, selectedTankBulletSpeedTxt, selectedTankDamageTxt, extraInfoTxt];

      config.getSprite(UIComponents.CANDY_ARTILLERY_IMG).events.onInputDown.add(() => {
        tankComponent.tankKind = DataConfig.tank = TankLayout.CANDY_ARTILLERY;
        clearTankAttributes();
        displayTankAttributes();
      });
      config.getSprite(UIComponents.CANDY_FORTRESS_IMG).events.onInputDown.add(() => {
        tankComponent.tankKind = DataConfig.tank = TankLayout.CANDY_FORTRESS;
        clearTankAttributes();
        displayTankAttributes();
      });
      config.getSprite(UIComponents.CANDY_HUNTER_IMG).events.onInputDown.add(() => {
        tankComponent.tankKind = DataConfig.tank = TankLayout.CANDY_HUNTER;
        clearTankAttributes();
        displayTankAttributes();
      });
      config.getSprite(UIComponents.CANDY_LIGHT_IMG).events.onInputDown.add(() => {
        tankComponent.tankKind = DataConfig.tank = TankLayout.CANDY_LIGHT;
        clearTankAttributes();
        displayTankAttributes();
      });
      config.getSprite(UIComponents.CANDY_RECON_IMG).events.onInputDown.add(() => {
        tankComponent.tankKind = DataConfig.tank = TankLayout.CANDY_RECON;
        clearTankAttributes();
        displayTankAttributes();
      });

      const lastSprite = arr[arr.length - 2];

      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);

      bArr[0].events.onInputDown.add(() => {
        DataConfig.applyChanges();
        spriteTxtList.forEach((sprite: Phaser.Sprite) => {
          sprite.destroy();
        });
        this.fadeoutSprites(state, bArr);
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        spriteTxtList.forEach((sprite: Phaser.Sprite) => {
          sprite.destroy();
        });
        DataConfig.revertChanges();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });

      return config;

      function clearTankAttributes() {
        selectedTankDamageTxt.text = selectedTankDamageString;
        speedTankTxt.text = selectedTankSpeedString;
        selectedTankBulletSpeedTxt.text = selectedTankBulletSpeedString;
        selectedTankTxt.text = selectedTankString;
        extraInfoTxt.text = '';
      }

      function displayTankAttributes() {


        updateTxtSpriteWithText(selectedTankTxt, tankComponent.tankKindName);
        updateTxtSpriteWithText(speedTankTxt, tankComponent.speed.toString());
        updateTxtSpriteWithText(selectedTankBulletSpeedTxt, tankComponent.bulletSpeed.toString());
        updateTxtSpriteWithText(selectedTankDamageTxt, (tankComponent.bulletDmg * DataConfig.playerDamage).toString() + '*');
        updateTxtSpriteWithText(extraInfoTxt, extraInfoString);

      }

      function updateTxtSpriteWithText(txtSprite: Phaser.Text, updatedTxt: string): void {
        let curString = txtSprite.text;
        txtSprite.setText(curString + updatedTxt);
      }
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

      const paddingWidth = 95;
      const paddingHeight = 45;
      const style = {font: '22px Calibri', fill: '#19ff7b'};
      const selectedDifficulty = 'Selected difficulty: ';
      let lastSprite = arr[arr.length - 1];

      const selectedLevelTxt: Phaser.Text = state.game.add.text(lastSprite.x - paddingWidth, lastSprite.y + paddingHeight, selectedDifficulty, style);

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
        selectedLevelTxt.text = selectedDifficulty + 'Easy';
      });
      config.getSprite(Difficulty.NORMAL).events.onInputDown.add(() => {
        DataConfig.difficulty = Difficulty.NORMAL;
        selectedLevelTxt.text = selectedDifficulty + 'Normal';
      });
      config.getSprite(Difficulty.HARD).events.onInputDown.add(() => {
        DataConfig.difficulty = Difficulty.HARD;
        selectedLevelTxt.text = selectedDifficulty + 'Hard';
      });
      config.getSprite(Difficulty.INSANE).events.onInputDown.add(() => {
        DataConfig.difficulty = Difficulty.INSANE;
        selectedLevelTxt.text = selectedDifficulty + 'Insane';
      });

      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - 30, lastSprite.y + 100), new Vector(lastSprite.x + 10, lastSprite.y + 100), state);
      bArr[0].events.onInputDown.add(() => {
        selectedLevelTxt.destroy();
        DataConfig.applyChanges();
        this.fadeoutSprites(state, bArr);
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        selectedLevelTxt.destroy();
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
     */
    public static drawLevels(state: Phaser.State): MenuConfig {
      let centerX = state.game.world.centerX;
      let centerY = state.game.world.centerY;
      let config: MenuConfig = new MenuConfig();
      let levels = [UIComponents.LEVEL_ONE_IMAGE, UIComponents.LEVEL_TWO_IMAGE];
      let style = {font: '22px Calibri', fill: '#19ff7b'};

      const paddingWidth = 350;
      const paddingHeight = 25;

      let arr = this.drawBoxes(2,
        [
          new Vector(centerX, centerY),
          new Vector(centerX + this._buttonLength, centerY)],
        state,
        levels, true,
        UIComponents.PANEL);

      const firstSprite = arr[0];
      const selectedLevelString = `Selected Level: `;
      const selectedLevelTxt: Phaser.Text = state.game.add.text(firstSprite.x - paddingWidth, firstSprite.y - paddingHeight, selectedLevelString, style);

      arr.forEach((value, index) => {
        state.game.add.tween(value.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
        let name = UIComponents[levels[index].toUpperCase().replace(' ', '_')];
        config.setSprite(name, value);
        value.events.onInputDown.add(() => {
          let lName = name.toString();
          if (lName.includes('one')) {
            DataConfig.level = Levels.LEVEL_ONE;
            selectedLevelTxt.text = selectedLevelString + 'Grass Level';
          } else if (lName.includes('two')) {
            DataConfig.level = Levels.LEVEL_TWO;
            selectedLevelTxt.text = selectedLevelString + 'Candy Level';
          }
        });
      });

      // Setup ok/no buttons
      let lastSprite = arr[arr.length - 1];
      let bArr = this.drawAcceptCancelButtons(new Vector(lastSprite.x - arr.length * 50, lastSprite.y + 100), new Vector(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
      bArr[0].events.onInputDown.add(() => {
        DataConfig.applyChanges();
        this.fadeoutSprites(state, bArr);
        selectedLevelTxt.destroy();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });
      bArr[1].events.onInputDown.add(() => {
        this.fadeoutSprites(state, bArr);
        DataConfig.revertChanges();
        selectedLevelTxt.destroy();
        this.fadeoutSprites(state, arr).then(() => {
          this.drawPreferences(state);
        });
      });

      return config;
    }

    public static drawGameOver(state: Phaser.State, score: number): void {
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
      let gameOver = state.game.add.text(centerX - 145, centerY + 110, `You lost :( your score was ${score}!`, {
        font: '22px Arial',
        fill: '#ff0044'
      });
      gameOver.scale.setTo(0.0, 0.0);
      state.game.add.tween(gameOver.scale).to({x: 1.0, y: 1.0}, this._animationTime, Phaser.Easing.Bounce.Out, true);
    }

    public static drawPauseMenu(state: Phaser.State): void {
      const buttonWidth = 130;

      let pauseMenu = state.add.sprite(state.game.world.right - buttonWidth, state.game.world.top, UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);
      let toAttach = state.game.add.text(0, 0, 'Pause', {
        font: '22px Arial',
        fill: '#ff0044',
        wordWrap: true,
        wordWrapWidth: pauseMenu.width,
        align: 'center'
      });

      toAttach.anchor.setTo(-1, -0.35);
      pauseMenu.addChild(toAttach);
      pauseMenu.scale = new Phaser.Point(0.7, 0.7);
      pauseMenu.inputEnabled = true;
      pauseMenu.fixedToCamera = true;

      pauseMenu.events.onInputDown.add(() => {

        if (state.game.paused === true) { // if game is already pause do not recreate pause menu
          return;
        }

        state.game.paused = true;

        let mainMenuBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y + (state.game.height / 2), UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);
        let backBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y - (buttonWidth / 2) + (state.game.height / 2), UIComponents.UI_SPRITESHEET, UIComponents.FULL_BUTTON);

        let mainMenuTxt = state.add.text(0, 0, 'Main Menu', {
          font: '22px Arial',
          fill: '#ff0044',
          wordWrap: true,
          wordWrapWidth: mainMenuBtn.width,
          align: 'center'
        });
        let resumeTxt = state.add.text(0, 0, 'Resume', {
          font: '22px Arial',
          fill: '#ff0044',
          wordWrap: true,
          wordWrapWidth: backBtn.width,
          align: 'center'
        });

        mainMenuTxt.anchor.setTo(-0.4, -0.35);
        resumeTxt.anchor.setTo(-0.65, -0.35);

        mainMenuBtn.addChild(mainMenuTxt);
        backBtn.addChild(resumeTxt);

        mainMenuBtn.inputEnabled = true;
        backBtn.inputEnabled = true;

        mainMenuBtn.events.onInputDown.add(() => {
          state.game.paused = false;
          this.drawMainMenu(state, true);
        });

        backBtn.events.onInputDown.add(() => {
          state.game.paused = false;
          mainMenuBtn.destroy();
          backBtn.destroy();
        });
      });
    }

    public static drawYouWonMenu(state: Phaser.State, score: number) {
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
      let gameOver = state.game.add.text(centerX - 250, centerY + 110, `You Won! You cleared the stage :) your score was ${score}!`, {
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
    private static _repairIcon: Phaser.Sprite;

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
        if (heart) { // if two consecutive bullets hit the player on the same frame, the game doesnt have a chance to call game over state thus hearts are undefined and throws error
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
          return heart.frameName === UIComponents.EMPTY_HEART || heart.frameName === UIComponents.HALF_HEART;
        });
        if (heart) {
          if (heart.frameName === UIComponents.HALF_HEART) {
            heart.frameName = UIComponents.FULL_HEART;
          } else if (heart.frameName === UIComponents.FULL_HEART) {
            // do nothing
            // This means all hearts are full
          } else {
            heart.frameName = UIComponents.FULL_HEART;
          }
        }
      }
    }

    public addPowerUpIcon(powerUpKind: TankLayout.CRATE_REPAIR) {
      const paddingHeight = - 60;
      const paddingWidth = 20;
      const repairIconLocation: Vector = new Vector(this._state.game.camera.x + paddingWidth, this._state.game.camera.y + paddingHeight);

      switch (powerUpKind) {
        case TankLayout.CRATE_REPAIR:
          if (PlayerVisualsManager._repairIcon) {
            if (!PlayerVisualsManager._repairIcon.alive) {
              PlayerVisualsManager._repairIcon.reset(repairIconLocation.x, repairIconLocation.y);
            }
            break;
          }
          PlayerVisualsManager._repairIcon = this._state.game.add.sprite(repairIconLocation.x, repairIconLocation.y, TankLayout.TANK_SPRITESHEET, TankLayout.CRATE_REPAIR);
          PlayerVisualsManager._repairIcon.fixedToCamera = true;
          break;
        default:
          break;
      }
    }

    public removePowerUpIcon(powerUpKind: TankLayout.CRATE_REPAIR) {
      switch (powerUpKind) {
        case TankLayout.CRATE_REPAIR:
          try {
            PlayerVisualsManager._repairIcon.kill();
          } catch (e){
            console.warn(e.toString()); // do nothing
          }
          break;
        default:
          break;
      }
    }

    private drawHearts(no: number, x: number, y: number, kindOfHeart: UIComponents.HALF_HEART | UIComponents.FULL_HEART | UIComponents.EMPTY_HEART) {
      const heartWidth = 128;
      for (let i = 0; i < no; i++) {
        let heart = this._state.add.sprite(x + (heartWidth / 2) * i, y, UIComponents.PLAYER_VISUALS_SPRITESHEET, kindOfHeart);
        heart.fixedToCamera = true;
        heart.scale = new Phaser.Point(0.5, 0.5);
        PlayerVisualsManager._heartList.push(heart);
      }
    }

    public static cleanUp() {
      PlayerVisualsManager._heartList = [];
      PlayerVisualsManager._repairIcon = undefined;
    }

    public buildControlButtons(input: Input) {
      const paneWidth = 100;
      const paneHeight = 100;
      const paddingHeight = 15;
      const paddingWidth = 100;
      const bottomLeft = new Vector(this._state.game.world.left, this._state.game.world.bottom / 2);
      const bottomRight = new Vector(this._state.game.world.right, this._state.game.world.bottom / 2);

      const moveLeftBtn = this._state.game.add.sprite(bottomLeft.x + paddingWidth / 4, bottomLeft.y, UIComponents.UI_SPRITESHEET, UIComponents.PANEL);
      const moveRight = this._state.game.add.sprite(bottomRight.x  - paddingWidth, bottomRight.y, UIComponents.UI_SPRITESHEET, UIComponents.PANEL);
      // const fireBtn = this._state.game.add.sprite(bottomRight.x, bottomRight.y, UIComponents.UI_SPRITESHEET, UIComponents.PANEL);

      moveLeftBtn.alpha = 0.6;
      moveRight.alpha = 0.6;
      // fireBtn.alpha = 0.6;

      moveLeftBtn.inputEnabled = true;
      moveRight.inputEnabled = true;
      // fireBtn.inputEnabled = true;

      moveLeftBtn.fixedToCamera = true;
      moveRight.fixedToCamera = true;
      // fireBtn.fixedToCamera = true;

      return [moveLeftBtn, moveRight];
    }
  }
}
