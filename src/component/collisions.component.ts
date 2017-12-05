import {Component} from './component';
import {Action, ComponentType, TankLayout} from '../constants/GameConstants';
import {PhysicsComponent} from './physics.component';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import {OwnerComponent} from './owner.component';
import {HealthComponent} from './health.component';
import {DataConfig} from '../config/data.config';
import {LayerComponent} from './layer.component';
import {BulletComponent} from './bullet.component';

export class CollisionsComponent extends Component {
  private _ignoreCollision: boolean = true;

  constructor() {
    super(ComponentType.COLLISION);
    this._requiredComponents = [
      ComponentType.PHYSICS
    ];
  }

  public setCollisionGroup(ownerCollisionGroup: CollisionGroup): CollisionsComponent {
    this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
    return this;
  }

  public cleanCollisions() {
    this.target.sprite.body.data.shapes[0].sensor = true;
  }

  public collidesWith(collidesWith: CollisionGroup, actions: Array<Action>): CollisionsComponent {
    let body: Phaser.Physics.P2.Body = this.target.sprite.body;

    /*
        if (body.collidesWith.includes(collidesWith)) {
          return; // In case we attempt to set the same collision group twice
        }
    */

    actions.forEach((action) => {
      switch (action) {
        case Action.NOTHING:
          body.collides(collidesWith);
          break;

        /*
                case Action.EXPLODE:
                  body.collides(collidesWith, this.explode, this);
                  break;
        */

        case Action.DAMAGE:
          // Each bullet does the same damage regardless of type
          // Bullet damage depends on difficulty level
          let aiComp = this.target.getComponent(ComponentType.AI);
          let healthComp = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);

          if (aiComp) {
            body.collides(collidesWith, () => {
              healthComp.dealDamage(DataConfig.playerDamage);
            }, this);
          } else {
            body.collides(collidesWith, () => {
              healthComp.dealDamage(DataConfig.enemyDamage);
            });
          }
          break;

        default:
          break;
      }
    });
    return this;
  }

  private explode(ownerBody: Phaser.Physics.P2.Body, impacted: Phaser.Physics.P2.Body): void {
    let ownerComponent = this.target.getComponent<OwnerComponent>(ComponentType.OWNER); // Here we check if this Entity is a bullet as only bullets have owners
    // Thus if this is bullet
    if (ownerComponent) {
      this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS).stopSprite(); // This should be true only if bullet
      this.target.getComponent<LayerComponent>(ComponentType.LAYER).playAnimation(Action.EXPLODE, null, null, true);
    }
  }
}
