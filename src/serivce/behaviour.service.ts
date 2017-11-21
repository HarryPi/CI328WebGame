import { Entity } from '../entities/entity';
import { ComponentType, Direction } from '../constants/GameConstants';
import { MovableComponent } from '../component/movable.component';

export default class BehaviourService {
  public static moveEntity(entity: Entity, direction: Direction) {
    let mComponent = entity.getComponent<MovableComponent>(ComponentType.MOVABLE);
    if (mComponent) {
      mComponent.move(direction);
    }
  }
}
