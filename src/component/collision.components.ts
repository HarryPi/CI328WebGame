import {Component} from './component';
import {Action, ComponentType, TankLayout} from '../constants/GameConstants';
import {DataConfig} from '../config/data.config';
import {DataComponents} from './data.components';

import CollisionGroup = Phaser.Physics.P2.CollisionGroup;
import HealthComponent = DataComponents.HealthComponent;
import {UiManagers} from '../UI/uimanagers';
import {ActionComponents} from './action.components';

export namespace CollisionComponents {

  import PlayerVisualsManager = UiManagers.PlayerVisualsManager;
  import TankComponent = DataComponents.TankComponent;
  import PowerUpComponent = ActionComponents.PowerUpComponent;

  export class CollisionsComponent extends Component {
    private _state: Phaser.State;
    private _emitter: Phaser.Particles.Arcade.Emitter;

    constructor(emitter: Phaser.Particles.Arcade.Emitter, state?: Phaser.State ) {
      super(ComponentType.COLLISION);
      this._requiredComponents = [
        ComponentType.PHYSICS
      ];
      this._state = state;
      this._emitter = emitter;
      this._emitter.makeParticles(TankLayout.TANK_SPRITESHEET, TankLayout.EXPLOSION_NINE);
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

      if (this.target.sprite.body.collidesWith.includes(collidesWith)) {
        return;
      }

      actions.forEach((action) => {
        switch (action) {
          case Action.NOTHING:
            body.collides(collidesWith);
            break;

          case Action.DAMAGE:
            // Each bullet does the same damage regardless of type
            // Bullet damage depends on difficulty level
            const aiComp = this.target.getComponent(ComponentType.AI);
            const healthComp = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);
            const tankComp = this.target.getComponent<TankComponent>(ComponentType.TANK);

            if (!aiComp && tankComp) {
              body.collides(collidesWith, () => {
                const heartManager = new PlayerVisualsManager();
                const damage = tankComp.bulletDmg * DataConfig.enemyDamage;

                heartManager.removeHeartByDamage(damage);
                healthComp.dealDamage(damage);
                this._emitter.x = body.sprite.x;
                this._emitter.y = body.sprite.y;
                this._emitter.start(true, 500, null, 30);
              });
              break;
            }
            body.collides(collidesWith, () => {
              const damage = tankComp ? DataConfig.playerDamage * tankComp.bulletDmg : DataConfig.playerDamage; // if its not bullet
              healthComp.dealDamage(damage);
              this._emitter.x = body.sprite.x;
              this._emitter.y = body.sprite.y;
              this._emitter.start(true, 500, null, 30);
            });
            break;
          case Action.POWER_UP:
            const powerUpComponent = this.target.getComponent<PowerUpComponent>(ComponentType.POWER_UP);
            const healthComponent = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);

            body.collides(collidesWith, (tank: Phaser.Physics.P2.Body, powerup: Phaser.Physics.P2.Body) => {

              if (!healthComponent.pendingHeal()) {
                let frameName = powerup.sprite.frameName;
                if (frameName.includes(TankLayout.CRATE_REPAIR.toString())) {
                  powerUpComponent.loadCrate(TankLayout.CRATE_REPAIR);
                  powerup.sprite.visible = false;
                  powerup.data.shapes[0].sensor = true;
                }
              }
            });
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

    public scaleSprite(scale: number): PhysicsComponent {

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

