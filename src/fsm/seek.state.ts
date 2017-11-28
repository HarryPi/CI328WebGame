import { State } from './state';
import { MovableComponent } from '../component/movable.component';
import { ComponentType, InputType } from '../constants/GameConstants';

export class SeekState extends State {

  enter(): void {
    console.log('Seek state entering');
    this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.LEFT_INPUT;
  }

  leave(): void {
    console.log('Seek state leaving');
    this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction = InputType.STOP;
  }

  update(): void {
    console.log('updating...' + this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).direction);
    this._entity.getComponent<MovableComponent>(ComponentType.MOVABLE).update();
  }

}
