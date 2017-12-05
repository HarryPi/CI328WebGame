import {Component} from './component';
import {Action, ComponentType, TankLayout} from '../constants/GameConstants';
import {TankUtil} from '../UI/tank.util';
import {CollisionsComponent, PhysicsComponent} from './collision.components';
import {Entity} from '../entities/entity';


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

export class LayerComponent extends Component {
  constructor() {
    super(ComponentType.LAYER);
  }

  public addLayer(cachedName: string): LayerComponent {
    if (cachedName) {
      this.target.sprite.frameName = cachedName;
    }
    return this;
  }
  public addAnimation(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean ) {
    this.target.sprite.animations.add(name, frames, frameRate, loop, useNumericIndex);
  }
  public getAnimation(name: string): Phaser.Animation {
    return this.target.sprite.animations.getAnimation(name);
  }
  public playAnimation(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Promise<void> {
    return new Promise(((resolve, reject) => {
      this.target.sprite.animations.play(name, frameRate, loop).onComplete.add( () => {
        resolve();
      });
    }));
  }
}

export class TankComponent extends Component {

  private _bulletSpeed: number;
  private _bulletKind: TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO;
  private _speed: number;

  private _tankKind: TankLayout.CANDY_RECON
    | TankLayout.CANDY_ARTILLERY
    | TankLayout.CANDY_FORTRESS
    | TankLayout.CANDY_HUNTER
    | TankLayout.CANDY_LIGHT
    | TankLayout.DARK_ARTILLERY
    | TankLayout.DARK_FORTRESS
    | TankLayout.DARK_HUNTER
    | TankLayout.DARK_LIGHT
    | TankLayout.DARK_RECON
    | TankLayout.GREEN_ARTILERY
    | TankLayout.GREEN_HUNTER
    | TankLayout.GREEN_LIGHT
    | TankLayout.GREEN_RECON
    | TankLayout.GREEN_FORTRESS
    | TankLayout.GREY_ARTILERY
    | TankLayout.GREY_FORTRESS
    | TankLayout.GREY_HUNTER
    | TankLayout.GREY_LIGHT
    | TankLayout.GREY_RECON;

  constructor(tankKind) {
    super(ComponentType.TANK);
    this._tankKind = tankKind;
  }


  get bulletSpeed(): number {
    if (TankUtil.isLightTank(this._tankKind)) {
      return 700;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return 1000;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return 850;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return 1200;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return 800;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET SPEED');
    }
  }

  get bulletKind(): TankLayout.BULLET_FIVE | TankLayout.BULLET_FOUR | TankLayout.BULLET_ONE | TankLayout.BULLET_SIX | TankLayout.BULLET_THREE | TankLayout.BULLET_TWO {

    if (TankUtil.isLightTank(this._tankKind)) {
      return TankLayout.BULLET_ONE;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return TankLayout.BULLET_THREE;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return TankLayout.BULLET_SIX;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return TankLayout.BULLET_FOUR;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return TankLayout.BULLET_FIVE;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET KIND');
    }
  }

  get speed(): number {
    if (TankUtil.isLightTank(this._tankKind)) {
      return 400;
    } else if (TankUtil.isHunterTank(this._tankKind)) {
      return 400;
    } else if (TankUtil.isFortressTank(this._tankKind)) {
      return 300;
    } else if (TankUtil.isArtilleryTank(this._tankKind)) {
      return 400;
    } else if (TankUtil.isReconTank(this._tankKind)) {
      return 500;
    } else {
      throw new Error('NO TANK FOUND TO SET BULLET KIND');
    }
  }
}
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
