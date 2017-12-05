import { ComponentType } from '../constants/GameConstants';
import { Entity } from '../entities/entity';

export abstract class Component {

  protected _name: ComponentType;
  protected _target: Entity;
  protected _requiredComponents: Array<ComponentType> = [];

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

  public validateComponentRequirments(){
    let errorString: string = '';
    this._requiredComponents.forEach((comp: ComponentType) => {
      if (!this._target.getComponent(comp)) {
        errorString += `Missing component: ${comp.toString()} from component: ${this._name}}`;
      }
    });
    if (errorString) {
      throw new Error(errorString);
    }
  }
  public update(params?: any): void {}
}
