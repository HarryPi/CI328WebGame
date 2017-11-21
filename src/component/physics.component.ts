import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';

export class PhysicsComponent extends Component {
  private _game: Phaser.Game;

  constructor(game: Phaser.Game){
    super(ComponentType.PHYSICS);
    this._game = game;
  }
  public addPhysics(){
    this._game.physics.p2.enable(this.target.sprite);
    this.target.sprite.body.allowGravity = true;
    this.target.sprite.body.angularDamping = 0.7;
  }
}
