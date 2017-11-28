import {CameraComponent} from './component/camera.component';
import {MovableComponent} from './component/movable.component';
import {Entity} from './entities/entity';
import {Action, ComponentType, FSMStates, Levels, TankLayout} from './constants/GameConstants';
import {PhysicsComponent} from './component/physics.component';
import TankLevel from './config/levels/tankLevel';
import {LevelOne} from './config/levels/levelOne';
import {ShootComponent} from './component/shoot.component';
import {LayerComponent} from './component/layer.component';
import {BulletComponent} from './component/bullet.component';
import {CollisionsComponent} from './component/collisions.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import {AiComponent} from './component/ai.component';
import {StateComponent} from './component/state.component';
import {IdleState} from './fsm/idle.state';
import {SeekState} from './fsm/seek.state';
import {FiringState} from './fsm/firing.state';
import {OwnerComponent} from './component/owner.component';
import {Guid} from './util/guid';

export default class TankWorldFactory {

  private _game: Phaser.Game;
  private _player: Entity;
  // Levels
  private _currentLevel: TankLevel;

  // Arrays
  private _levels: Array<TankLevel> = [];
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

  constructor(game: Phaser.Game) {
    this._levels.push(new LevelOne(game));
    this._levels.forEach((level: TankLevel) => {
      level.init();
    });

    this._currentLevel = this._levels[0];
    this._game = game;

    // init collision groups

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

  public newPlayer(): Entity {
    let player = new Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
      .withComponent(
        [new MovableComponent(),
          new CameraComponent(this._game),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent()]);

    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    player.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics()
      .delayGravity(false);

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
      .setState(FSMStates.IDLE);

    enemy.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics()
      .flipSprite();

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.DARK_ARTILLERY);
    enemy.getComponent<CollisionsComponent>(ComponentType.COLLISION)
      .setCollisionGroup(this._enemyTankCollisionGroup)
      .collidesWith(this._groundCollisionGroup, [Action.NOTHING])
      .collidesWith(this._tankCollisionGroup, [Action.NOTHING])
      .collidesWith(this._bulletCollisionGroup, [Action.NOTHING]);

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

  get entities(): Array<Entity> {
    return this._entities;

  }

  private setBulletColisionGroup(owner: Entity): CollisionGroup {
    if (owner.sprite.data.tag === this._player.sprite.data.tag) {
      return this._bulletCollisionGroup;
    }
    return this._enemyBulletsCollisionGroup;
  }
}
