"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../../constants/GameConstants");
const math_util_1 = require("../../util/math.util");
const vector_1 = require("../../util/vector");
var TankGameLevels;
(function (TankGameLevels) {
    class TankLevel {
        constructor(game) {
            this._game = game;
        }
        /**
         * @description
         * Gets total enemies that will ever exist on current level
         * @return {number} this._totalEnemies
         */
        get totalEnemies() {
            return this._totalEnemies;
        }
        /**
         * @description
         * Gets how many enemies currently are alive at a level
         * @return {number} this._enemiesCount
         */
        get enemiesCount() {
            return this._enemiesCount;
        }
        /**
         * @description
         * Sets how many enemies currently are alive at a level
         * @param {number} value
         */
        set enemiesCount(value) {
            this._enemiesCount = value;
        }
        get enemiesSpawnTime() {
            return this._enemiesSpawnTime;
        }
        get enemies() {
            return this._enemies;
        }
        get playerStartPos() {
            return this._playerStartPos;
        }
        get enemyStartPos() {
            return this._enemyStartPos;
        }
        get powerUpSpawnTime() {
            return this._powerUpSpawnTime;
        }
        /**
         * @description
         * Return the bodies of the ground layer
         * @return {Phaser.Physics.P2.Body[]} this._collisionLayer
         */
        get collisionLayer() {
            return this._collisionLayer;
        }
        /**
         * @description
         * Total of enemies a level can have at a time
         * @return {number} this._capEnemies
         *
         */
        get capEnemies() {
            return this._capEnemies;
        }
        get randomDisasterSpawnTime() {
            return this._randomDisasterSpawnTime;
        }
        getRandomEnemy() {
            let toReturn = this._enemyTankKind[math_util_1.MathUtil.randomIntFromInterval(0, 4)];
            this._enemiesCount++;
            this._totalEnemies--;
            return toReturn;
        }
    }
    TankGameLevels.TankLevel = TankLevel;
    class LevelOne extends TankLevel {
        constructor(game) {
            super(game);
            this._powerUpSpawnTime = 10;
            this._enemiesCount = 0;
            this._enemiesSpawnTime = 3;
            this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
            this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
            this._capEnemies = 3;
            this._totalEnemies = 30;
            this._randomDisasterSpawnTime = 7000;
            this._enemyTankKind = [GameConstants_1.TankLayout.DARK_RECON, GameConstants_1.TankLayout.DARK_ARTILLERY, GameConstants_1.TankLayout.DARK_FORTRESS, GameConstants_1.TankLayout.DARK_LIGHT, GameConstants_1.TankLayout.DARK_HUNTER];
        }
        isCleared() {
            return this._totalEnemies === 0 && this._enemiesCount === 0;
        }
        init() {
            let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkySecondary').resizeWorld();
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
            this._map = map;
        }
        destroy() {
            this._map.destroy();
        }
    }
    TankGameLevels.LevelOne = LevelOne;
    class LevelTwo extends TankLevel {
        constructor(game) {
            super(game);
            this._powerUpSpawnTime = 10;
            this._enemiesCount = 0;
            this._enemiesSpawnTime = 3;
            this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
            this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
            this._capEnemies = 3;
            this._totalEnemies = 30;
            this._enemyTankKind = [GameConstants_1.TankLayout.GREY_LIGHT, GameConstants_1.TankLayout.GREY_RECON, GameConstants_1.TankLayout.GREY_HUNTER, GameConstants_1.TankLayout.GREY_FORTRESS, GameConstants_1.TankLayout.GREY_ARTILLERY];
            this._randomDisasterSpawnTime = 5000;
        }
        isCleared() {
            return this._totalEnemies === 0 && this._enemiesCount === 0;
        }
        init() {
            let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_TWO);
            map.addTilesetImage(GameConstants_1.TileLayers.CANDY_LAYER, GameConstants_1.TileLayers.CANDY_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkySecondary').resizeWorld();
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
            this._map = map;
        }
        destroy() {
            this._map.destroy();
        }
    }
    TankGameLevels.LevelTwo = LevelTwo;
})(TankGameLevels = exports.TankGameLevels || (exports.TankGameLevels = {}));
//# sourceMappingURL=levels.tankLevels.js.map