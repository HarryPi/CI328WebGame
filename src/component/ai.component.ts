import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';
import {Entity} from '../entities/entity';
import Print from '../util/print';

export class AiComponent extends Component {
  private _player: Entity;

  constructor(player: Entity) {
    super(ComponentType.AI);
    this._requiredComponents = [ComponentType.MOVABLE, ComponentType.PHYSICS, ComponentType.SHOOT];
    this._player = player;
  }

  update() {
    this.steer();
  }

  private steer() {
    let position: number = this.target.sprite.x + this.target.sprite.body.velocity.x;
    let velocity: number = this.normalize(this._player.sprite.x - this.target.sprite.x);

    Print.log(`position is ${position}`, `velocity is: ${velocity}`);
  }

  private normalize(val, max = 4941, min = -46) {
    return (val - min) / (max - min);
  }
}
