import State from './state';
import AssetsUtils from '../util/Assets';
import { States } from '../constants/GameConstants';

export class PreloadState extends State {
  constructor() {
    super();
    console.log(this.load);
  }

  preload() {

    AssetsUtils.setLoadingScreen(this);
    // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
    AssetsUtils.loadAll();
    // Set World variables
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 1400;
    this.game.physics.p2.setImpactEvents(true);
  }

  create() {
    // todo: Set main menu instead of level one
    this.game.state.start(States.GAME_STATE);
  }

  update() {

  }
}
