import { CameraComponent } from './component/camera.component';
import { MovableComponent } from './component/movable.component';
import { Entity } from './entities/entity';
import { Action, ComponentType, FSMStates, Levels, TankLayout } from './constants/GameConstants';
import { PhysicsComponent } from './component/physics.component';
import TankLevel from './config/levels/tankLevel';
import { LevelOne } from './config/levels/levelOne';
import { ShootComponent } from './component/shoot.component';
import { LayerComponent } from './component/layer.component';
import { BulletComponent } from './component/bullet.component';
import { CollisionsComponent } from './component/collisions.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import { AiComponent } from './component/ai.component';
import { StateComponent } from './component/state.component';
import { IdleState } from './fsm/idle.state';
import { SeekState } from './fsm/seek.state';
import { FiringState } from './fsm/firing.state';
import { OwnerComponent } from './component/owner.component';
import { Guid } from './util/guid';
import { FleeState } from './fsm/flee.state';
import {TankComponent} from './component/tank.component';
import {DataConfig} from './config/data.config';

/**
 * @class TankWorldFactory
 * @description
 * This is the game factory and exposes functions to
 * create a new player {@link TankWorldFactory#newPlayer}
 * create a new bullet {@link TankWorldFactory#newBullet}
 * create a new enemy {@link TankWorldFactory#newEnemy}
 * start spawning enemies {@Link TankWorldFactory#spawnEnemiesAsCurrentLevel}
 * All of the above are dependant on the information passed to the factory by what {@link TankLevel} is loaded
 * */
export default class TankWorldFactory {

  private _game: Phaser.Game;
  private _player: Entity;
  // Levels
  private _currentLevel: TankLevel;

  // Arrays
  private _entities: Array<Entity> = [];

  // Collision Groups
  private _tankCollisionGroup: CollisionGroup;
  private _enemyTankCollisionGroup: CollisionGroup;
  private _bulletCollisionGroup: CollisionGroup;
  private _enemyBulletsCollisionGroup: CollisionGroup;
  private _groundCollisionGroup: CollisionGroup;

  // Phaser groups
  private _tanks: Phaser.Group;
  private _bullets: Phaser.Group;

  // keep record of spawn time in miliseconds
  private _timer: number = 0;
  private _enemiesCount: number = 0; // Enemies in game
    /**
     * @constructor
     * @param {Phaser.Game} game
     * */
    constructor(game: Phaser.Game) {

    this._game = game;


  }

  public init() {
    // init collision groups
    this._currentLevel.init();
    this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._bulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();

    // Have to do this here as we cannot enforce layer to be Entity to attach component
    this._currentLevel.collisionLayer.forEach((layer) => {
      layer.setCollisionGroup(this._groundCollisionGroup);
      layer.collides([
        this._tankCollisionGroup, this._bulletCollisionGroup,
        this._enemyBulletsCollisionGroup, this._enemyTankCollisionGroup
      ]);
    });

    // Force all groups to collide with world bounds
    this._game.physics.p2.updateBoundsCollisionGroup();
  }
  /**
   * @description
   * Creates a new player based on the loaded level {@link TankLevel#playerStartPos}
   * */
  public newPlayer(): Entity {
    let player = new Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
      .withComponent(
        [new MovableComponent(),
          new CameraComponent(this._game),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent(),
          new TankComponent(DataConfig.tank)]);
    //todo: 01/12/2017 Task 1 | Make sure Dataconfig gets the selection - Task 2 | Make sure each level defines what tank layouts it will use - Task 3 | Make sure each enemy spawn is a random selectio of that layout

    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    player.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics();

    player.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.CANDY_HUNTER);

    player.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._tankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._enemyTankCollisionGroup, [Action.NOTHING])
      .collidesWith(this._enemyBulletsCollisionGroup, [Action.NOTHING]);

    this._entities.push(player);
    this._player = player;

    this._player.sprite.data = {
      tag: Guid.newGuid()
    };
    return player;
  }

  /**
   * @description
   * Creates a new enemy based on the loaded level {@link TankLevel#enemyStartPos}
   * */
  public newEnemy() {
    let enemy = new Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y, null)
      .withComponent(
        [
          new MovableComponent(),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent(),
          new StateComponent(),
          new AiComponent(this._player)]);

    enemy.getComponent<StateComponent>(ComponentType.STATE)
      .addState(FSMStates.SEEK, new SeekState())
      .addState(FSMStates.IDLE, new IdleState())
      .addState(FSMStates.FIRING, new FiringState())
      .addState(FSMStates.FLEEING, new FleeState())
      .setState(FSMStates.IDLE);

    enemy.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics()
      .flipSprite();

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.DARK_ARTILLERY);
    enemy.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._enemyTankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._tankCollisionGroup, [Action.NOTHING])
      .collidesWith(this._bulletCollisionGroup, [Action.NOTHING])
      .collidesWith(this._enemyTankCollisionGroup, [Action.NOTHING]);

    this._entities.push(enemy);
    enemy.sprite.data = {
      tag: Guid.newGuid()
    };
    return enemy;
  }

  public newBullet(x: number, y: number, owner: Entity): Entity {

    let bullet = new Entity(this._game, x, y)
      .withComponent([new PhysicsComponent(this._game), new LayerComponent(),
        new BulletComponent(this._game), new CollisionsComponent(),
        new OwnerComponent()]);

    bullet.getComponent<OwnerComponent>(ComponentType.OWNER).owner = owner;
    bullet.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(false);

    bullet.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.BULLET_FIVE);
    bullet.getComponent<BulletComponent>(ComponentType.BULLET)
      .bulletInit();

    bullet.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this.setBulletColisionGroup(owner))
      .collidesWith(this._tankCollisionGroup, [Action.EXPLODE, Action.DAMAGE])
      .collidesWith(this._groundCollisionGroup, [Action.EXPLODE]);

    this._entities.push(bullet);
    return bullet;

  }
  public spawnEnemiesAsCurrentLevel() {
    if (this.currentLevel) {
      if (typeof this.currentLevel.enemiesCount === 'number' && this.currentLevel.enemiesSpawnTime) {
        // typeof is there as enemiesCount can be 0 and javascript considers that as false what we are looking to avoid is typeof 'undefined'
        if (this.currentLevel.enemiesCount < this.currentLevel.capEnemies) {
          if (Date.now() - this._timer > this.currentLevel.enemiesSpawnTime * 1000) {
            this.newEnemy();
            this.currentLevel.enemiesCount++;
            this._timer = Date.now();

          }
        }
      }
    }
  }
  get entities(): Array<Entity> {
    return this._entities;

  }

  private setBulletColisionGroup(owner: Entity): CollisionGroup {
    if (owner.sprite.data.tag === this._player.sprite.data.tag) {
      return this._bulletCollisionGroup;
    }
    return this._enemyBulletsCollisionGroup;
  }
  get currentLevel(): TankLevel {
    return this._currentLevel;
  }

  set currentLevel(value: TankLevel) {
    this._currentLevel = value;
  }
}
