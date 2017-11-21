import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';
import Vector from '../util/vector';

export class PhysicsComponent extends Component {
  private _game: Phaser.Game;

  constructor(game: Phaser.Game){
    super(ComponentType.PHYSICS);
    this._game = game;
  }
  public addPhysics(gravity: number = 1, anchor: Vector = new Vector(0.5, 0.5)): PhysicsComponent {
    this._game.physics.p2.enable(this.target.sprite);
    this.target.sprite.anchor.setTo(anchor.x, anchor.y);
    this.target.sprite.body.data.gravityScale = gravity;
    this.target.sprite.body.angularDamping = 0.7;
    console.log(this.target.sprite);
    return this;
  }

  public setVelocity(vec: Vector): PhysicsComponent {
      this.target.sprite.body.velocity.x = vec.x;
      this.target.sprite.body.velocity.y = vec.y;

      return this;
  }
}
