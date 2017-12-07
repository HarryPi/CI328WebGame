import { Component } from './component';
import { Entity } from '../entities/entity';
import { AIConstant, ComponentType, FsmStateName } from '../constants/GameConstants';
import { CollisionComponents } from './collision.components';
import { MathUtil } from '../util/math.util';
import { DataComponents } from './data.components';
import {EventComponents} from './event.components';

import PhysicsComponent = CollisionComponents.PhysicsComponent;
import TankComponent = DataComponents.TankComponent;
import OwnerComponent = DataComponents.OwnerComponent;
import StateComponent = EventComponents.StateComponent;
import {TankUtil} from '../UI/tank.util';
import {log} from 'util';
import {DataConfig} from '../config/data.config';


export namespace ControlComponents {

  import HealthComponent = DataComponents.HealthComponent;

  export class BulletComponent extends Component {
    private _game: Phaser.Game;

    // todo: Should this be on the PhysicsComponent?
    constructor(game: Phaser.Game) {
      super(ComponentType.BULLET);
      this._game = game;
      this._requiredComponents.push(ComponentType.OWNER);
      this._requiredComponents.push(ComponentType.LAYER);
    }

    /**
     * @description
     * This is to be called if a bullet is not a 'normal' bullet instead is a random disaster bullet
     * */
    disasterBullet() {
      this.target.sprite.angle = 90;
      this.target.sprite.body.velocity.y = 2000;
    }

    /**
     * @description
     * Initiates a normal bullet tank bullet and ensures it will reach the target
     * If this is an AI the target passed at the AI else at the mouse pointer of the player
     * */
    bulletInit() {
      let cOwner = this.target.getComponent<OwnerComponent>(ComponentType.OWNER);
      let seekObject = {
        x: this._game.input.activePointer.x + this._game.camera.x,
        y: this._game.input.activePointer.y
      };

      // Check if there is an AIComponent if yes this is not our player
      let aiComponent = cOwner ? cOwner.owner.getComponent<AiComponent>(ComponentType.AI) : null;
      if (aiComponent) {
        // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
        seekObject.x = aiComponent.player.sprite.x;
        seekObject.y = aiComponent.player.sprite.y;
      }
      this.accelerateToObject(this.target.sprite, seekObject,
        aiComponent
          ? cOwner.owner.getComponent<TankComponent>(ComponentType.TANK).bulletSpeed
          : Math.abs(cOwner.owner.getComponent<TankComponent>(ComponentType.TANK).bulletSpeed));
    }

    private accelerateToObject(obj1, obj2, velocity = 500) {
      let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
      const ownerComponent = this.target.getComponent<OwnerComponent>(ComponentType.OWNER);
      let tankComponent = ownerComponent.owner.getComponent<TankComponent>(ComponentType.TANK);
      let aiComponent = ownerComponent.owner.getComponent<AiComponent>(ComponentType.AI);

      aiComponent
        ? obj1.body.velocity.x = calculateVelocityX(true, velocity, tankComponent.angle)
        : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
      aiComponent
        ? obj1.body.velocity.y = calculateVelocityY(true, velocity, tankComponent.angle)
        : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);

      function calculateVelocityX(isAi: boolean = true, tankSpeed: number, angle: number): number {
        if (isAi) {
          return velocity * Math.cos(angle);
        }
        return velocity * Math.cos(angle);
      }

      function calculateVelocityY(isAi: boolean = true, tankSpeed: number, angle: number): number {

        if (isAi) {
          return velocity * Math.sin(angle);
        }
        return velocity * Math.sin(angle);
      }
    }

  }

  export class AiComponent extends Component {
    private _player: Entity;
    private _friendlies: Array<Entity>;

    constructor(player: Entity, aiFriendlies: Array<Entity>) {

      super(ComponentType.AI);
      this._requiredComponents = [ComponentType.MOVABLE, ComponentType.PHYSICS, ComponentType.SHOOT, ComponentType.TANK];
      this._player = player;
      this._friendlies = aiFriendlies;
    }

    update() {
      this.decide();
    }

    public decide() {
      // Check if state was given externally or has to be calculated
      // Justify this in the report say tanks can only spawn on the right of the player
      let sComp = this._target.getComponent<StateComponent>(ComponentType.STATE);
      // Here we are adding some random params to simulate a more realistic behaviour

      switch (this.canHitPlayer()) {
        case AIConstant.CAN_HIT_ENEMY:
          sComp.setState(FsmStateName.FIRING);
          break;
        case AIConstant.CLOSE:
          let healthComp = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);
          let lowHealth: boolean =  healthComp.getCurrentHealth() <= healthComp.getMaxHealth() / 2;
          if (!lowHealth) {
            sComp.setState(FsmStateName.FIRING);
          } else {
            // Check if there is long range support close by
            if (this.checkIfAliesNearby()) {
              sComp.setState(FsmStateName.SUICIDE);
            }
          }
          break;
        case AIConstant.FAR_AWAY:
          sComp.setState(FsmStateName.SEEK);
          break;
        default:
          break;

      }
    }

    private checkIfAliesNearby(): boolean {
      return this._friendlies.length > 0;
    }
    private canHitPlayer(): AIConstant {
      const tankComponent: TankComponent = this.target.getComponent<TankComponent>(ComponentType.TANK);
      const physicsComponent: PhysicsComponent = this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
      const distance: number = Math.abs(this._player.sprite.x - this.target.sprite.x);
      const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
      const rangeOfProjectile: number = Math.abs((2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity);
      const decisionMakingDistance = 50;

      if (MathUtil.isBetween(rangeOfProjectile, distance + decisionMakingDistance, distance - decisionMakingDistance)) {
        return AIConstant.CAN_HIT_ENEMY;
      } else if (rangeOfProjectile > distance) {
        return AIConstant.CLOSE;
      } else {
        return AIConstant.FAR_AWAY;
      }

    }

    get player(): Entity {
      return this._player;
    }
  }

  export class CameraComponent extends Component {
    private _game: Phaser.Game;

    constructor(game: Phaser.Game) {
      super(ComponentType.CAMERA);
      this._game = game;
    }

    setFocus(entity: Phaser.Sprite) {
      this._game.camera.follow(entity);
    }
  }

}
