import { Entity } from './entities/entity';
import { Action, ComponentType, FSMStates, Levels, States, TankLayout } from './constants/GameConstants';
import TankLevel from './config/levels/tankLevel';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import { IdleState } from './fsm/idle.state';
import { SeekState } from './fsm/seek.state';
import { FiringState } from './fsm/firing.state';
import { Guid } from './util/guid';
import { FleeState } from './fsm/flee.state';
import { DataConfig } from './config/data.config';
import {HealthComponent, LayerComponent, OwnerComponent, TankComponent} from './component/data.components';
import {AiComponent, BulletComponent, CameraComponent} from './component/control.components';
import { CollisionsComponent, PhysicsComponent } from './component/collision.components';
import {MovableComponent, ShootComponent, StateComponent} from './component/event.components';

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
  private _entitiesSubscriptions = []; // Keep a record of the subscriptions to remove later
  private _currentState: Phaser.State;
  // Levels
  private _currentLevel: TankLevel;

  // Arrays
  private _entities: Array<Entity> = [];

  // Collision Groups
  private _tankCollisionGroup: CollisionGroup;
  private _enemyTankCollisionGroup: CollisionGroup;
  private _playerBulletCollisionGroup: CollisionGroup;
  private _enemyBulletsCollisionGroup: CollisionGroup;
  private _groundCollisionGroup: CollisionGroup;

  // Phaser groups
  private _tanks: Phaser.Group;
  private _bullets: Phaser.Group;


  /**
   * @constructor
   * @param {Phaser.Game} game
   * @param state - Current state
   * */
    constructor(game: Phaser.Game, state: Phaser.State) {

    this._game = game;
    this._currentState = state;

  }

  public init() {
    // init collision groups
    this._currentLevel.init();
    this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._playerBulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
    this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();

    // Have to do this here as we cannot enforce layer to be Entity to attach component
    this._currentLevel.collisionLayer.forEach((layer) => {
      layer.setCollisionGroup(this._groundCollisionGroup);
      layer.collides([
        this._tankCollisionGroup,
        this._playerBulletCollisionGroup,
        this._enemyBulletsCollisionGroup,
        this._enemyTankCollisionGroup
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
          new HealthComponent(),
          new TankComponent(DataConfig.tank)]);

    player.getComponent<LayerComponent>(ComponentType.LAYER).addAnimation(
      Action.EXPLODE,
      Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
    player.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(100000); //DataConfig.health);

    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    player.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics();

    player.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(DataConfig.tank);

    player.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._tankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._enemyTankCollisionGroup, [Action.NOTHING])
      .collidesWith(this._enemyBulletsCollisionGroup, [Action.DAMAGE]);

    this._entities.push(player);
    this._player = player;

    this._player.sprite.data = {
      tag: Guid.newGuid()
    };
   let sub = player.whenDestroyed.subscribe(() => {
      this._game.state.start(States.GAMEOVER_SATE, true, false);
      sub.unsubscribe();
    });
    return player;
  }

  /**
   * @description
   * Creates a new enemy based on the loaded level {@link TankLevel#enemyStartPos}
   * */
  public newEnemy(subFunction?: () => void ) {
    let kindOfTank: TankLayout = this.currentLevel.getRandomEnemy(); // As each level can have many random enemies
                                                                    // Get one store it and use it where appropriate
    let enemy = new Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y, null)
      .withComponent(
        [
          new MovableComponent(),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent(),
          new StateComponent(),
          new AiComponent(this._player),
          new HealthComponent(),
          new TankComponent(kindOfTank)
  ]);

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addAnimation(
      Action.EXPLODE,
      Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);

    enemy.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(DataConfig.enemyHealth);

    enemy.getComponent<StateComponent>(ComponentType.STATE)
      .addState(FSMStates.SEEK, new SeekState())
      .addState(FSMStates.IDLE, new IdleState())
      .addState(FSMStates.FIRING, new FiringState())
      .addState(FSMStates.FLEEING, new FleeState())
      .setState(FSMStates.IDLE);

    enemy.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics()
      .flipSprite();

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(kindOfTank);

    enemy.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._enemyTankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._tankCollisionGroup, [Action.NOTHING])
      .collidesWith(this._playerBulletCollisionGroup, [Action.DAMAGE])
      .collidesWith(this._enemyTankCollisionGroup, [Action.NOTHING]);

    this._entities.push(enemy);
    // NECESSARY FOR BULLET TO GET CORRECT GROUP
    enemy.sprite.data = {
      tag: Guid.newGuid()
    };
    let sub = enemy.whenDestroyed.subscribe(() => {
      subFunction();
      console.log('I am here');
      const index = this._entities.indexOf(enemy);
      this._entities.splice(index, 1);
      this._currentLevel.enemiesCount--;
      sub.unsubscribe();
    });
    this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
    return enemy;
  }

  public newBullet(x: number, y: number, owner: Entity): Entity {

    let bullet = new Entity(this._game, x, y)
      .withComponent([
        new PhysicsComponent(this._game),
        new LayerComponent(),
        new BulletComponent(this._game),
        new CollisionsComponent(),
        new HealthComponent(),
        new OwnerComponent()]);

    bullet.getComponent<OwnerComponent>(ComponentType.OWNER).owner = owner;
    bullet.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(1);
    bullet.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(false);


    bullet.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(owner.getComponent<TankComponent>(ComponentType.TANK).bulletKind);
    bullet.getComponent<BulletComponent>(ComponentType.BULLET)
      .bulletInit();

    bullet.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this.setBulletColisionGroup(owner))
      .collidesWith(this._tankCollisionGroup, [Action.DAMAGE])
      .collidesWith(this._enemyTankCollisionGroup, [Action.DAMAGE])
      .collidesWith(this._groundCollisionGroup, [Action.DAMAGE]);

    bullet.getComponent<LayerComponent>(ComponentType.LAYER).addAnimation(
      Action.EXPLODE,
      Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);

    this._entities.push(bullet);
    let sub = bullet.whenDestroyed.subscribe(() => {
      const index = this._entities.indexOf(bullet);
      this._entities.splice(index, 1);
      sub.unsubscribe();
    });
    this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
    return bullet;

  }
  public newDisaster() {
    let disaster = new Entity(this._game, this._player.sprite.x, this._game.world.top)
      .withComponent([
        new PhysicsComponent(this._game),
        new LayerComponent(),
        new BulletComponent(this._game),
        new CollisionsComponent(),
        new HealthComponent()
      ]);

    disaster.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(1);
    disaster.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(false);


    disaster.getComponent<BulletComponent>(ComponentType.BULLET)
      .disasterBullet();

    disaster.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .collidesWith(this._tankCollisionGroup, [Action.DAMAGE])
      .collidesWith(this._groundCollisionGroup, [Action.DAMAGE]);

    disaster.getComponent<LayerComponent>(ComponentType.LAYER)
      .addLayer(TankLayout.BULLET_SIX)
      .addAnimation(
      Action.EXPLODE,
      Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);

    this._entities.push(disaster);
    let sub = disaster.whenDestroyed.subscribe(() => {
      const index = this._entities.indexOf(disaster);
      this._entities.splice(index, 1);
      sub.unsubscribe();
    });
    this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
  }

  public cleanUp(){
    this._currentLevel.destroy();
    this._entities = null;
    this._entitiesSubscriptions.forEach( (e) => {
      e.unsubscribe();
    });
  }
  get entities(): Array<Entity> {
    return this._entities;

  }

  private setBulletColisionGroup(owner: Entity): CollisionGroup {
    if (owner.sprite.data.tag === this._player.sprite.data.tag) {
      return this._playerBulletCollisionGroup;
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
