import { Component } from './component';
import { ComponentType, InputType } from '../constants/GameConstants';

export class MovableComponent extends Component {

  private _speed: number = 100;
  private _isMoving: boolean = false;

  constructor() {
    super(ComponentType.MOVABLE);
  }

  public moveRight(): void {
    console.log('Moving right...');
  }
  public moveLeft(): void {
    console.log('Moving left...');
  }
  public stop(): void {

  }
  update(){

  }
  move(input: InputType){
    switch (input) {
      case InputType.LEFT_INPUT:
        this.moveLeft();
        break;
      case InputType.RIGHT_INPUT:
        this.moveRight();
        break;
      default:
        console.log('No Input');
        break;
    }
  }
}
