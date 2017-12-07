import {Entity} from '../../entities/entity';
import {ComponentType, InputType} from '../../constants/GameConstants';
import {EventComponents} from '../../component/event.components';

import ShootComponent = EventComponents.ShootComponent;
import MovableComponent = EventComponents.MovableComponent;

export namespace FsmStates {

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
      // We know any component implementing SeekState will have an AI component
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.LEFT_INPUT;
    }

    leave(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.STOP;
    }

    update(): void {
      this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).update();
    }

  }

}
