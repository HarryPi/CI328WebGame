"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class AssetLoader {
    constructor() {
        // Animations
        this._animations = new Map();
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
    init(loader) {
        this.loader = loader;
    }
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
    setLoadingScreen(state) {
        let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
        let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
        logo.anchor.setTo(0.5);
        progressBar.anchor.setTo(0.5);
        state.load.setPreloadSprite(progressBar);
    }
    loadAll() {
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
    }
    get loader() {
        if (this._loader === null) {
            throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
        }
        return this._loader;
    }
    set loader(value) {
        this._loader = value;
    }
}
// noinspection TsLint
const AssetsUtils = new AssetLoader();
exports.default = AssetsUtils;
//# sourceMappingURL=Assets.js.map