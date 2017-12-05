import {State} from './state';
import {ComponentType} from '../../constants/GameConstants';
import {ShootComponent} from '../../component/event.components';

export class FiringState extends State {
  enter(): void {
    this._entity.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = true;
  }

  leave(): void {
    this._entity.getComponent<ShootComponent>(ComponentType.SHOOT).canShoot = false;
  }

  update(): void {
  }

}
