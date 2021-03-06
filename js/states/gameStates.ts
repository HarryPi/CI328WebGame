/** Imports */
import {ActionComponents} from '../component/action.components';
import AssetsUtils from '../UI/Assets';
import {ComponentType, InputType, Levels, Sounds, States} from '../constants/GameConstants';
import TankWorldFactory from '../TankWorldFactory';
import Input from '../util/input';
import {DataConfig} from '../config/data.config';
import {Entity} from '../entities/entity';
import {MenuConfig} from '../config/menu.config';
import {TankGameLevels} from '../config/levels/levels.tankLevels';
import {CollisionComponents} from '../component/collision.components';
import {MathUtil} from '../util/math.util';
import {UiManagers} from '../UI/uimanagers';

import ShootComponent = ActionComponents.ShootComponent;
import MovableComponent = ActionComponents.MovableComponent;
import TankLevel = TankGameLevels.TankLevel;
import LevelOne = TankGameLevels.LevelOne;
import LevelTwo = TankGameLevels.LevelTwo;
import Vector from '../util/vector';
import {SoundPlayer} from '../UI/SoundPlayer';


export namespace GameStates {

  import PhysicsComponent = CollisionComponents.PhysicsComponent;
  import MenuManager = UiManagers.MenuManager;
  import PlayerVisualsManager = UiManagers.PlayerVisualsManager;

  export abstract class GameState extends Phaser.State {
    game: Phaser.Game; // Necessary if we add property to `App` class
  }

  export class BootState extends GameState {
    private _args;

    constructor() {
      super();
    }

    init(args) {
      this._args = {};
    }

    preload(): void {
      AssetsUtils.init(this.load);
      AssetsUtils.loadBoot();
      this.scale.setGameSize(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio); // set size with correct pixel ratio
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.scale.pageAlignVertically = true;
      this.scale.pageAlignHorizontally = true;
    }

    create(): void {
      this.game.stage.backgroundColor = '#FFF';
      this.game.state.start(States.PRELOAD_STATE, true, false, this._args);
    }
  }

  export class StageClearState extends GameState {
    private _args;

    init(args) {
      this._args = args;
    }

    preload() {

    }

    create() {
      SoundPlayer.stopSound(Sounds.GAME_MUSIC);
      SoundPlayer.playSound(Sounds.MAIN_MENU);
      MenuManager.drawYouWonMenu(this, this._args.score);
    }

    update() {

    }
  }

  export class GameoverState extends GameState {
    private _args;

    init(args) {
      this._args = args;
      SoundPlayer.stopSound(Sounds.GAME_MUSIC);

    }

    preload() {

    }

    create() {
      SoundPlayer.playSound(Sounds.MAIN_MENU);
      MenuManager.drawGameOver(this, this._args.score);
    }

    update() {

    }
    shutdown(){
      SoundPlayer.stopSound(Sounds.MAIN_MENU);
    }
  }

  export class MainGameState extends GameState {
    private _input: Input;
    private _inputSubscription;
    private _factory: TankWorldFactory;
    private _levels: Map<Levels, TankLevel>;
    private _score: number;
    // keep record of spawn time in miliseconds
    private _timer: number = 0;
    private _scoreText: Phaser.Text;
    private _player: Entity;
    private _disasterTimer: number = 0;
    private _powerUpTimer: number = 0;
    private _activeDisasters: number = 0;
    private _activeLevel: Levels;
    private _buttons: Phaser.Sprite[];
    constructor() {
      super();
      this._input = new Input();
      this._levels = new Map();
    }

    preload() {
      // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
      this._levels.set(Levels.LEVEL_ONE, new LevelOne(this.game));
      this._levels.set(Levels.LEVEL_TWO, new LevelTwo(this.game));
      this._activeLevel = DataConfig.level;
      this._levels.get(this._activeLevel).init();
      this._factory = new TankWorldFactory(this.game, this);
      this._factory.init(this._levels.get(this._activeLevel).collisionLayer); // Initialise collision groups
      this._score = 0;
    }

