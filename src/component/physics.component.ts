import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';
import Vector from '../util/vector';

export class PhysicsComponent extends Component {
  private _game: Phaser.Game;

  constructor(game: Phaser.Game) {
    super(ComponentType.PHYSICS);
    this._game = game;
  }

  public addPhysics(drag: boolean = true): PhysicsComponent {
    this._game.physics.p2.enable(this.target.sprite);
    this.target.sprite.anchor.setTo(0.5, 0.5);
    drag ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;

    return this;
  }


  public flipSprite(): PhysicsComponent{
    this.target.sprite.scale.x = -1;
    return this;
  }
  public stopSprite() {
    this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
    this.target.sprite.body.restitution = 0.0;
    this.target.sprite.body.velocity.x = 0;
    this.target.sprite.body.velocity.y = 0;
    this.target.sprite.body.allowGravity = false;
    this.target.sprite.body.data.gravityScale = 0;
    this.target.sprite.body.angularDumping = 1;
  }
}

