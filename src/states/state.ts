'use strict';
/** Imports */

abstract class State extends Phaser.State {
  game: Phaser.Game; // Necessary if we add property to `App` class // todo: Comment: game is exported globally is this needed now?
}

export default State;
