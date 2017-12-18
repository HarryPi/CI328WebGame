'use strict';

/** Imports */
require('pixi');
require('p2');
require('phaser');

import 'styles/style.styl';
import { States } from './constants/GameConstants';

import { DEFAULT_GAME_HEIGHT, DEFAULT_GAME_WIDTH, SCALE_MODE, ScreenMetrics, ScreenUtils } from './util/ScreenMetrics';
import { GameStates } from './states/gameStates';

import BootState = GameStates.BootState;
import PreloadState = GameStates.PreloadState;
import GameState = GameStates.MainGameState;
import MainMenuState = GameStates.MainMenuState;
import GameoverState = GameStates.GameoverState;
import StageClearState = GameStates.StageClearState;

// The main class of our application
export class App extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super(config);
    this.state.add(States.BOOT_STATE, BootState);
    this.state.add(States.PRELOAD_STATE, PreloadState);
    this.state.add(States.GAME_STATE, GameState);
    this.state.add(States.MAIN_MENU_STATE, MainMenuState);
    this.state.add(States.GAMEOVER_SATE, GameoverState);
    this.state.add(States.STAGE_CLEAR_STATE, StageClearState);
    this.state.start(States.BOOT_STATE);
  }
}


// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
  window.onload = () => {
    let gameWidth: number = DEFAULT_GAME_WIDTH;
    let gameHeight: number = DEFAULT_GAME_HEIGHT;

    if (SCALE_MODE === 'USER_SCALE') {
      let screenMetrics: ScreenMetrics = ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);

      gameWidth = screenMetrics.gameWidth;
      gameHeight = screenMetrics.gameHeight;
    }

    const config: Phaser.IGameConfig = {
      width: gameWidth, // width of canvas
      height: gameHeight, // height of canvas
      renderer: Phaser.AUTO, // rendering context. The recommended parameter is Phaser.AUTO
      parent: '',
      resolution: 1,
      forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
    };

   new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
  };
}
