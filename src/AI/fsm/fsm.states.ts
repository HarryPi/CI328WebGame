import { Entity } from '../../entities/entity';
import {ComponentType, FsmStateName, InputType} from '../../constants/GameConstants';
import { EventComponents } from '../../component/event.components';
import { ControlComponents } from '../../component/control.components';

import ShootComponent = EventComponents.ShootComponent;
import MovableComponent = EventComponents.MovableComponent;
import {CollisionComponents} from '../../component/collision.components';
import {MathUtil} from '../../util/math.util';
import {DataComponents} from '../../component/data.components';

export namespace FsmStates {

  import AiComponent = ControlComponents.AiComponent;
  import PhysicsComponent = CollisionComponents.PhysicsComponent;
  import StateComponent = EventComponents.StateComponent;
  import HealthComponent = DataComponents.HealthComponent;

  export abstract class State {
    protected _entity: Entity;

    public abstract enter(): void;

    public abstract leave(): void;

    public abstract update(): void;

    public set entity(entity: Entity) {
      this._entity = entity;
    }
  }

  export class FiringState extends State {
    enter(): void {
      this._entity.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = true;
    }

    leave(): void {
      this._entity.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = false;
    }

    update(): void {
    }

  }

  export class FleeState extends State {

    enter(): void {
      // We know any component implementing SeekState will have an AI component
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.RIGHT_INPUT;
    }

    leave(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.STOP;
    }

    update(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).update();
    }

  }

  export class SuicideState extends State {
    enter(): void {
      let aiComponent = this._entity.getComponent<AiComponent>(ComponentType.AI);
      let distance = Math.abs(aiComponent.player.sprite.x - this._entity.sprite.x);
      let overKillDamage = 10000;
      if (MathUtil.isBetween(distance, 100, 0)) {
        this._entity.getComponent<HealthComponent>(ComponentType.HEALTH).dealDamage(overKillDamage);
        aiComponent.player.getComponent<HealthComponent>(ComponentType.HEALTH).dealDamage(2);
      }

    }

    leave(): void {
      this._entity.getComponent<StateComponent>(ComponentType.STATE).setState(FsmStateName.SUICIDE);
    }

    update(): void {
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
      let physicsComponent = this._entity.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
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

}
