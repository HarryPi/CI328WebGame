import {Entity} from '../entities/entity';

export abstract class State {
  protected _entity: Entity;

  public abstract enter(): void;
  public abstract leave(): void;
  public abstract update(): void;

  protected set entity(entity: Entity) {
    this._entity = entity;
  }
}
