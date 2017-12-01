import { Component } from './component';
import { ComponentType, InputType } from '../constants/GameConstants';
import {TankComponent} from './tank.component';

export class MovableComponent extends Component {

  private _speed: number = 300;
  private _direction: InputType;
  private _isMoving: boolean = false;

  constructor() {
    super(ComponentType.MOVABLE);
  }

  private _correctRotation() {
    if (this.target.sprite.body.velocity.x > 0 && this.target.sprite.body.velocity.y < 0) {
      this.target.sprite.body.angle = Math.atan2(this.target.sprite.body.velocity.y, this.target.sprite.body.velocity.x) * 180 / Math.PI;
    }
    if (this.target.sprite.body.velocity.x < 0 && this.target.sprite.body.velocity.y < 0) {
      this.target.sprite.body.angle = Math.atan2(-this.target.sprite.body.velocity.y, -this.target.sprite.body.velocity.x) * 180 / Math.PI;
    }
  }

  private moveRight(): void {
    this.target.sprite.body.moveRight(this.target.getComponent<TankComponent>(ComponentType.TANK).speed);
  }
  private moveLeft(): void {
    this.target.sprite.body.moveLeft(this.target.getComponent<TankComponent>(ComponentType.TANK).speed);
  }
  public update(){
    switch (this._direction) {
      case InputType.LEFT_INPUT:
        this.moveLeft();
        this._correctRotation();
        this._direction = InputType.STOP;
        break;
      case InputType.RIGHT_INPUT:
        this.moveRight();
        this._correctRotation();
        this._direction = InputType.STOP;
        break;
      default:
        break;
    }
  }

  get direction(): InputType {
    return this._direction;
  }

  set direction(value: InputType) {
    this._direction = value;
  }
}
