import {Component} from './component';
import {ComponentType, FSMStates} from '../constants/GameConstants';
import {Entity} from '../entities/entity';
import {StateComponent} from './state.component';

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
    let distance: number = this.normalize(this._player.sprite.x - this.target.sprite.x);
    // Justify this in the report say tanks can only spawn on the right of the player
    let sComp = this._target.getComponent<StateComponent>(ComponentType.STATE);
    console.log(sComp);
    console.log('At AI Component');
    if (sComp) {
      if (distance <= -0.15) {
        console.log('Setting to seek');
        sComp.setState(FSMStates.SEEK);
      }
      else {
        console.log('Setting to fire');
        sComp.setState(FSMStates.FIRING);
      }
    }
  }

  private normalize(val, max = 4941, min = -46) {
    return (val - min) / (max - min);
  }
}
