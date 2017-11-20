import State from './state';
import WorldService from '../serivce/world.service';
import Input from '../util/input';

import { LevelOne } from '../config/levels/levelOne';
import { ComponentType, InputType } from '../constants/GameConstants';
import { Entity } from '../entities/entity';
import { MovableComponent } from '../component/movable.component';
import { CameraComponent } from '../component/camera.component';

export class GameState extends State {
  private _input: Input;
  private subscription;
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
    let player = new Entity(this.game, WorldService.level.playerStartPos.x, WorldService.level.playerStartPos.y)
                 .withComponent([new MovableComponent(), new CameraComponent(this.game)]);
    // Input
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), InputType.RIGHT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), InputType.LEFT_INPUT);

    this.subscription = this._input.emitter.subscribe((val: InputType) => {
     let playerC =  player.getComponent(ComponentType.MOVABLE) as MovableComponent;
     playerC.move(val);
    });
  }

  update() {
    this._input.run();
  }
  shutdown(){
    this.subscription.unsubscribe();
  }
}
