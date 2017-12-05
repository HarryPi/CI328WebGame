import State from './state';
import { States } from '../constants/GameConstants';
import AssetsUtils from '../UI/Assets';

export class PreloadState extends State {
  private _args = {};
  constructor() {
    super();
  }
  init(args){
    this._args = args;
  }
  preload() {

    AssetsUtils.setLoadingScreen(this);
    // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
    AssetsUtils.loadAll();
    // Set World variables
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.game.physics.p2.gravity.y = 1400;
    this.game.physics.p2.setImpactEvents(true);
    this.game.physics.p2.setBoundsToWorld(true, true, false, true);

  }

  create() {
    // todo: Set main menu instead of level one
    this.game.state.start(States.MAIN_MENU_STATE, true, false, this._args);
  }

  update() {

  }
}
