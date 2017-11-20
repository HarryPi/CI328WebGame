'use strict';
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
/** Imports */
require('pixi');
require('p2');
require('phaser');
require("styles/style.styl");
var GameConstants_1 = require("./constants/GameConstants");
var boot_state_1 = require("./states/boot.state");
var preload_state_1 = require("./states/preload.state");
var game_state_1 = require("./states/game.state");
var ScreenMetrics_1 = require("./util/ScreenMetrics");
// The main class of our application
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(config) {
        var _this = _super.call(this, config) || this;
        _this.state.add(GameConstants_1.States.BOOT_STATE, boot_state_1.BootState);
        _this.state.add(GameConstants_1.States.PRELOAD_STATE, preload_state_1.PreloadState);
        _this.state.add(GameConstants_1.States.GAME_STATE, game_state_1.GameState);
        _this.state.start(GameConstants_1.States.BOOT_STATE);
        return _this;
    }
    return App;
}(Phaser.Game));
exports.App = App;
// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
    window.onload = function () {
        var gameWidth = ScreenMetrics_1.DEFAULT_GAME_WIDTH;
        var gameHeight = ScreenMetrics_1.DEFAULT_GAME_HEIGHT;
        if (ScreenMetrics_1.SCALE_MODE === 'USER_SCALE') {
            var screenMetrics = ScreenMetrics_1.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);
            gameWidth = screenMetrics.gameWidth;
            gameHeight = screenMetrics.gameHeight;
        }
        var config = {
            width: gameWidth,
            height: gameHeight,
            renderer: Phaser.AUTO,
            parent: '',
            resolution: 1,
            forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
        };
        new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
    };
}
//# sourceMappingURL=index.js.map