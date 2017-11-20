"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var GameConstants_1 = require("../constants/GameConstants");
var AssetLoader = /** @class */ (function () {
    function AssetLoader() {
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
    AssetLoader.prototype.init = function (loader) {
        this.loader = loader;
    };
    AssetLoader.prototype.loadBoot = function () {
        try {
            this.loader.image(GameConstants_1.UIComponents.PROGRESS_BAR, this._progressBarUrl);
            this.loader.image(GameConstants_1.UIComponents.LOGO, this._logoUrl);
        }
        catch (e) {
            console.log(e);
            // todo: Exception handling class
        }
    };
    AssetLoader.prototype.setLoadingScreen = function (state) {
        var logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
        var progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
        logo.anchor.setTo(0.5);
        progressBar.anchor.setTo(0.5);
        state.load.setPreloadSprite(progressBar);
    };
    AssetLoader.prototype.loadAll = function () {
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
    };
    Object.defineProperty(AssetLoader.prototype, "loader", {
        get: function () {
            if (this._loader === null) {
                throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
            }
            return this._loader;
        },
        set: function (value) {
            this._loader = value;
        },
        enumerable: true,
        configurable: true
    });
    return AssetLoader;
}());
// noinspection TsLint
var AssetsUtils = new AssetLoader();
exports.default = AssetsUtils;
//# sourceMappingURL=Assets.js.map