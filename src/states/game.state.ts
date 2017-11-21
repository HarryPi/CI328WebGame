import State from './state';
import Input from '../util/input';
import TankWorldFactory from '../TankWorldFactory';

import { LevelOne } from '../config/levels/levelOne';
import { ComponentType, InputType } from '../constants/GameConstants';
import { Entity } from '../entities/entity';
import { MovableComponent } from '../component/movable.component';
import { type } from 'os';
import { ShootComponent } from '../component/shoot.component';
import Print from '../util/print';

export class GameState extends State {
  private _input: Input;
  private _inputSubscription;
  private _entities: Array<Entity> = [];
  private _direction: InputType;
  private _factory: TankWorldFactory;
  constructor() {
    super();
    this._input = new Input();
  }

  preload() {
    this._factory = new TankWorldFactory(this.game);
  }

  create() {
    // Input
    let player: Entity = this._factory.newPlayer();
    this._entities.push(player);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), InputType.RIGHT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), InputType.LEFT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), InputType.SHOOT);
    this._inputSubscription = this._input.emitter.subscribe((input: InputType) => {
        input !== InputType.SHOOT.toString() ? player.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = input
                                             : player.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = true;
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
    this._inputSubscription.unsubscribe();
  }
}
