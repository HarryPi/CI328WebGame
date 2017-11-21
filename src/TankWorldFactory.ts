import { CameraComponent } from './component/camera.component';
import { MovableComponent } from './component/movable.component';
import { Entity } from './entities/entity';
import { ComponentType, Levels, TankLayout } from './constants/GameConstants';
import { PhysicsComponent } from './component/physics.component';
import TankLevel from './config/levels/tankLevel';
import { LevelOne } from './config/levels/levelOne';
import { ShootComponent } from './component/shoot.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import { LayerComponent } from './component/layer.component';
import Vector from './util/vector';

export default class TankWorldFactory {
  private _bullets: CollisionGroup;
  private _levels: Array<TankLevel> = [];
  private _game: Phaser.Game;
  private _currentLevel: TankLevel;
  private _levelCollisionLayer: Array<any>;

  constructor(game: Phaser.Game) {
    this._levels.push(new LevelOne(game));
    this._levels.forEach((level: TankLevel) => {
      level.init();
    });
    this._currentLevel = this._levels[0];
    this._game = game;
    this._bullets = game.physics.p2.createCollisionGroup();
    this._levelCollisionLayer = this._currentLevel.collisionLayer;
  }

  public newPlayer(): Entity {
    let player = new Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
      .withComponent(
        [new MovableComponent(), new CameraComponent(this._game),
          new PhysicsComponent(this._game), new ShootComponent(this._game, this),
          new LayerComponent()]);
    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    player.getComponent<PhysicsComponent>(ComponentType.PHYSICS).addPhysics();
    player.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.CANDY_HUNTER);
    return player;
  }

  public newEnemy() {

  }

  public newBullet(x: number, y: number): Entity {
    let bullet = new Entity(this._game, x, y)
      .withComponent([new PhysicsComponent(this._game), new LayerComponent()]);

    bullet.getComponent<PhysicsComponent>(ComponentType.PHYSICS)
      .addPhysics(0, new Vector(1.4, 0.9))
      .setVelocity(new Vector(1500, 0));

    bullet.getComponent<LayerComponent>(ComponentType.LAYER).addLayer(TankLayout.BULLET_FIVE);
    return bullet;
  }

}
