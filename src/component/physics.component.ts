import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';
import Vector from '../util/vector';

export class PhysicsComponent extends Component {
  private _game: Phaser.Game;

  constructor(game: Phaser.Game) {
    super(ComponentType.PHYSICS);
    this._game = game;
  }

  public addPhysics(gravity: boolean = true): PhysicsComponent {
    debugger;
    this._game.physics.p2.enable(this.target.sprite);
    gravity ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;

    return this;
  }

  public setAngle(angle: number): PhysicsComponent {
    this.target.sprite.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;
    this.target.sprite.body.angle = angle;
    return this;
  }

  public delayGravity(bool: boolean, delay: number = 2000) {
    this.target.sprite.body.enableGravity = false;
    if (bool) {
      setInterval(() => {
        this.target.sprite.body.enableGravity = true;
      }, delay);
    }
  }

  public stopSprite() {
    this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
    this.target.sprite.body.restitution = 0.0;
    this.target.sprite.body.velocity.x = 0;
    this.target.sprite.body.velocity.y = 0;
    this.target.sprite.body.allowGravity = false;
    this.target.sprite.body.angularDumping = 1;
  }
}

