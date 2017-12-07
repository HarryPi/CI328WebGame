'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
require('pixi');
require('p2');
require('phaser');
require("styles/style.styl");
const GameConstants_1 = require("./constants/GameConstants");
const ScreenMetrics_1 = require("./util/ScreenMetrics");
const gameStates_1 = require("./states/gameStates");
var BootState = gameStates_1.GameStates.BootState;
var PreloadState = gameStates_1.GameStates.PreloadState;
var GameState = gameStates_1.GameStates.GameState;
var MainMenuState = gameStates_1.GameStates.MainMenuState;
var GameoverState = gameStates_1.GameStates.GameoverState;
// The main class of our application
class App extends Phaser.Game {
    constructor(config) {
        super(config);
        this.state.add(GameConstants_1.States.BOOT_STATE, BootState);
        this.state.add(GameConstants_1.States.PRELOAD_STATE, PreloadState);
        this.state.add(GameConstants_1.States.GAME_STATE, GameState);
        this.state.add(GameConstants_1.States.MAIN_MENU_STATE, MainMenuState);
        this.state.add(GameConstants_1.States.GAMEOVER_SATE, GameoverState);
        this.state.start(GameConstants_1.States.BOOT_STATE);
    }
}
exports.App = App;
// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
    window.onload = () => {
        let gameWidth = ScreenMetrics_1.DEFAULT_GAME_WIDTH;
        let gameHeight = ScreenMetrics_1.DEFAULT_GAME_HEIGHT;
        if (ScreenMetrics_1.SCALE_MODE === 'USER_SCALE') {
            let screenMetrics = ScreenMetrics_1.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);
            gameWidth = screenMetrics.gameWidth;
            gameHeight = screenMetrics.gameHeight;
        }
        const config = {
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