import { Component } from './component';
import { Action, ComponentType, Difficulty, TankLayout } from '../constants/GameConstants';
import { TankUtil } from '../UI/tank.util';
import { Entity } from '../entities/entity';
import { CollisionComponents } from './collision.components';
import PhysicsComponent = CollisionComponents.PhysicsComponent;
import CollisionsComponent = CollisionComponents.CollisionsComponent;
import { DataConfig } from '../config/data.config';
import {UiManagers} from '../UI/uimanagers';

export namespace DataComponents {

  import Timer = NodeJS.Timer;

  export class HealthComponent extends Component {
    private _maxHealth: number;
    private _healingTimeout: Timer;
    private _game: Phaser.Game;
    private _state: Phaser.State;

    constructor(game: Phaser.Game, state: Phaser.State) {
      super(ComponentType.HEALTH);
      this._requiredComponents.push(ComponentType.LAYER);
      this._requiredComponents.push(ComponentType.PHYSICS);
      this._game = game;
      this._state = state;
    }

    /**
     * @description
     * Deals damage to target returns true if target is still alive after damage
     *
     */
    public dealDamage(damage: number) {

      // Check if the damage will kill the entity
      if (this.target.sprite.health - damage <= 0) {
        this.target.getComponent<CollisionsComponent>(ComponentType.COLLISION).cleanCollisions();
        this.target.getComponent<PhysicsComponent>(ComponentType.PHYSICS).stopSprite();
        this.target.getComponent<LayerComponent>(ComponentType.LAYER).playAnimation(Action.EXPLODE, null, null, true).then(() => {
          this.target.destroy();
        });
      } else {
        this.target.sprite.damage(damage);
      }
    }

    public pendingHeal(): boolean {
      return !!this._healingTimeout;
    }
    public restoreHealth(): void {
      const playerUi = new UiManagers.PlayerVisualsManager(this._state);
      playerUi.addPowerUpIcon(TankLayout.CRATE_REPAIR);

      const healingDone = () => {
        if (DataConfig.difficulty === Difficulty.EASY || DataConfig.difficulty === Difficulty.NORMAL) {
          return 4;
        } else if (DataConfig.difficulty === Difficulty.HARD) {
          return 2;
        } else if (DataConfig.difficulty === Difficulty.INSANE) {
          return 1;
        } else {
          return 1;
        }
      };

      let heal = () => {
        let toRestore = healingDone();

        if (this.getCurrentHealth() + toRestore > this._maxHealth) {
          toRestore = this._maxHealth - this.getCurrentHealth();
        }
        playerUi.addHeartByHealingReceived(toRestore);
        playerUi.removePowerUpIcon(TankLayout.CRATE_REPAIR);
        this.target.sprite.heal(toRestore);
        clearTimeout(this._healingTimeout);
        this._healingTimeout = null;
      };
      this._healingTimeout = setTimeout(heal, 5000);
    }

    public setHealth(health: number) {
      this.target.sprite.health = health;
      this._maxHealth = health;
    }

    public getCurrentHealth(): number {
      return this.target.sprite.health;
    }

    public getMaxHealth(): number {
      return this._maxHealth;
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

    public addAnimation(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean) {
      this.target.sprite.animations.add(name, frames, frameRate, loop, useNumericIndex);
    }

    public getAnimation(name: string): Phaser.Animation {
      return this.target.sprite.animations.getAnimation(name);
    }

    public getCurrentAnimation(): Phaser.Animation {
      return this.target.sprite.animations.currentAnim;
    }

    public playAnimation(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Promise<void> {
      return new Promise(((resolve, reject) => {
        this.target.sprite.animations.play(name, frameRate, loop).onComplete.add(() => {
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
      | TankLayout.GREEN_ARTILLERY
      | TankLayout.GREEN_HUNTER
      | TankLayout.GREEN_LIGHT
      | TankLayout.GREEN_RECON
      | TankLayout.GREEN_FORTRESS
      | TankLayout.GREY_ARTILLERY
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

    get bulletDmg(): number {
      const bulletKind = this.bulletKind;
      if (bulletKind === TankLayout.BULLET_ONE) {
        return 1;
      } else if (bulletKind === TankLayout.BULLET_TWO) {
        return 1;
      } else if (bulletKind === TankLayout.BULLET_THREE) {
        return 1;
      } else if (bulletKind === TankLayout.BULLET_FOUR) {
        return 2;
      } else if (bulletKind === TankLayout.BULLET_FIVE) {
        return 2;
      } else if (bulletKind === TankLayout.BULLET_SIX) {
        return 2;
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

    get tankKindName(): string {
      if (TankUtil.isFortressTank(this.tankKind)) {
        return 'Fortress Tank';
      }
      if (TankUtil.isArtilleryTank(this.tankKind)) {
        return 'Artillery Tank';
      }
      if (TankUtil.isHunterTank(this.tankKind)) {
        return 'Hunter Tank';
      }
      if (TankUtil.isLightTank(this.tankKind)) {
        return 'Light Tank';
      }
      if (TankUtil.isReconTank(this.tankKind)) {
        return 'Recon Tank';
      }
    }

    get angle(): number {
      return 180;
    }

    get tankKind(): TankLayout.CANDY_RECON
      | TankLayout.CANDY_ARTILLERY
      | TankLayout.CANDY_FORTRESS
      | TankLayout.CANDY_HUNTER
      | TankLayout.CANDY_LIGHT
      | TankLayout.DARK_ARTILLERY
      | TankLayout.DARK_FORTRESS
      | TankLayout.DARK_HUNTER
      | TankLayout.DARK_LIGHT
      | TankLayout.DARK_RECON
      | TankLayout.GREEN_ARTILLERY
      | TankLayout.GREEN_HUNTER
      | TankLayout.GREEN_LIGHT
      | TankLayout.GREEN_RECON
      | TankLayout.GREEN_FORTRESS
      | TankLayout.GREY_ARTILLERY
      | TankLayout.GREY_FORTRESS
      | TankLayout.GREY_HUNTER
      | TankLayout.GREY_LIGHT
      | TankLayout.GREY_RECON {
      return this._tankKind;
    }

    set tankKind(value: TankLayout.CANDY_RECON
      | TankLayout.CANDY_ARTILLERY
      | TankLayout.CANDY_FORTRESS
      | TankLayout.CANDY_HUNTER
      | TankLayout.CANDY_LIGHT
      | TankLayout.DARK_ARTILLERY
      | TankLayout.DARK_FORTRESS
      | TankLayout.DARK_HUNTER
      | TankLayout.DARK_LIGHT
      | TankLayout.DARK_RECON
      | TankLayout.GREEN_ARTILLERY
      | TankLayout.GREEN_HUNTER
      | TankLayout.GREEN_LIGHT
      | TankLayout.GREEN_RECON
      | TankLayout.GREEN_FORTRESS
      | TankLayout.GREY_ARTILLERY
      | TankLayout.GREY_FORTRESS
      | TankLayout.GREY_HUNTER
      | TankLayout.GREY_LIGHT
      | TankLayout.GREY_RECON) {

      this._tankKind = value;

    }

  }

  export class OwnerComponent extends Component {
    private _owner: Entity;

    constructor() {
      super(ComponentType.OWNER);
    }

    set owner(owner: Entity) {
      this._owner = owner;
    }

    get owner(): Entity {
      return this._owner;
    }

  }
}

