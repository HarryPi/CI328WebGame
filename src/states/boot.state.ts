import State from './state';
import { States } from '../constants/GameConstants';
import AssetsUtils from '../UI/Assets';

export class BootState extends State {

  constructor() {
    super();
  }

  preload(): void {
    AssetsUtils.init(this.load);
    AssetsUtils.loadBoot();
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
    this.scale.setGameSize(window.innerWidth, window.innerHeight);
  }

  create(): void {
    this.game.stage.backgroundColor = '#FFF';
    this.game.state.start(States.PRELOAD_STATE);
  }
}
