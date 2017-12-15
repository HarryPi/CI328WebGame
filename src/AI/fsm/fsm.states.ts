import { Entity } from '../../entities/entity';
import {ComponentType, FsmStateName, InputType} from '../../constants/GameConstants';
import { ActionComponents } from '../../component/action.components';
import { ControlComponents } from '../../component/control.components';

import ShootComponent = ActionComponents.ShootComponent;
import MovableComponent = ActionComponents.MovableComponent;
import { CollisionComponents } from '../../component/collision.components';
import { DataComponents } from '../../component/data.components';
import { DataConfig } from '../../config/data.config';
import {MathUtil} from '../../util/math.util';

export namespace FsmStates {

  import AiComponent = ControlComponents.AiComponent;
  import PhysicsComponent = CollisionComponents.PhysicsComponent;
  import HealthComponent = DataComponents.HealthComponent;
  import TankComponent = DataComponents.TankComponent;

  export abstract class State {
    protected _entity: Entity;

    public abstract enter(): void;

    public abstract leave(): void;

    public abstract update(): void;

    public set entity(entity: Entity) {
      this._entity = entity;
    }
  }

  export class PursuingState extends State {
    enter(): void {
    }

    leave(): void {
    }

    update(): void {
      const tankComponent = this._entity.getComponent<TankComponent>(ComponentType.TANK);
      const aiComp = this._entity.getComponent<AiComponent>(ComponentType.AI);
      const shootComponent = this._entity.getComponent<ShootComponent>(ComponentType.SHOOT);
      const movableComponent = this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE);
      const difficultyModifier = 10 + DataConfig.difficulty * DataConfig.difficulty;
      const distance = this._entity.sprite.x - aiComp.player.sprite.x;

      let seconds = (distance / tankComponent.speed);

      let futurePosition = aiComp.player.sprite.x + (aiComp.player.sprite.body.velocity.x / 1000) * seconds;
      let direction = futurePosition - this._entity.sprite.x;
      let rangeOfProjectile = shootComponent.rangeOfProjectile;

      if (MathUtil.isBetween(Math.abs(direction), rangeOfProjectile + difficultyModifier, rangeOfProjectile - difficultyModifier)) {
        shootComponent.canShoot = true;
      }  else if (Math.abs(direction) < rangeOfProjectile ) {
        direction > 0 ? movableComponent.direction = InputType.LEFT_INPUT : movableComponent.direction = InputType.RIGHT_INPUT;
      } else {
        direction > 0 ? movableComponent.direction = InputType.RIGHT_INPUT : movableComponent.direction = InputType.LEFT_INPUT;
      }
      this.correctScale();

    }
    private correctScale (){
      const aiComp = this._entity.getComponent<AiComponent>(ComponentType.AI);
      const distance = aiComp.player.sprite.x - this._entity.sprite.x;
      if (distance > 0 && this._entity.sprite.scale.x === -1) {
        this._entity.sprite.scale.x = 1;
      } else if (distance < 0 && this._entity.sprite.scale.x === 1) {
        this._entity.sprite.scale.x = -1;
      }
    }

  }

  export class FleeState extends State {

    enter(): void {
      let aiComponent: AiComponent = this._entity.getComponent<AiComponent>(ComponentType.AI);
      let moveComponent: MovableComponent = this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE);
     // Get player direction
      let playerDir = aiComponent.player.sprite.scale.x;
      // Go in the other direction of the player
      if (playerDir === 1) {
        moveComponent.direction = InputType.LEFT_INPUT;
      }
      else {
        moveComponent.direction = InputType.RIGHT_INPUT;
      }
    }

    leave(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.STOP;
    }

    update(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).update();
    }
  }

  export class SuicideState extends State {
    private _direction: number;
    enter(): void {
      this._direction = this._entity.getComponent<AiComponent>(ComponentType.AI).player.sprite.x - this._entity.sprite.x;
      if (this._direction < 0) {
        this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.LEFT_INPUT;
      } else {
        this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.RIGHT_INPUT;
      }
    }

    leave(): void {
    }

    update(): void {
      if (Math.abs(this._direction) <= 10) {
        const overKillDamage: number = 10000;
        const playerDamageOnSuicide = 2;

        this._entity.getComponent<HealthComponent>(ComponentType.HEALTH).dealDamage(overKillDamage);
        this._entity.getComponent<AiComponent>(ComponentType.AI)
          .player.getComponent<HealthComponent>(ComponentType.HEALTH)
          .dealDamage(playerDamageOnSuicide);
      }
    }

  }

  export class IdleState extends State {

    enter(): void {
    }

    leave(): void {
    }

    update(): void {
    }

  }

  export class SeekState extends State {

    enter(): void {
      let direction = this._entity.getComponent<AiComponent>(ComponentType.AI).player.sprite.x - this._entity.sprite.x;
      const physicsComponent = this._entity.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
      if (direction < 0) {
        this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.LEFT_INPUT;
        physicsComponent.scaleSprite(-1);

      } else {
        this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.RIGHT_INPUT;
        physicsComponent.scaleSprite(1);

      }
    }

    leave(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.STOP;
    }

    update(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).update();
    }

  }

  export class EvadeState extends State {

    enter(): void {
    }

    leave(): void {
    }

    update(): void {
      const aiComp = this._entity.getComponent<AiComponent>(ComponentType.AI);
      const movableComponent = this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE);

      // Move until in range to pursuit again
      aiComp.player.sprite.scale.x > 0 ? movableComponent.direction = InputType.LEFT_INPUT : movableComponent.direction = InputType.RIGHT_INPUT;
    }

  }
}
