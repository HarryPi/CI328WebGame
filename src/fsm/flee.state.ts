import {ComponentType, InputType} from '../constants/GameConstants';
import {MovableComponent} from '../component/movable.component';
import {State} from './state';

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
