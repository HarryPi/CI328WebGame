import State from './state';
import { States } from '../constants/GameConstants';
import AssetsLoader from '../util/Assets';


export class BootState extends State {

  constructor() {
    super();
  }

  preload(): void {
    AssetsLoader.init(this.load);
    AssetsLoader.loadBoot();
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignVertically = true;
    this.scale.pageAlignHorizontally = true;
  }

  create(): void {
    this.game.stage.backgroundColor = '#000';
    this.game.state.start(States.PRELOAD_STATE);
  }
}
