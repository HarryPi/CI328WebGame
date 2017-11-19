import { ComponentType } from '../constants/GameConstants';
import game from '../index';

export abstract class Component {

  protected _name: ComponentType;
  protected _target: string;

  constructor(name: ComponentType){
    this._name = name;
  }
  get name(): ComponentType {
    return this._name;
  }

  get target(): string {
    return this._target;
  }

  set target(target) {
    this._target = target;
  }

  update(): void {
  }
}
