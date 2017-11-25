import { Component } from './component';
import { Action, ComponentType, TankLayout } from '../constants/GameConstants';
import { PhysicsComponent } from './physics.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;

export class CollisionsComponent extends Component {
  private _ignoreCollision: boolean = true;

  constructor() {
    super(ComponentType.COLLISION);
    this._requiredComponents = [ComponentType.PHYSICS];
  }
  public setCollisionGroup(ownerCollisionGroup: CollisionGroup): CollisionsComponent {
    this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
    return this;
  }

  public collidesWith(collidesWith: CollisionGroup, actions: Array<Action>): CollisionsComponent {
    let body: Phaser.Physics.P2.Body = this.target.sprite.body;

    if (body.collidesWith.includes(collidesWith)) {
      return; // In case we attempt to set the same collision group twice
    }

    actions.forEach((action) => {
      switch (action){
        case Action.NOTHING:
          body.collides(collidesWith);
          break;

        case Action.EXPLODE:
          body.collides(collidesWith, this.explode, this);
          break;

        case Action.DAMAGE:
          break;

        default:
          break;
      }
    });
    return this;
  }

  private explode(owner: Phaser.Physics.P2.Body, impacted: Phaser.Physics.P2.Body): void {
    this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS).stopSprite();

    if (!impacted.sprite) { // Ground Layer do not have sprites so we will explode the bullet instead
      owner.sprite.animations.add(Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
      owner.sprite.animations.play(Action.EXPLODE).onComplete.add(() => {
        owner.sprite.kill();
      });
    } else {
      impacted.sprite.animations.add(Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
      impacted.sprite.animations.play(Action.EXPLODE).onComplete.add(() => {
        owner.sprite.kill();
      });
    }

  }
}
