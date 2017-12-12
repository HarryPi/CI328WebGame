/** Imports */
import {ActionComponents} from '../component/action.components';
import AssetsUtils from '../UI/Assets';
import {ComponentType, InputType, Levels, States} from '../constants/GameConstants';
import {MenuManager} from '../UI/MenuManager';
import TankWorldFactory from '../TankWorldFactory';
import {Subscription} from 'rxjs/Subscription';
import Input from '../util/input';
import {DataConfig} from '../config/data.config';
import {Entity} from '../entities/entity';
import {MenuConfig} from '../config/menu.config';
import {TankGameLevels} from '../config/levels/levels.tankLevels';


import ShootComponent = ActionComponents.ShootComponent;
import MovableComponent = ActionComponents.MovableComponent;
import TankLevel = TankGameLevels.TankLevel;
import LevelOne = TankGameLevels.LevelOne;
import LevelTwo = TankGameLevels.LevelTwo;
import {CollisionComponents} from '../component/collision.components';
import {MathUtil} from '../util/math.util';

export namespace GameStates {

  import PhysicsComponent = CollisionComponents.PhysicsComponent;

  export abstract class GameState extends Phaser.State {
    game: Phaser.Game; // Necessary if we add property to `App` class // todo: Comment: game is exported globally is this needed now?
  }

  export class BootState extends GameState {
    private _args;

    constructor() {
      super();
    }

    init(args) {
      this._args = args;
    }

    preload(): void {
      AssetsUtils.init(this.load);
      AssetsUtils.loadBoot();
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignVertically = true;
      this.scale.pageAlignHorizontally = true;
      this.scale.setGameSize(window.innerWidth, window.innerHeight);
    }

    create(): void {
      this.game.stage.backgroundColor = '#FFF';
      this.game.state.start(States.PRELOAD_STATE, true, false, this._args);
    }
  }

  export class GameoverState extends GameState {
    private _args;

    init(args) {
      this._args = args;
    }

    preload() {

    }

    create() {
      MenuManager.drawGameOver(this);
    }

    update() {

    }
  }

  export class MainGameState extends GameState {
    private _input: Input;
    private _inputSubscription;
    private _factory: TankWorldFactory;
    private _levels: Map<Levels, TankLevel>;
    private _score: number = 0;
    // keep record of spawn time in miliseconds
    private _timer: number = 0;
    private _scoreText: Phaser.Text;
    private _player: Entity;
    private _disasterTimer: number = 0;
    private _activeDisasters: number = 0;

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
      this._player = this._factory.newPlayer();
      const physicsComponent = this._player.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
      this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), InputType.RIGHT_INPUT);
      this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), InputType.LEFT_INPUT);
      this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), InputType.SHOOT);

      // Subscribe to inputs
      this._inputSubscription = this._input.emitter.subscribe((input: InputType) => {
        if (input !== InputType.SHOOT.toString()) {
          this._player.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = input;
          if (input === InputType.RIGHT_INPUT) {
            physicsComponent.scaleSprite(1);
          } else {
            physicsComponent.scaleSprite(-1);
          }
        } else {
          this._player.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = true;
        }
      });

      this._scoreText = this.game.add.text(this.game.world.left + 50, this.game.world.top, `Score: ${this._score}`, {
        font: '22px Arial',
        fill: '#ff0044'
      });
      this._scoreText.fixedToCamera = true;
    }

    update() {
      if (this.canSpawnDisaster()) {
        this.spawnDisaster();
      }
      if (this.canSpawnEnemy()) {
        this.spawnEnemies();
      }
      this._input.run();
      this._factory.entities.forEach((e) => {
        e.update();
      });
    }

    shutdown() {
      // Ensure no memory leaks
      this._inputSubscription.unsubscribe();
      this._factory.cleanUp();


    }
    private spawnDisaster() {
      this._factory.newDisaster(this._player.sprite.x  + 100 * MathUtil.randomIntFromInterval(-10, 10), this.game.world.top);
      this._activeDisasters++;
      if (this._activeDisasters >= 7) {
        this._disasterTimer = Date.now();
        this._activeDisasters = 0;
      }

    }
    private canSpawnEnemy(): boolean {
      if (this._factory.currentLevel.enemiesCount < this._factory.currentLevel.capEnemies) {
        if (Date.now() - this._timer > this._factory.currentLevel.enemiesSpawnTime * 1000) {
          return true;
        }
      }
      return false;
    }

    private spawnEnemies() {
      this._factory.newEnemy(() => {
        this._score += 100;
        this._scoreText.setText(`Score: ${this._score}`);
      });
      this._factory.currentLevel.enemiesCount++;
      this._timer = Date.now();
    }

    private canSpawnDisaster() {
      if (Date.now() - this._disasterTimer >  5000) {
        return true;
      }
    }
  }

  export class MainMenuState extends GameState {
    private _args;

    init(args) {
      this._args = args;
    }

    preload() {

    }

    create() {
      let config: MenuConfig = MenuManager.drawMainMenu(this);
      this.game.camera.unfollow();
      config.allSprites.forEach((sprite: Phaser.Sprite) => {
        // This is when the game restars
        // The sprites must be set to top and visible otherwise will be hidden
        sprite.bringToTop();
        sprite.visible = true;
      });

    }

    update() {

    }
  }

  export class PreloadState extends GameState {
    private _args = {};

    constructor() {
      super();
    }

    init(args) {
      this._args = args;
    }

    preload() {

      MenuManager.setLoadingScreen(this);
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

}

