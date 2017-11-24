import {CameraComponent} from './component/camera.component';
import {MovableComponent} from './component/movable.component';
import {Entity} from './entities/entity';
import {Action, ComponentType, Levels, TankLayout} from './constants/GameConstants';
import {PhysicsComponent} from './component/physics.component';
import TankLevel from './config/levels/tankLevel';
import {LevelOne} from './config/levels/levelOne';
import {ShootComponent} from './component/shoot.component';
import {LayerComponent} from './component/layer.component';
import {BulletComponent} from './component/bullet.component';
import {CollisionsComponent} from './component/collisions.component';

export default class TankWorldFactory {

  private _game: Phaser.Game;

  // Levels
  private _currentLevel: TankLevel;

  // Arrays
  private _levels: Array<TankLevel> = [];
  private _entities: Array<Entity> = [];

  constructor(game: Phaser.Game) {
    this._levels.push(new LevelOne(game));
    this._levels.forEach((level: TankLevel) => {
      level.init();
    });

    this._currentLevel = this._levels[0];
    this._game = game;

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

    this._entities.push(player);

    return player;
  }

  public newEnemy() {
    let enemy = new Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y)
      .withComponent(
        [
          new MovableComponent(),
          new PhysicsComponent(this._game),
          new ShootComponent(this._game, this),
          new LayerComponent(),
          new CollisionsComponent()]);

    enemy.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics()
      .delayGravity(false);

    enemy.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.DARK_ARTILLERY);

    this._entities.push(enemy);

    return enemy;
  }

  public newBullet(x: number, y: number, owner: Entity): Entity {

    let bullet = new Entity(this._game, x, y)
      .withComponent([new PhysicsComponent(this._game), new LayerComponent(),
        new BulletComponent(this._game), new CollisionsComponent()])
      .withOwner(owner);

    bullet.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(false)
      .delayGravity(true);

    bullet.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.BULLET_FIVE);
    bullet.getComponent<BulletComponent>(ComponentType.BULLET).bulletInit();
    bullet.getComponent<CollisionsComponent>(ComponentType.COLLISION).enableCollision([Action.EXPLODE]);

    this._entities.push(bullet);
    return bullet;

  }

  get entities(): Array<Entity> {
    return this._entities;

  }

}
