"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const menu_config_1 = require("../config/menu.config");
const vector_1 = require("../util/vector");
const data_config_1 = require("../config/data.config");
/**
 * @class
 * Class to load assets into the cached memory
 * */
class AssetLoader {
    /**
     * @constructor
     * Will generate all required paths for the assets
     * */
    constructor() {
        // Class Global vars
        this._fakeMapExists = false;
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
    init(loader) {
        this.loader = loader;
    }
    /**
     * @description
     * Loads the pre-requisites for the loading screen
     * */
    loadBoot() {
        try {
            this.loader.image(GameConstants_1.UIComponents.PROGRESS_BAR, this._progressBarUrl);
            this.loader.image(GameConstants_1.UIComponents.LOGO, this._logoUrl);
        }
        catch (e) {
            console.log(e);
            // todo: Exception handling class
        }
    }
    /**
     * @description
     * Draws the loading screen at state passed
     * @param {Phaser.State} state
     * */
    setLoadingScreen(state) {
        let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
        let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
        logo.anchor.setTo(0.5);
        progressBar.anchor.setTo(0.5);
        state.load.setPreloadSprite(progressBar);
    }
    /**
     * @description
     * Loads all assets into the cached memory **Note this doesnt include loading screen assets see {@link AssetLoader#loadBoot}
     * */
    loadAll() {
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_TWO, this._levelTwoUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.atlasXML(GameConstants_1.UIComponents.UI_SPRITESHEET, this._uiBackgroundUrl, this.uiBackgroundUrlXML);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
        this.loader.image(GameConstants_1.UIComponents.LEVEL_ONE_IMAGE, this._levelOneImgUrl);
        this.loader.image(GameConstants_1.UIComponents.LEVEL_TWO_IMAGE, this._levelTwoImgUrl);
        this.loader.image(GameConstants_1.TileLayers.CANDY_LAYER, this._candyLayerUrl);
        this.loader.image(GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG, this._tank1Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_HUNTER_IMG, this._tank2Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_LIGHT_IMG, this._tank4Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_FORTRESS_IMG, this._tank3Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_RECON_IMG, this._tank5Url);
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
    drawBoxes(noOfBoxes, location, state, itemToAttach, enableInput = true, componentToDraw = GameConstants_1.UIComponents.FULL_BUTTON, childRelevantPosition = new vector_1.default(0.5, 0.5)) {
        let arr = [];
        for (let i = 0; i < noOfBoxes; i++) {
            let sprite = state.add.sprite(location[i].x, location[i].y, GameConstants_1.UIComponents.UI_SPRITESHEET, componentToDraw);
            let style = { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center' };
            let attachment;
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
                }
                else {
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
    drawAcceptCancelButtons(okLocation, cancelLocation, state) {
        let arr = [];
        console.log('drawing buttons');
        arr = this.drawBoxes(1, [okLocation], state, null, true, GameConstants_1.UIComponents.YES_BUTTON);
        arr.push(this.drawBoxes(1, [cancelLocation], state, null, true, GameConstants_1.UIComponents.NO_BUTTON)[0]);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
        });
        return arr;
    }
    /**
     * @description
     * Use to draw the main menu at selected state
     * @return {MenuConfig} config
     * returns the config file with the sprites
     * */
    drawMainMenu(state) {
        if (state.key === GameConstants_1.States.GAMEOVER_SATE) {
            state.game.state.start(GameConstants_1.States.BOOT_STATE, true, true);
            this._fakeMapExists = false;
            this._fakeMap = null;
            return;
        }
        let textArr = ['New Game', 'High Score', 'Preferences'];
        let config = new menu_config_1.MenuConfig();
        let arr = this.drawBoxes(3, [
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 110),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 50),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY + 10)
        ], state, textArr);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
            state.game.camera.focusOn(value);
            value.bringToTop();
        });
        let map;
        if (!this._fakeMapExists) {
            map = config.fakeTileMap = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._fakeMapExists = true;
            this._fakeMap = map;
        }
        config.getSprite(GameConstants_1.MainMenuButtons.NEW_GAME).events.onInputDown.add(() => {
            this._fakeMapExists ? this._fakeMap.destroy() : null;
            console.log(data_config_1.DataConfig.level);
            state.game.state.start(GameConstants_1.States.GAME_STATE); // Phaser cant detect start on first state???
        });
        config.getSprite(GameConstants_1.MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
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
    fadeoutSprites(state, fadeoutSprites) {
        return new Promise((resolve, reject) => {
            if (fadeoutSprites) {
                fadeoutSprites.forEach((sprite) => {
                    state.game.add.tween(sprite.scale).to({
                        x: 0.0,
                        y: 0.0
                    }, 1000, Phaser.Easing.Linear.None, true).onComplete.add(() => {
                        sprite.destroy();
                        resolve();
                    });
                });
            }
            else {
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
    drawPreferences(state) {
        let config = new menu_config_1.MenuConfig();
        let textArr = ['Select Level', 'Select Player', 'Select Difficulty', 'Back'];
        let arr = this.drawBoxes(4, [
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 110),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 50),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY + 10),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY + 70)
        ], state, textArr);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
            // Gives the change of scenery effect
            state.game.camera.focusOn(value);
        });
        // Back Button
        config.getSprite(GameConstants_1.MainMenuButtons.BACK).events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawMainMenu(state);
            });
        });
        config.getSprite(GameConstants_1.MainMenuButtons.SELECT_DIFFICULTY).events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawDifficulty(state);
            });
        });
        // Select level Button
        config.getSprite(GameConstants_1.MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, arr);
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                // Preference menu has faded out
                AssetsUtils.drawLevels(state);
            });
        });
        config.getSprite(GameConstants_1.MainMenuButtons.SELECT_PLAYER).events.onInputDown.add(() => {
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
    drawPlayerChoice(state) {
        let centerX = state.game.world.centerX;
        let centerY = state.game.world.centerY;
        let config = new menu_config_1.MenuConfig();
        let tanks = [
            GameConstants_1.UIComponents.CANDY_RECON_IMG,
            GameConstants_1.UIComponents.CANDY_LIGHT_IMG,
            GameConstants_1.UIComponents.CANDY_HUNTER_IMG,
            GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG,
            GameConstants_1.UIComponents.CANDY_FORTRESS_IMG
        ];
        let vecs = [
            new vector_1.default(centerX, centerY),
            new vector_1.default(centerX + 110, centerY),
            new vector_1.default(centerX + 220, centerY),
            new vector_1.default(centerX, centerY + 110),
            new vector_1.default(centerX + 110, centerY + 110)
        ];
        let arr = AssetsUtils.drawBoxes(tanks.length, vecs, state, tanks, true, GameConstants_1.UIComponents.PANEL);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.UIComponents[tanks[index].toUpperCase().replace(' ', '_')], value);
            // Gives the change of scenery effect
        });
        config.getSprite(GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG).events.onInputDown.add(() => {
            data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_ARTILLERY;
        });
        config.getSprite(GameConstants_1.UIComponents.CANDY_FORTRESS_IMG).events.onInputDown.add(() => {
            data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_FORTRESS;
        });
        config.getSprite(GameConstants_1.UIComponents.CANDY_HUNTER_IMG).events.onInputDown.add(() => {
            data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_HUNTER;
        });
        config.getSprite(GameConstants_1.UIComponents.CANDY_LIGHT_IMG).events.onInputDown.add(() => {
            data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_LIGHT;
        });
        config.getSprite(GameConstants_1.UIComponents.CANDY_RECON_IMG).events.onInputDown.add(() => {
            data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_RECON;
        });
        let lastSprite = arr[arr.length - 2];
        let bArr = AssetsUtils.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
        bArr[0].events.onInputDown.add(() => {
            data_config_1.DataConfig.applyCahnges();
            AssetsUtils.fadeoutSprites(state, bArr);
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawPreferences(state);
            });
        });
        bArr[1].events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, bArr);
            data_config_1.DataConfig.revertChanges();
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawPreferences(state);
            });
        });
        return config;
    }
    drawDifficulty(state) {
        let centerX = state.game.world.centerX;
        let centerY = state.game.world.centerY;
        let config = new menu_config_1.MenuConfig();
        let difficulties = ['Easy', 'Normal', 'Hard', 'Insane'];
        let loc = [
            new vector_1.default(centerX, centerY - 110),
            new vector_1.default(centerX, centerY - 50),
            new vector_1.default(centerX, centerY + 10),
            new vector_1.default(centerX, centerY + 70)
        ];
        let arr = AssetsUtils.drawBoxes(4, loc, state, difficulties);
        arr.forEach((sprite, index) => {
            state.game.add.tween(sprite.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            switch (index) {
                case 3:
                    config.setSprite(GameConstants_1.Difficulty.EASY, sprite);
                    break;
                case 2:
                    config.setSprite(GameConstants_1.Difficulty.NORMAL, sprite);
                    break;
                case 1:
                    config.setSprite(GameConstants_1.Difficulty.HARD, sprite);
                    break;
                case 0:
                    config.setSprite(GameConstants_1.Difficulty.INSANE, sprite);
                    break;
                default:
                    break;
            }
        });
        config.getSprite(GameConstants_1.Difficulty.EASY).events.onInputDown.add(() => {
            data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.EASY;
        });
        config.getSprite(GameConstants_1.Difficulty.NORMAL).events.onInputDown.add(() => {
            data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.NORMAL;
        });
        config.getSprite(GameConstants_1.Difficulty.HARD).events.onInputDown.add(() => {
            data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.HARD;
        });
        config.getSprite(GameConstants_1.Difficulty.INSANE).events.onInputDown.add(() => {
            data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.INSANE;
        });
        let lastSprite = arr[arr.length - 1];
        let bArr = AssetsUtils.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
        bArr[0].events.onInputDown.add(() => {
            data_config_1.DataConfig.applyCahnges();
            AssetsUtils.fadeoutSprites(state, bArr);
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawPreferences(state);
                console.log(data_config_1.DataConfig.difficulty);
            });
        });
        bArr[1].events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, bArr);
            data_config_1.DataConfig.revertChanges();
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
    drawLevels(state) {
        let centerX = state.game.world.centerX;
        let centerY = state.game.world.centerY;
        let config = new menu_config_1.MenuConfig();
        let levels = [GameConstants_1.UIComponents.LEVEL_ONE_IMAGE, GameConstants_1.UIComponents.LEVEL_TWO_IMAGE];
        let arr = this.drawBoxes(2, [
            new vector_1.default(centerX, centerY),
            new vector_1.default(centerX + 110, centerY)
        ], state, levels, true, GameConstants_1.UIComponents.PANEL);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            let name = GameConstants_1.UIComponents[levels[index].toUpperCase().replace(' ', '_')];
            config.setSprite(name, value);
            value.events.onInputDown.add(() => {
                let lName = name.toString();
                if (lName.includes('one')) {
                    data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_ONE;
                }
                else if (lName.includes('two')) {
                    data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_TWO;
                }
            });
        });
        // Setup ok/no buttons
        let lastSprite = arr[arr.length - 1];
        let bArr = AssetsUtils.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - arr.length * 50, lastSprite.y + 100), new vector_1.default(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
        bArr[0].events.onInputDown.add(() => {
            data_config_1.DataConfig.applyCahnges();
            AssetsUtils.fadeoutSprites(state, bArr);
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawPreferences(state);
            });
        });
        bArr[1].events.onInputDown.add(() => {
            AssetsUtils.fadeoutSprites(state, bArr);
            data_config_1.DataConfig.revertChanges();
            AssetsUtils.fadeoutSprites(state, arr).then(() => {
                AssetsUtils.drawPreferences(state);
            });
        });
        return config;
    }
    drawGameOver(state) {
        let map;
        if (this._fakeMapExists) {
            this._fakeMapExists = false;
            this._fakeMap.destroy();
        }
        map = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
        map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
        map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
        map.createLayer('SkyPrimary').resizeWorld();
        map.createLayer('GroundSecondary').resizeWorld();
        map.createLayer('GroundPrimary').resizeWorld();
        this._fakeMapExists = true;
        this._fakeMap = map;
        state.game.camera.unfollow();
        let centerX = state.game.world.centerX;
        let centerY = state.game.world.centerY;
        let loc = [new vector_1.default(centerX, centerY)];
        this.drawBoxes(1, loc, state, ['Main Menu']).forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
            state.game.camera.focusOn(value);
            value.events.onInputDown.add(() => {
                AssetsUtils.drawMainMenu(state);
            });
        });
        let gameOver = state.game.add.text(centerX - 145, centerY + 110, 'You lost :( your score was ... todo!', { font: '22px Arial', fill: '#ff0044' });
        gameOver.scale.setTo(0.0, 0.0);
        state.game.add.tween(gameOver.scale).to({ x: 1.0, y: 1.0 }, 1000, Phaser.Easing.Bounce.Out, true);
    }
    /**
     * @description
     * Returns the cached memory object see {@link Phaser.Loader}
     * @return {Phaser.Loader} AssetLoader._loader
     * */
    get loader() {
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
    set loader(value) {
        this._loader = value;
    }
}
// Imitate all methods as static as this class needs to be initiated
// noinspection TsLint
const AssetsUtils = new AssetLoader();
exports.default = AssetsUtils;
//# sourceMappingURL=Assets.js.map