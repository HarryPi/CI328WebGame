import {State} from './state';
import {Entity} from '../entities/entity';
import {FSMStates} from '../constants/GameConstants';

export class IdleState extends State {

  enter(): void {
    console.log('Idle state enter function');
  }

  leave(): void {
    console.log('Idle state leave function');
  }

  update(): void {
    this._entity.fsm.enter(FSMStates.HUNTING);
  }

}
