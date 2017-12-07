import { Component } from './component';
import { Action, ComponentType } from '../constants/GameConstants';
import { DataConfig } from '../config/data.config';
import { DataComponents } from './data.components';

import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import HealthComponent = DataComponents.HealthComponent;

export namespace CollisionComponents {

  export class CollisionsComponent extends Component {

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


      actions.forEach((action) => {
        switch (action) {
          case Action.NOTHING:
            body.collides(collidesWith);
            break;

          case Action.DAMAGE:
            // Each bullet does the same damage regardless of type
            // Bullet damage depends on difficulty level
            let aiComp = this.target.getComponent(ComponentType.AI);
            let healthComp = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);

            if (aiComp) {
              body.collides(collidesWith, () => {
                healthComp.dealDamage(DataConfig.playerDamage);
                console.log(healthComp.getCurrentHealth());
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

  }
  export class PhysicsComponent extends Component {
    private _game: Phaser.Game;

    constructor(game: Phaser.Game) {
      super(ComponentType.PHYSICS);
      this._game = game;
    }

    public addPhysics(drag: boolean = true): PhysicsComponent {
      this._game.physics.p2.enable(this.target.sprite);
      this.target.sprite.anchor.setTo(0.5, 0.5);
      drag ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;

      return this;
    }

    public get gravity(): number {
      return this._game.physics.p2.gravity.y;
    }
    public scaleSprite(scale: number): PhysicsComponent{
      this.target.sprite.scale.x = scale;
      return this;
    }
    public stopSprite() {
      this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
      this.target.sprite.body.restitution = 0.0;
      this.target.sprite.body.velocity.x = 0;
      this.target.sprite.body.velocity.y = 0;
      this.target.sprite.body.allowGravity = false;
      this.target.sprite.body.data.gravityScale = 0;
      this.target.sprite.body.angularDumping = 1;
    }
  }
}

