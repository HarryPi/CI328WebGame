import { State } from './state';
import { ComponentType, InputType } from '../constants/GameConstants';
import {MovableComponent} from '../component/event.components';

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
