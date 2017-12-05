import {ComponentType, FSMStates, InputType} from '../constants/GameConstants';
import TankWorldFactory from '../TankWorldFactory';
import {Component} from './component';
import {State} from '../AI/fsm/state';
import StateMachine from '../AI/fsm/stateMachine';
import {TankComponent} from './data.components';

export class ShootComponent extends Component{
  private _canShoot: boolean = false;
  private _factory: TankWorldFactory;
  private _timer = 0;

  constructor(game: Phaser.Game, factory: TankWorldFactory){
    super(ComponentType.SHOOT);
    this._factory = factory;
  }

  update(){
    if (this._canShoot) {
      this._canShoot = false;
      if (Date.now() - this._timer > 1500) {
        this.shootBullet();
      }
    }
  }
  set canShoot(value: boolean) {
    this._canShoot = value;
  }

  private shootBullet(){
    this._factory.newBullet(this.target.sprite.x + 50 , this.target.sprite.y - 20, this.target);
    this._timer = Date.now();
  }
}
export class StateComponent extends Component{
  private _fsm: StateMachine;
  constructor(){
    super(ComponentType.STATE);
    this._fsm = new StateMachine();
  }
  public addState(name: FSMStates, state: State): StateComponent {
    this._fsm.add(name, state);
    state.entity = this.target;
    return this;
  }
  public setState(name: FSMStates): StateComponent {
    this._fsm.enter(name);
    return this;
  }
  public get currentState(): State {
    return this._fsm.current;
  }
  update(): void {
    this._fsm.update();
  }
}
export class MovableComponent extends Component {

  private _speed: number;
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
