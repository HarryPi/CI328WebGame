import State from './state';
import AssetsUtils from '../util/Assets';

export class PreloadState extends State {
  constructor() {
    super();
    console.log(this.load);
  }

  preload() {

    AssetsUtils.setLoadingScreen(this);
    // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
    AssetsUtils.loadAll();
  }

  create() {
    // todo: Set main menu instead of level one

  }

  update() {

  }
}
