"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var tankLevel_1 = require("./tankLevel");
var GameConstants_1 = require("../../constants/GameConstants");
var LevelOne = /** @class */ (function (_super) {
    __extends(LevelOne, _super);
    function LevelOne(game) {
        return _super.call(this, game) || this;
    }
    LevelOne.prototype.init = function () {
        var map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
        map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
        map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
        map.createLayer('SkySecondary').resizeWorld();
        map.createLayer('SkyPrimary').resizeWorld();
        map.createLayer('GroundSecondary').resizeWorld();
        map.createLayer('GroundPrimary').resizeWorld();
        this._game.physics.p2.convertCollisionObjects(map, 'GroundPath');
        var a = this._game.add.sprite(this._game.world.left, this._game.world.centerY, GameConstants_1.TankLayout.TANK_SPRITESHEET, GameConstants_1.TankLayout.CANDY_ARTILLERY);
        this._game.physics.p2.enable(a);
        a.body.allowGravity = true;
        this._game.camera.follow(a);
    };
    LevelOne.prototype.destroy = function () {
    };
    return LevelOne;
}(tankLevel_1.default));
exports.LevelOne = LevelOne;
//# sourceMappingURL=levelOne.js.map