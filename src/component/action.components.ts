import { ComponentType, CrateName, InputType, Sounds, TankLayout } from '../constants/GameConstants';
import TankWorldFactory from '../TankWorldFactory';
import { Component } from './component';
import { DataComponents } from './data.components';

import TankComponent = DataComponents.TankComponent;
import { CollisionComponents } from './collision.components';
import { UiManagers } from '../UI/uimanagers';
import { Entity } from '../entities/entity';

export namespace ActionComponents {

  import PhysicsComponent = CollisionComponents.PhysicsComponent;
  import HealthComponent = DataComponents.HealthComponent;
  import PlayerVisualsManager = UiManagers.PlayerVisualsManager;

  export class ShootComponent extends Component {
    private _canShoot: boolean = false;
    private _factory: TankWorldFactory;
    private _timer = 0;

    constructor(factory: TankWorldFactory) {
      super(ComponentType.SHOOT);
      this._factory = factory;
    }

    update() {
      if (this._canShoot) {
        this._canShoot = false;
        if (Date.now() - this._timer > 1500) {
          this.shootBullet();
        }
      }
    }

    set canShoot(value: boolean) {
      this._canShoot = value;
    }

    private shootBullet() {
      this._factory.newBullet(this.target.sprite.x + 50, this.target.sprite.y - 20, this.target);
      this._timer = Date.now();
    }

    public get rangeOfProjectile(): number {
      const tankComponent: TankComponent = this.target.getComponent<TankComponent>(ComponentType.TANK);
      const physicsComponent: PhysicsComponent = this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS);

      const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
      const rangeOfProjectile: number = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity;

      return rangeOfProjectile;

    }
  }

  export class MovableComponent extends Component {

    private _direction: InputType;

    constructor() {
      super(ComponentType.MOVABLE);
    }

    private _correctRotation() {
      if (this.target.sprite.body.velocity.x > 0 && this.target.sprite.body.velocity.y < 0) {
        this.target.sprite.body.angle = Math.atan2(this.target.sprite.body.velocity.y, this.target.sprite.body.velocity.x) * 180 / Math.PI;
      }
      if (this.target.sprite.body.velocity.x < 0 && this.target.sprite.body.velocity.y < 0) {
        this.target.sprite.body.angle = Math.atan2(-this.target.sprite.body.velocity.y, -this.target.sprite.body.velocity.x) * 180 / Math.PI;
      }
    }

    private moveRight(): void {
      this.target.sprite.body.moveRight(this.target.getComponent<TankComponent>(ComponentType.TANK).speed);
    }

    private moveLeft(): void {
      this.target.sprite.body.moveLeft(this.target.getComponent<TankComponent>(ComponentType.TANK).speed);
    }

    public update() {

      switch (this._direction) {
        case InputType.LEFT_INPUT:
          this.moveLeft();
          this._correctRotation();
          this._direction = InputType.STOP;
          break;
        case InputType.RIGHT_INPUT:
          this.moveRight();
          this._correctRotation();
          this._direction = InputType.STOP;
          break;
        default:
          break;
      }
    }

    get direction(): InputType {
      return this._direction;
    }

    set direction(value: InputType) {
      this._direction = value;
    }
  }

  export class PowerUpComponent extends Component {

    private _currentCrate: TankLayout.CRATE_REPAIR;
    private _tank: Entity;
    private _state: Phaser.State;

    constructor(state: Phaser.State, tank: Entity) {
      super(ComponentType.POWER_UP);
      this._tank = tank;
      this._state = state;
    }

    update() {
      const healthComponent = this.target.getComponent<HealthComponent>(ComponentType.HEALTH);

      if (this._currentCrate === TankLayout.CRATE_REPAIR) {
        healthComponent.restoreHealth();
        this._currentCrate = null;
      }
    }

    public loadCrate(kindOfCrate: TankLayout.CRATE_REPAIR) {
      this._currentCrate = kindOfCrate;

      if (kindOfCrate === TankLayout.CRATE_REPAIR) {
        let playerUIManager = new PlayerVisualsManager(this._state);
        playerUIManager.addPowerUpIcon(TankLayout.CRATE_REPAIR);
      }
    }
  }
}

