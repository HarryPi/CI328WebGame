import { CameraComponent } from './component/camera.component';
import { MovableComponent } from './component/movable.component';
import { Entity } from './entities/entity';
import WorldService from './serivce/world.service';
import { ComponentType } from './constants/GameConstants';
import {PhysicsComponent} from './component/physics.component';
import PhysicsService from './serivce/physics.service';

export default class TankWorldFactory {
  constructor() {
  }

  public static newPlayer(game: Phaser.Game): Entity {
    let player = new Entity(game, WorldService.level.playerStartPos.x, WorldService.level.playerStartPos.y)
      .withComponent([new MovableComponent(), new CameraComponent(game), new PhysicsComponent(game)]);
    player.getComponent<CameraComponent>(ComponentType.CAMERA).setFocus(player.sprite);
    PhysicsService.enablePhysics(player);
    return player;
  }

  public newEnemy() {

  }
}
