"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const menu_config_1 = require("../config/menu.config");
const vector_1 = require("../util/vector");
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
        // Animations
        this._animations = new Map();
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
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.atlasXML(GameConstants_1.UIComponents.UI_SPRITESHEET, this._uiBackgroundUrl, this.uiBackgroundUrlXML);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
        this.loader.image(GameConstants_1.UIComponents.LEVEL_ONE, this._levelOneImgUrl);
    }
    /**
     * @description
     * Will use the default box scheme to draw boxes at a location
     * @param {number} noOfBoxes - How many boxes will be created
     * @param {Array<Vector>} location - An Array of vectors see {@Link Vector} the location of where the boxes will be created
     * @param {Phaser.State} state - State to draw the boxes
     * @param {Array<string | Phaser.Image>} itemToAttach - What text to attach (Optional)
     * @param {boolean} enableInput - Enable input on buttons defaults to true
     * @param componentToDraw
     * @return {Array<Phaser.Sprite>} arr - Returns an array of sprites in the order passed
     * */
    drawBoxes(noOfBoxes, location, state, itemToAttach, enableInput = true, componentToDraw = GameConstants_1.UIComponents.FULL_BUTTON) {
        let arr = [];
        for (let i = 0; i < noOfBoxes; i++) {
            let sprite = state.add.sprite(location[i].x, location[i].y, GameConstants_1.UIComponents.UI_SPRITESHEET, componentToDraw);
            let style = { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center' };
            let attachment;
            sprite.scale.setTo(0.0, 0.0);
            sprite.anchor.setTo(0.5, 0.5);
            itemToAttach[i] ? attachment = itemToAttach[i] : null;
            if (attachment) {
                let toAttach = state.game.add.text(0, 0, attachment, style);
                toAttach.anchor.setTo(0.5, 0.5);
                sprite.addChild(toAttach);
            }
            else if (typeof attachment === 'object') {
                let imageSprite = state.game.add.sprite(0, 0, attachment);
                console.log(imageSprite);
                sprite.addChild(imageSprite);
            }
            sprite.inputEnabled = enableInput;
            arr.push(sprite);
        }
        return arr;
    }
    /**
     * @description
     * Use to draw the main menu at selected state
     * @return {MenuConfig} config
     * returns the config file with the sprites
     * */
    drawMainMenu(state) {
        let textArr = ['New Game', 'High Score', 'Preferences'];
        let config = new menu_config_1.MenuConfig();
        let arr = this.drawBoxes(3, [
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 110),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 50),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY + 10)
        ], state, textArr);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 2400, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
        });
        let map;
        map = config.fakeTileMap = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
        map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
        map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
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
    fadeoutSprites(state, fadeoutSprites) {
        return new Promise((resolve, reject) => {
            if (fadeoutSprites) {
                fadeoutSprites.forEach((sprite) => {
                    state.game.add.tween(sprite.scale).to({
                        x: 0.0,
                        y: 0.0
                    }, 2400, Phaser.Easing.Linear.None, true).onComplete.add(() => {
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
        let textArr = ['Select Level', 'Select Player', 'Select Difficulty'];
        let arr = this.drawBoxes(3, [
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 110),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY - 50),
            new vector_1.default(state.game.world.centerX, state.game.world.centerY + 10)
        ], state, textArr);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 2400, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
            // Gives the change of scenery effect
            state.game.camera.focusOn(value);
        });
        return config;
    }
    /**
     * @description
     * Will Generate the available levels the player can choose from
     * */
    drawLevels(state) {
        let centerX = state.game.world.centerX;
        let centerY = state.game.world.centerY;
        let config = new menu_config_1.MenuConfig();
        let levels = [GameConstants_1.UIComponents.LEVEL_ONE, GameConstants_1.UIComponents.LEVEL_ONE];
        let arr = this.drawBoxes(2, [
            new vector_1.default(centerX, centerY),
            new vector_1.default(centerX + 50, centerY)
        ], state, levels);
        arr.forEach((value, index) => {
            state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, 2400, Phaser.Easing.Bounce.Out, true);
            config.setSprite(GameConstants_1.MainMenuButtons[levels[index].toUpperCase().replace(' ', '_')], value);
        });
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