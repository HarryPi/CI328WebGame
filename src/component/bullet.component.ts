import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';
import { OwnerComponent } from './owner.component';
import { MathUtil } from '../util/math.util';
import { AiComponent } from './ai.component';

export class BulletComponent extends Component {
  private _game: Phaser.Game;

  // todo: Should this be on the PhysicsComponent?
  constructor(game: Phaser.Game) {
    super(ComponentType.BULLET);
    this._game = game;
    this._requiredComponents.push(ComponentType.OWNER);
  }

  bulletInit() {
    let cOwner = this.target.getComponent<OwnerComponent>(ComponentType.OWNER);
    // Not a bullet?
    if (!cOwner) {
      return;
    }

    let seekObject = {
      x: this._game.input.activePointer.x,
      y: this._game.input.activePointer.y
    };

    // Check if there is an AIComponent if yes this is not our player
    let ownerComponent = this.target.getComponent<OwnerComponent>(ComponentType.OWNER);
    let aiComponent = ownerComponent ? ownerComponent.owner.getComponent<AiComponent>(ComponentType.AI) : null;
    if (aiComponent) {
      // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
      seekObject.x = aiComponent.player.sprite.x;
      seekObject.y = aiComponent.player.sprite.y;
    } else {
    }
    this.accelerateToObject(this.target.sprite, seekObject);
  }

  private accelerateToObject(obj1, obj2, velocity = 500) {
    let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

    this.target.getComponent<OwnerComponent>(ComponentType.OWNER).owner.getComponent<AiComponent>(ComponentType.AI)
      ? obj1.body.velocity.x = Math.cos(angle - Math.PI / 180) * velocity
      : obj1.body.velocity.x = Math.abs(Math.cos(angle - Math.PI / 180) * velocity);    // accelerateToObject
      obj1.body.velocity.y = (Math.sin(angle - Math.PI / 180) * velocity - 1400);
  /*

    let angle = MathUtil.calculateAngle2ToHitCoordinate(obj2.x, obj2.y, velocity, 1400);
    obj1.body.angle = angle;
    obj1.body.velocity.x = velocity;*/
  }

}
