import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';
import CollisionGroup = Phaser.Physics.P2.CollisionGroup;

export class CollisionsComponent extends Component {
  constructor() {
    super(ComponentType.COLLISION);
  }
  public  enableCollision(collisionGroup: CollisionGroup, collidesWith: Array<CollisionGroup>){
        this.target.sprite.body.setCollisionGroup(collisionGroup);
        this.target.sprite.body.collides(collidesWith);
  }
}
