'use strict';
/** Imports */
require('pixi');
require('p2');
require('phaser');

import 'styles/style.styl';
import { States } from './constants/GameConstants';
import { BootState } from './states/boot.state';
import { PreloadState } from './states/preload.state';

let game: Phaser.Game; // capture game object // todo: Is there a better way?
export default game;

// The main class of our application
export class App extends Phaser.Game {
  constructor(config: Phaser.IGameConfig) {
    super(config);
    this.state.add(States.BOOT_STATE, BootState);
    this.state.add(States.PRELOAD_STATE, PreloadState);
    this.state.start(States.BOOT_STATE);
  }
}


// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
  window.onload = () => {
    const config: Phaser.IGameConfig = {
      width: 800, // width of canvas
      height: 600, // height of canvas
      renderer: Phaser.AUTO, // rendering context. The recommended parameter is Phaser.AUTO
      parent: '',
      resolution: 1,
      forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
    };

   game = new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
  };
}
