import { Component } from './component';
import { Action, ComponentType, TankLayout } from '../constants/GameConstants';
import {PhysicsComponent} from './physics.component';

export class CollisionsComponent extends Component {
  private _ignoreCollision: boolean = true;

  constructor() {
    super(ComponentType.COLLISION);
    this._requiredComponents = [ComponentType.PHYSICS];
  }

  public enableCollision(actions: Array<Action>, collisionGroups?: Array<Phaser.Group>){
    this.target.sprite.body.onBeginContact.add( (contactWith, contactWith1, thisBody, shape, eqArr) => {
      if (this._ignoreCollision) {
        this._ignoreCollision = false;
        return;
      }
     this.triggerCollisionAction(actions, eqArr, collisionGroups);
    });
  }
  private triggerCollisionAction(actions: Array<Action>, eqArr: Array<Object>, collisionGroups?: Array<Phaser.Group>){
    actions.forEach( (action) => {
      switch (action) {
        case Action.EXPLODE:
          this.target.sprite.animations.add(action.toString(), Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
          this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS).stopSprite(this.target.sprite);
          this.target.sprite.animations.play(action.toString()).onComplete.add(() => {
            this.target.sprite.kill();
          });
          break;
        default:
          break;
      }
    });
  }

}
