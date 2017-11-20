import State from './state';
import AssetsUtils from '../util/Assets';
import { States } from '../constants/GameConstants';
import WorldService from '../serivce/world.service';

export class PreloadState extends State {
  constructor() {
    super();
    console.log(this.load);
  }

  preload() {

    AssetsUtils.setLoadingScreen(this);
    // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
    AssetsUtils.loadAll();
    // Init Services
    WorldService.game = this.game;
  }

  create() {
    // todo: Set main menu instead of level one
    this.game.state.start(States.GAME_STATE);
  }

  update() {

  }
}
