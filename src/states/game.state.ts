import State from './state';
import Input from '../util/input';
import TankWorldFactory from '../TankWorldFactory';
import {ComponentType, InputType, Levels} from '../constants/GameConstants';
import { Entity } from '../entities/entity';
import { MovableComponent } from '../component/movable.component';
import { ShootComponent } from '../component/shoot.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import {LevelOne} from '../config/levels/levelOne';
import TankLevel from '../config/levels/tankLevel';
import {LevelTwo} from '../config/levels/levelTwo';
import {DataConfig} from '../config/data.config';

export class GameState extends State {
  private _input: Input;
  private _inputSubscription;
  private _direction: InputType;
  private _factory: TankWorldFactory;
  private _levels: Map<Levels, TankLevel>;

  constructor() {
    super();
    this._input = new Input();
    this._levels = new Map();
  }

  preload() {
    // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
    this._levels.set(Levels.LEVEL_ONE, new LevelOne(this.game));
    this._levels.set(Levels.LEVEL_TWO, new LevelTwo(this.game));

    this._factory = new TankWorldFactory(this.game);
    this._factory.currentLevel = this._levels.get(DataConfig.level);
    this._factory.init(); // Initialise collision groups
  }

  create() {
    // Input
    let player: Entity = this._factory.newPlayer();
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), InputType.RIGHT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), InputType.LEFT_INPUT);
    this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), InputType.SHOOT);

    // Subscribe to inputs
    this._inputSubscription = this._input.emitter.subscribe((input: InputType) => {
        input !== InputType.SHOOT.toString() ? player.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = input
                                             : player.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = true;
    });

  }

  update() {
    this._factory.spawnEnemiesAsCurrentLevel();
    this._input.run();
    this._factory.entities.forEach((e) => {
      e.update();
    });
  }
  shutdown(){
    // Ensure no memory leaks
    this._inputSubscription.unsubscribe();
  }
}
