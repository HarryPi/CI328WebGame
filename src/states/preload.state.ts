import State from './state';

// Get URL to images
const level1 = require('assets/levels/level1.json');


export class PreloadState extends State {
  constructor() {
    super();
  }

  preload() {
    let logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
    let progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'progressBar');

    logo.anchor.setTo(0.5);
    progressBar.anchor.setTo(0.5);
    this.load.setPreloadSprite(progressBar);

  }

  create() {
  }

  update() {

  }
}
