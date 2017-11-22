import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';
import Vector from '../util/vector';

export class PhysicsComponent extends Component {
  private _game: Phaser.Game;

  constructor(game: Phaser.Game){
    super(ComponentType.PHYSICS);
    this._game = game;
  }
  public addPhysics(): PhysicsComponent {
    this._game.physics.p2.enable(this.target.sprite);
    this.target.sprite.body.angularDamping = 0.7;
    console.log(this.target.sprite);
    return this;
  }

  public setVelocity(vec: Vector): PhysicsComponent {
      this.target.sprite.body.velocity.x = vec.x;
      this.target.sprite.body.velocity.y = vec.y;
      return this;
  }
  public setAngle(angle: number): PhysicsComponent {
    this.target.sprite.body.angle = angle;
    return this;
  }
  public delayGravity(bool: boolean, delay: number = 1000){
    this.target.sprite.body.enableGravity = false;
    if (bool) {
      setInterval(() => {
        this.target.sprite.body.enableGravity = true;
      }, delay);
    }
  }
}