    create() {
      SoundPlayer.stopSound(Sounds.MAIN_MENU);
      SoundPlayer.playSound(Sounds.GAME_MUSIC);
      const playerUIBuilder = new PlayerVisualsManager(this);
      const activeLevel = this._levels.get(this._activeLevel);

      // Subscribe to game winning condition
      // Input
      this._player = this._factory.newPlayer(activeLevel.playerStartPos.x, activeLevel.playerStartPos.y, this);
      let sub = this._player.whenDestroyed.subscribe(() => {
        this.game.state.start(States.GAMEOVER_SATE, true, false, {score: this._score});
        sub.unsubscribe();
      });

      playerUIBuilder.displayPlayerMaxHealth();
      MenuManager.drawPauseMenu(this);

      const physicsComponent = this._player.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
      this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), InputType.RIGHT_INPUT);
      this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), InputType.LEFT_INPUT);
      this._input.add(this.game.input.activePointer.leftButton, InputType.SHOOT);

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

      this._scoreText = this.game.add.text(this.game.world.left + 60, this.game.world.top, `Score: ${this._score}`, {
        font: '22px Arial',
        fill: '#ff0044'
      });
      this._scoreText.fixedToCamera = true;
      if (!this.game.device.desktop) {
        this._buttons = playerUIBuilder.buildControlButtons();
      }
    }

    update() {
      const activeLevel = this._levels.get(this._activeLevel);

      if (!this.game.device.desktop) {
        if (this.game.input.activePointer.isDown && this._buttons[0].input.checkPointerOver(this.game.input.activePointer)) {
          this._input.emitter.next(InputType.LEFT_INPUT); // For mobile design check if left button is clicked
        }
        if (this.game.input.activePointer.isDown && this._buttons[1].input.checkPointerOver(this.game.input.activePointer)) {
          this._input.emitter.next(InputType.RIGHT_INPUT); // for mobile design check if right button is clicked
        }
        if (this.game.input.activePointer.isDown && !(this._buttons[1].input.checkPointerOver(this.game.input.activePointer) || this._buttons[0].input.checkPointerOver(this.game.input.activePointer))) {
          this._input.emitter.next(InputType.SHOOT); // for mobile design check if touch but not on buttons
        }
      }

      if (this.canSpawnPowerUp(activeLevel)) {
        this.spawnPowerUp();
      }
      if (activeLevel.isCleared()) {
        this.game.state.start(States.STAGE_CLEAR_STATE, true, false, {score: this._score});
      }
      if (this.canSpawnDisaster(activeLevel)) {
        this.spawnDisaster();
      }
      if (this.canSpawnEnemy(activeLevel)) {
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
      SoundPlayer.stopSound(Sounds.GAME_MUSIC);

      // Clean UI static values
      PlayerVisualsManager.cleanUp();


    }

    private spawnPowerUp() {
      let getRandomX = () => {

        let x =  this._player.sprite.x * MathUtil.randomIntFromInterval(-5, 5);
        if (this.game.world.bounds.x < x){
          x = this.game.world.bounds.x - 100;
        }
        return x;
      };
      // check if within world boundaries
      this._powerUpTimer = Date.now();
      let randomLocation = new Vector(getRandomX(), this.game.world.top);
      this._factory.spawnPowerUp(randomLocation.x, randomLocation.y);
    }
    private canSpawnPowerUp(activeLevel: TankLevel) {
        return Date.now() - this._powerUpTimer > activeLevel.powerUpSpawnTime * 1000;
    }

    private spawnDisaster() {
      this._factory.newDisaster(this._player.sprite.x + 100 * MathUtil.randomIntFromInterval(-10, 10), this.game.world.top);
      this._activeDisasters++;
      if (this._activeDisasters >= 7) {
        this._disasterTimer = Date.now();
        this._activeDisasters = 0;
      }

    }

    private canSpawnEnemy(activeLevel: TankLevel): boolean {
      if (activeLevel.enemiesCount < activeLevel.capEnemies && activeLevel.totalEnemies !== 0) {
        if (Date.now() - this._timer > activeLevel.enemiesSpawnTime * 1000) {
          return true;
        }
      }
      return false;
    }

    private spawnEnemies() {
      const activeLevel = this._levels.get(this._activeLevel);
      const enemyKind = activeLevel.getRandomEnemy();
      let random = MathUtil.randomIntFromInterval(0, 1);
      const spawningPoint = new Phaser.Point(getSpawningPointX(), getSpawningPointY());

      this._factory.newEnemy(enemyKind, spawningPoint.x, spawningPoint.y, () => {
        activeLevel.enemiesCount--;
        this._score += 100;
        this._scoreText.setText(`Score: ${this._score}`);
      });
      this._timer = Date.now();

      function getSpawningPointX(): number {
        return random === 0 ? activeLevel.playerStartPos.x : activeLevel.enemyStartPos.x;
      }

      function getSpawningPointY(): number {
        return random === 0 ? activeLevel.playerStartPos.y : activeLevel.enemyStartPos.y;
      }
    }

    private canSpawnDisaster(activeLevel: TankLevel) {
      if (Date.now() - this._disasterTimer > activeLevel.randomDisasterSpawnTime) {
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
      SoundPlayer.init(this.game).then( () => {
        SoundPlayer.playSound(Sounds.MAIN_MENU);
        let config: MenuConfig = MenuManager.drawMainMenu(this);
        this.game.camera.unfollow(); // stop following the main menu
        config.allSprites.forEach((sprite: Phaser.Sprite) => {
          // This is when the game restart
          // The sprites must be set to top and visible otherwise will be hidden
          sprite.bringToTop();
          sprite.visible = true;
        });
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
      this.game.state.start(States.MAIN_MENU_STATE, true, false, this._args);
    }

    update() {

    }
  }

}

