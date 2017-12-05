import State from './state';
import Input from '../util/input';
import TankWorldFactory from '../TankWorldFactory';
import { ComponentType, InputType, Levels } from '../constants/GameConstants';
import { Entity } from '../entities/entity';
import { LevelOne } from '../config/levels/levelOne';
import TankLevel from '../config/levels/tankLevel';
import { LevelTwo } from '../config/levels/levelTwo';
import { DataConfig } from '../config/data.config';
import { Subscription } from 'rxjs/Subscription';
import {MovableComponent, ShootComponent} from '../component/event.components';

export class GameState extends State {
  private _input: Input;
  private _inputSubscription;
  private _direction: InputType;
  private _factory: TankWorldFactory;
  private _levels: Map<Levels, TankLevel>;
  private _score: number = 0;
  private _subs: Subscription[];
  // keep record of spawn time in miliseconds
  private _timer: number = 0;
  private _scoreText: Phaser.Text;

  constructor() {
    super();
    this._input = new Input();
    this._levels = new Map();
  }

  preload() {
    // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
    this._levels.set(Levels.LEVEL_ONE, new LevelOne(this.game));
    this._levels.set(Levels.LEVEL_TWO, new LevelTwo(this.game));

    this._factory = new TankWorldFactory(this.game, this);
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

    this._scoreText = this.game.add.text(this.game.world.left + 50, this.game.world.top, `Score: ${this._score}`, {font: '22px Arial', fill: '#ff0044'});
    this._scoreText.fixedToCamera = true;
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.generateRandomEventFromCurrentLevel, this);

  }

  update() {
    this.spawnEnemiesAsCurrentLevel();
    this._input.run();
    this._factory.entities.forEach((e) => {
      e.update();
    });
  }
  shutdown(){
    // Ensure no memory leaks
    this._inputSubscription.unsubscribe();
    this._factory.cleanUp();


  }
  private generateRandomEventFromCurrentLevel() {
    console.log('random disaster');
    if (this._factory.currentLevel) {
      for (let i = 0; i < 6; i++) {
        this._factory.newDisaster();
      }
    }
  }
  private spawnEnemiesAsCurrentLevel() {
    if (this._factory.currentLevel) {
      if (typeof this._factory.currentLevel.enemiesCount === 'number' && this._factory.currentLevel.enemiesSpawnTime) {
        // typeof is there as enemiesCount can be 0 and javascript considers that as false what we are looking to avoid is typeof 'undefined'
        if (this._factory.currentLevel.enemiesCount < this._factory.currentLevel.capEnemies) {
          if (Date.now() - this._timer > this._factory.currentLevel.enemiesSpawnTime * 1000) {
            this._factory.newEnemy( () => {
              this._score += 100;
              this._scoreText.setText(`Score: ${this._score}`);
            });
            this._factory.currentLevel.enemiesCount++;
            this._timer = Date.now();

          }
        }
      }
    }
  }
}

