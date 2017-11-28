import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';
import { OwnerComponent } from './owner.component';
import { MathUtil } from '../util/math.util';
import {AiComponent} from './ai.component';

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
    if (!cOwner) {
      return;
    }

    let seekObject = {
      x: this._game.input.activePointer.x,
      y: this._game.input.activePointer.y
    };

    // Check if there is an AIComponent if yes this is not our player
    let aiComponent = this.target.getComponent<AiComponent>(ComponentType.AI);
    if (aiComponent) {
      // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
      seekObject.x = aiComponent.player.sprite.x;
      seekObject.y = aiComponent.player.sprite.y;
    }
    this.accelerateToObject(this.target.sprite, seekObject);
  }

  private degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }

  private accelerateToObject(obj1, obj2, speed = 1400) {

    let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.velocity.x = Math.cos(angle) * speed;    // accelerateToObject
    obj1.body.velocity.y = Math.sin(angle) * speed;
  }

}
