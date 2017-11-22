import { ComponentType } from '../constants/GameConstants';
import { Entity } from '../entities/entity';

export abstract class Component {

  protected _name: ComponentType;
  protected _target: Entity;


  constructor(name: ComponentType){
    this._name = name;
  }
  get name(): ComponentType {
    return this._name;
  }

  get target(): Entity {
    return this._target;
  }

  set target(target: Entity) {
    this._target = target;
  }

  public update(params?: any): void {}
}
