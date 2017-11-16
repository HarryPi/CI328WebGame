import State from './state';
import { States } from '../constants/Constants';
import GameAssets from '../util/Assets';


export class BootState extends State {

  constructor() {
    super();

  }

  preload(): void {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;

    this.load.image('logo', GameAssets.getLogo());
    this.load.image('progressBar', GameAssets.getProgressBar());
  }

  create(): void {
    this.game.stage.backgroundColor = '#000';
    this.game.state.start(States.PRELOAD_STATE);
  }
}
