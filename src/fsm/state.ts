import {Entity} from '../entities/entity';

export abstract class State {
  protected _entity: Entity;
  protected _isWaiting: boolean;
  protected _timeoutSet: boolean
  protected _lastAction;

  constructor(entity: Entity){
    this._entity = entity;
  }
  public abstract enter(): void;
  public abstract leave(): void;
  public abstract update(): void;
}
