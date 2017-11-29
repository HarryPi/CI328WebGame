import {Component} from './component';
import {ComponentType, FSMStates} from '../constants/GameConstants';
import {Entity} from '../entities/entity';
import {StateComponent} from './state.component';
import {MathUtil} from '../util/math.util';

export class AiComponent extends Component {
  private _player: Entity;

  constructor(player: Entity) {
    super(ComponentType.AI);
    this._requiredComponents = [ComponentType.MOVABLE, ComponentType.PHYSICS, ComponentType.SHOOT];
    this._player = player;
  }

  update() {
    this.decide();
  }

  private decide() {
    let distance: number = MathUtil.normalize(this._player.sprite.x - this.target.sprite.x);
    // Justify this in the report say tanks can only spawn on the right of the player
    let sComp = this._target.getComponent<StateComponent>(ComponentType.STATE);
    if (sComp) {
      if (distance <= -0.15) {
        sComp.setState(FSMStates.SEEK);
      } else {
        sComp.setState(FSMStates.FIRING);
      }
    }
  }

  get player(): Entity {
    return this._player;
  }

}