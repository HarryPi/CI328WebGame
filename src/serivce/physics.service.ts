import {Entity} from '../entities/entity';
import {PhysicsComponent} from '../component/physics.component';
import {ComponentType} from '../constants/GameConstants';

export default class PhysicsService {
  public static enablePhysics(entity: Entity){
    let pComponent = entity.getComponent<PhysicsComponent>(ComponentType.PHYSICS);
    if (pComponent) {
      pComponent.addPhysics();
    }
  }
}
