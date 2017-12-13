import { Entity } from './entities/entity';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import { Guid } from './util/guid';
import { DataConfig } from './config/data.config';
import { Action, ComponentType, FsmStateName, States, TankLayout } from './constants/GameConstants';
import { FsmStates } from './AI/fsm/fsm.states';
import { CollisionComponents } from './component/collision.components';
import { ControlComponents } from './component/control.components';
import { DataComponents } from './component/data.components';
import { ActionComponents } from './component/action.components';
import { TankGameLevels } from './config/levels/levels.tankLevels';

import IdleState = FsmStates.IdleState;
import PursuingState = FsmStates.PursuingState;
import FleeState = FsmStates.FleeState;
import SeekState = FsmStates.SeekState;
import PhysicsComponent = CollisionComponents.PhysicsComponent;
import CollisionsComponent = CollisionComponents.CollisionsComponent;
import CameraComponent = ControlComponents.CameraComponent;
import AiComponent = ControlComponents.AiComponent;
import BulletComponent = ControlComponents.BulletComponent;
import LayerComponent = DataComponents.LayerComponent;
import HealthComponent = DataComponents.HealthComponent;
import TankComponent = DataComponents.TankComponent;
import OwnerComponent = DataComponents.OwnerComponent;
import MovableComponent = ActionComponents.MovableComponent;
import ShootComponent = ActionComponents.ShootComponent;
import TankLevel = TankGameLevels.TankLevel;
import SuicideState = FsmStates.SuicideState;
import { MathUtil } from './util/math.util';
import Vector from './util/vector';
import EvadeState = FsmStates.EvadeState;
import { StateComponent } from './component/state.component';
import DisasterComponent = ControlComponents.DisasterComponent;

/**
 * @class TankWorldFactory
 * @description
 * This is the game factory and exposes functions to
 * create a new player {@link TankWorldFactory#newPlayer}
 * create a new bullet {@link TankWorldFactory#newBullet}
 * create a new enemy {@link TankWorldFactory#newEnemy}
 * start spawning enemies {@Link TankWorldFactory#spawnEnemies}
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

  /**
   * @constructor
   * @param {Phaser.Game} game
   * @param state - Current conditions
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
    player.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(100000); //DataConfig.playerMaxHealth);

    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    player.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics();

    player.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(DataConfig.tank);

    player.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._tankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
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
    const startingPost = new Vector();
    const random = MathUtil.randomIntFromInterval(0, 1);

    if (random === 1) {
      startingPost.x = this.currentLevel.playerStartPos.x;
      startingPost.y = this.currentLevel.playerStartPos.y;
    } else {
      startingPost.x = this.currentLevel.enemyStartPos.x;
      startingPost.y = this.currentLevel.enemyStartPos.y;
    }

    let enemy = new Entity(this._game, startingPost.x, startingPost.y, null)
      .withComponent(
        [
          new MovableComponent(),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent(),
          new StateComponent(),
          new AiComponent(this._player, this._entities.filter( (entity: Entity) => {
           return entity.hasComponent(ComponentType.AI);
          })),
          new HealthComponent(),
          new TankComponent(kindOfTank)
  ]);

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addAnimation(
      Action.EXPLODE,
      Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);

    enemy.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(DataConfig.enemyHealth);

    enemy.getComponent<StateComponent>(ComponentType.STATE)
      .addState(FsmStateName.SEEK, new SeekState())
      .addState(FsmStateName.IDLE, new IdleState())
      .addState(FsmStateName.PURSUING, new PursuingState())
      .addState(FsmStateName.FLEEING, new FleeState())
      .addState(FsmStateName.SUICIDE, new SuicideState())
      .addState(FsmStateName.EVADE, new EvadeState())
      .setState(FsmStateName.IDLE);

    enemy.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics();
    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(kindOfTank);

    enemy.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._enemyTankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._playerBulletCollisionGroup, [Action.DAMAGE]);

    this._entities.push(enemy);
    // NECESSARY FOR BULLET TO GET CORRECT GROUP
    enemy.sprite.data = {
      tag: Guid.newGuid()
    };
    let sub = enemy.whenDestroyed.subscribe(() => {

      // this is to ensure when the entity is destroyed all memorie refs are released for garbage collection
      subFunction();
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
      .addPhysics(false)
      .scaleSprite(owner.sprite.scale.x);

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
  public newDisaster(x: number , y: number) {
    let disaster = new Entity(this._game, x, y)
      .withComponent([
        new PhysicsComponent(this._game),
        new LayerComponent(),
        new CollisionsComponent(),
        new DisasterComponent(),
        new HealthComponent()
      ]);

    disaster.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(false);

    disaster.getComponent<LayerComponent>(ComponentType.LAYER)
      .addLayer(getRandomLayout())
      .addAnimation(
        Action.EXPLODE,
        Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);

    disaster.getComponent<HealthComponent>(ComponentType.HEALTH).setHealth(1);

    disaster.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._enemyBulletsCollisionGroup)
      .collidesWith(this._tankCollisionGroup, [Action.DAMAGE])
      .collidesWith(this._groundCollisionGroup, [Action.DAMAGE]);




    this._entities.push(disaster);
    let sub = disaster.whenDestroyed.subscribe(() => {
      const index = this._entities.indexOf(disaster);
      this._entities.splice(index, 1);
      sub.unsubscribe();
    });
    this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
    return disaster;

    function getRandomLayout() {
      let random = MathUtil.randomIntFromInterval(0, 5);
      let tankLayout = () => {
        switch (random) {
          case 0:
            return TankLayout.BULLET_ONE;
          case 1:
            return TankLayout.BULLET_TWO;
          case 2:
            return TankLayout.BULLET_THREE;
          case 3:
            return TankLayout.BULLET_FOUR;
          case 4:
            return TankLayout.BULLET_FIVE;
        }
      };
      return tankLayout();
    }
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

