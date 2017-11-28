import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';
import {Entity} from '../entities/entity';

export class OwnerComponent extends Component{
  private _owner: Entity;
  constructor(){
    super(ComponentType.OWNER);
  }
  set owner(owner: Entity){
    this._owner = owner;
  }
  get owner(): Entity {
    return this._owner;
  }
}
