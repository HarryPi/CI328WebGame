import State from './state';
import WorldService from '../serivce/world.service';
import Input from '../util/input';
import TankWorldFactory from '../TankWorldFactory';

import { LevelOne } from '../config/levels/levelOne';
import { ComponentType, Direction } from '../constants/GameConstants';
import { Entity } from '../entities/entity';
import { MovableComponent } from '../component/movable.component';
import BehaviourService from '../serivce/behaviour.service';

export class GameState extends State {
  private _input: Input;
  private _subscription;
  private _entities: Array<Entity> = [];

  constructor() {
    super();
    this._input = new Input();
  }

  preload() {

    // Setup level todo: Make this to be user selected
    WorldService.level = new LevelOne(this.game);
    WorldService.initLevel();
  }

  create() {
    // Input
    let player: Entity = TankWorldFactory.newPlayer(this.game);
    this._entities.push(player);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), Direction.RIGHT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), Direction.LEFT_INPUT);

    this._subscription = this._input.emitter.subscribe((val: Direction) => {
      BehaviourService.moveEntity(player, val);
    });
  }

  update() {
    this._input.run();
    this._entities.forEach((e) => {
      e.update();
    });
  }
  shutdown(){
    // Ensure no memory leaks
    this._subscription.unsubscribe();
  }
}
