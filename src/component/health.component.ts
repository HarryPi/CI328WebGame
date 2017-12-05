import { Component } from './component';
import {Action, ComponentType} from '../constants/GameConstants';
import {LayerComponent} from './layer.component';
import {PhysicsComponent} from './physics.component';
import {CollisionsComponent} from './collisions.component';

export class HealthComponent extends Component{
  constructor(){
    super(ComponentType.HEALTH);
    this._requiredComponents.push(ComponentType.LAYER);
    this._requiredComponents.push(ComponentType.PHYSICS);
  }
  /**
   * @description
   * Deals damage to target returns true if target is still alive after damage
   *
   * */
  public dealDamage(damage: number) {

    // Check if the damage will kill the entity
    if (this.target.sprite.health - damage <= 0) {
      this.target.getComponent<CollisionsComponent>(ComponentType.COLLISION).cleanCollisions();
      this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS).stopSprite();
      this.target.getComponent<LayerComponent>(ComponentType.LAYER).playAnimation(Action.EXPLODE, null, null, true).then(() => {
        this.target.destroy();
      });
    } else {
      console.log(this.target.sprite.health);
      this.target.sprite.damage(damage);
    }
  }

  public setHealth(health: number) {
    this.target.sprite.health = health;
  }
}
