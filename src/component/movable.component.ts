import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';

export class MovableComponent extends Component {

  private _speed: number = 100;
  private _isMoving: boolean = false;

  constructor() {
    super(ComponentType.MOVABLE);
  }

  public moveRight(): void {
  }
  public moveLeft(): void {

  }
  public stop(): void {

  }
  update(){

  }
}
