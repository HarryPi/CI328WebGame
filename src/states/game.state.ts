import State from './state';
import WorldService from '../serivce/world.service';
import { LevelOne } from '../config/levels/levelOne';

export class GameState extends State {
  constructor() {
    super();
  }

  preload() {
    WorldService.level = new LevelOne(this.game);
    WorldService.initLevel();

  }

  create() {

  }
}
