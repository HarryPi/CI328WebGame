import { Component } from './component';
import { ComponentType, Direction } from '../constants/GameConstants';
import Print from '../util/print';

export class MovableComponent extends Component {

  private _speed: number = 180;
  private _direction: Direction;
  private _isMoving: boolean = false;

  constructor() {
    super(ComponentType.MOVABLE);
  }

  private round(angleToRound){
    let arr = [];
    arr.push(Math.ceil(angleToRound));
    arr.push(Math.floor(angleToRound));

    return arr;
  }

  private moveRight(): void {
    this.target.sprite.body.velocity.x = this._speed;
  }
  private moveLeft(): void {
    this.target.sprite.body.velocity.x = -this._speed;
  }
  public stop(): void {
    this.target.sprite.body.velocity.x = 0;
  }
  public move(input: Direction){
    switch (input) {
      case Direction.LEFT_INPUT:
        this.moveLeft();
        this._direction = Direction.LEFT_INPUT;
        break;
      case Direction.RIGHT_INPUT:
        this.moveRight();
        this._direction = Direction.RIGHT_INPUT;
        break;
      default:
        console.log('No Input');
        break;
    }
  }
  public update(){
    let tankAngle = this.target.sprite.body.angle;
    let worldPos = this.target.sprite.body.world.x;
    Print.log('Sprite Location x:', this.round(this.target.sprite.world.x), 'y:', this.round(this.target.sprite.world.x));
    Print.log(this._direction);
    if (this._direction === Direction.RIGHT_INPUT && Math.ceil(worldPos) >= 396){
      debugger;
      console.log('funcking hell');
      this.target.sprite.body.angle = 45;
    } else if (this._direction === Direction.RIGHT_INPUT && this.round(worldPos).some((value) => {
      console.log('WTF');
        return value > 750;
      })) {
      this.target.sprite.body.angle = 0;
    }
  }
}
