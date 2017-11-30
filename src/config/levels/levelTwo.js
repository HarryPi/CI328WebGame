"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tankLevel_1 = require("./tankLevel");
const vector_1 = require("../../util/vector");
const GameConstants_1 = require("../../constants/GameConstants");
class LevelTwo extends tankLevel_1.default {
    init() {
        debugger;
        let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_TWO);
        map.addTilesetImage(GameConstants_1.TileLayers.CANDY_LAYER, GameConstants_1.TileLayers.CANDY_LAYER);
        map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
        map.createLayer('SkySecondary').resizeWorld();
        map.createLayer('SkyPrimary').resizeWorld();
        map.createLayer('GroundSecondary').resizeWorld();
        map.createLayer('GroundPrimary').resizeWorld();
        this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
        this._enemiesCount = 0;
        this._enemiesSpawnTime = 3;
        this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
        this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
        this._capEnemies = 3;
        this._totalEnemies = 30;
        this._map = map;
    }
    destroy() {
    }
    constructor(game) {
        super(game);
    }
}
exports.LevelTwo = LevelTwo;
//# sourceMappingURL=levelTwo.js.map