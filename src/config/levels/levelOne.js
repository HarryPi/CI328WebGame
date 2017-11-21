"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tankLevel_1 = require("./tankLevel");
const GameConstants_1 = require("../../constants/GameConstants");
const vector_1 = require("../../util/vector");
class LevelOne extends tankLevel_1.default {
    constructor(game) {
        super(game);
    }
    init() {
        let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
        map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
        map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
        map.createLayer('SkySecondary').resizeWorld();
        map.createLayer('SkyPrimary').resizeWorld();
        map.createLayer('GroundSecondary').resizeWorld();
        map.createLayer('GroundPrimary').resizeWorld();
        this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath');
        this._playerStartPos = new vector_1.default(this._game.world.left, this._game.world.centerY + 100);
    }
    destroy() {
    }
}
exports.LevelOne = LevelOne;
//# sourceMappingURL=levelOne.js.map