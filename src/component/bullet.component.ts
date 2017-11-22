import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';

export class BulletComponent extends Component{
  private _game: Phaser.Game;
  constructor(game: Phaser.Game) {
    super(ComponentType.BULLET);
    this._game = game;
  }
  bulletInit(){
    let speed;
    let angle = this.target.owner.sprite.angle;
    this.target.sprite.rotation = angle + this.degToRad(90);
    this.target.sprite.body.velocity.x = Math.cos(angle) * 1500;
    this.target.sprite.body.velocity.y = Math.sin(angle) * 1500;

  }

  private degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }
}
