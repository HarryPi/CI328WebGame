'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
require('pixi');
require('p2');
require('phaser');
require("styles/style.styl");
const GameConstants_1 = require("./constants/GameConstants");
const gameStates_1 = require("./states/gameStates");
var BootState = gameStates_1.GameStates.BootState;
var PreloadState = gameStates_1.GameStates.PreloadState;
var GameState = gameStates_1.GameStates.MainGameState;
var MainMenuState = gameStates_1.GameStates.MainMenuState;
var GameoverState = gameStates_1.GameStates.GameoverState;
var StageClearState = gameStates_1.GameStates.StageClearState;
// The main class of our application
class App extends Phaser.Game {
    constructor(config) {
        super(config);
        this.state.add(GameConstants_1.States.BOOT_STATE, BootState);
        this.state.add(GameConstants_1.States.PRELOAD_STATE, PreloadState);
        this.state.add(GameConstants_1.States.GAME_STATE, GameState);
        this.state.add(GameConstants_1.States.MAIN_MENU_STATE, MainMenuState);
        this.state.add(GameConstants_1.States.GAMEOVER_SATE, GameoverState);
        this.state.add(GameConstants_1.States.STAGE_CLEAR_STATE, StageClearState);
        this.state.start(GameConstants_1.States.BOOT_STATE);
    }
}
exports.App = App;
// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
    window.onload = () => {
        const config = {
            renderer: Phaser.AUTO,
            parent: '',
            resolution: 1,
            forceSetTimeOut: false
        };
        new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
    };
}
//# sourceMappingURL=index.js.map