import { ComponentType } from '../constants/Constants';
import game from '../index';

export abstract class Component {

  protected _name: ComponentType;
  protected _target: string;
  protected _physicsEngine: number;

  constructor(name: ComponentType){
    this._name = name;
    this._physicsEngine = Phaser.Physics.P2JS;
  }
  get name(): ComponentType {
    return this._name;
  }

  get target(): string {
    return this._target;
  }

  set target(target) {
    this._target = target;
    game.physics.enable(target, this._physicsEngine);
  }

  update(): void {
  }
}
