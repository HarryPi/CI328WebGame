
import {State} from './state';

export class IdleState extends State {

  enter(): void {
    console.log('Idle state enter function');
  }

  leave(): void {
    console.log('Idle state leave function');
  }

  update(): void {
  }

}
