import { State } from './state';
import { MovableComponent } from '../component/movable.component';
import { ComponentType, InputType } from '../constants/GameConstants';

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
