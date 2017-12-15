import { Component } from './component';
import { Entity } from '../entities/entity';
import {AIConstant, AnimationTypes, ComponentType, FsmStateName, TankLayout} from '../constants/GameConstants';
import { CollisionComponents } from './collision.components';
import { MathUtil } from '../util/math.util';
import { DataComponents } from './data.components';

import PhysicsComponent = CollisionComponents.PhysicsComponent;
import TankComponent = DataComponents.TankComponent;
import OwnerComponent = DataComponents.OwnerComponent;
import { StateComponent } from './state.component';
import {DataConfig} from '../config/data.config';


export namespace ControlComponents {

  import HealthComponent = DataComponents.HealthComponent;
  import LayerComponent = DataComponents.LayerComponent;

  export class DisasterComponent extends Component {
    constructor() {
      super(ComponentType.DISASTER);
    }

    update(){
      const layoutComponent = this.target.getComponent<LayerComponent>(ComponentType.LAYER);
      const animation = layoutComponent.getCurrentAnimation();
      if (!animation.isPlaying) {
          this.target.sprite.angle = 45;
          this.target.sprite.body.velocity.y = 200 * (5 - DataConfig.difficulty) ;
          this.target.sprite.body.velocity.x = 100;
      }
    }
  }
  export class BulletComponent extends Component {
    private _game: Phaser.Game;

    constructor(game: Phaser.Game) {
      super(ComponentType.BULLET);
      this._game = game;
      this._requiredComponents.push(ComponentType.OWNER);
      this._requiredComponents.push(ComponentType.LAYER);
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
      let aiComponent = ownerComponent.owner.getComponent<AiComponent>(ComponentType.AI);
      let aiAngle: number;
      ownerComponent.owner.sprite.scale.x > 0 ? aiAngle = -45 : aiAngle = 180;
      aiComponent
        ? obj1.body.velocity.x = calculateVelocityX(true, velocity, aiAngle)
        : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
      aiComponent
        ? obj1.body.velocity.y = calculateVelocityY(true, velocity, aiAngle)
        : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);

      function calculateVelocityX(isAi: boolean = true, tankSpeed: number, angle: number): number {
        return velocity * Math.cos(angle);
      }

      function calculateVelocityY(isAi: boolean = true, tankSpeed: number, angle: number): number {
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
          sComp.setState(FsmStateName.PURSUING);
          break;
        case AIConstant.CLOSE:
          let healthComp = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);
          let lowHealth: boolean = healthComp.getCurrentHealth() <= healthComp.getMaxHealth() / 2;
          if (!lowHealth) {
            sComp.setState(FsmStateName.EVADE);
          } else {
            // Check if there is a reason to die
            if (this.checkIfAliesNearby()) {
              sComp.setState(FsmStateName.SUICIDE);
              return;
            }
            sComp.setState(FsmStateName.FLEEING);
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
      return this._friendlies.some((entity: Entity) => {
        return Math.abs(this.target.sprite.x - entity.sprite.x) < 20;
      });
    }

    private canHitPlayer(): AIConstant {
      const tankComponent: TankComponent = this.target.getComponent<TankComponent>(ComponentType.TANK);
      const physicsComponent: PhysicsComponent = this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
      const distance: number = this._player.sprite.x - this.target.sprite.x;
      const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);

      const rangeOfProjectile: number = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity;
      const decisionMakingDistance = 300;

      if (MathUtil.isBetween(rangeOfProjectile, Math.abs(distance) + decisionMakingDistance, Math.abs(distance) - decisionMakingDistance)) {
        return AIConstant.CAN_HIT_ENEMY;
      } else if (rangeOfProjectile > Math.abs(distance)) {
        return AIConstant.CLOSE;
      } else {
        return AIConstant.FAR_AWAY;
      }

    }

    get player(): Entity {
      return this._player;
    }

    get friendlies(): Array<Entity> {
      return this._friendlies;
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
