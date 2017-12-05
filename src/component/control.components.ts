import { Component } from './component';
import { ComponentType, FSMStates, InputType } from '../constants/GameConstants';
import {OwnerComponent, TankComponent} from './data.components';
import { DataConfig } from '../config/data.config';
import { Entity } from '../entities/entity';
import { MathUtil } from '../util/math.util';
import {StateComponent} from './event.components';

export class BulletComponent extends Component {
  private _game: Phaser.Game;

  // todo: Should this be on the PhysicsComponent?
  constructor(game: Phaser.Game) {
    super(ComponentType.BULLET);
    this._game = game;
    this._requiredComponents.push(ComponentType.OWNER);
    this._requiredComponents.push(ComponentType.LAYER);
  }

  /**
   * @description
   * This is to be called if a bullet is not a 'normal' bullet instead is a random disaster bullet
   * */
  disasterBullet() {
    this.target.sprite.angle = 90;
    this.target.sprite.body.velocity.y = 2000;
  }

  /**
   * @description
   * Initiates a normal bullet tank bullet and ensures it will reach the target
   * If this is an AI the target passed at the AI else at the mouse pointer of the player
   * */
  bulletInit() {
    let cOwner = this.target.getComponent<OwnerComponent>(ComponentType.OWNER);
    // Not a bullet?
    if (!cOwner) {
      return;
    }

    let seekObject = {
      x: this._game.input.activePointer.x + this._game.camera.x,
      y: this._game.input.activePointer.y
    };

    // Check if there is an AIComponent if yes this is not our player
    let aiComponent = cOwner ? cOwner.owner.getComponent<AiComponent>(ComponentType.AI) : null;
    if (aiComponent) {
      // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
      seekObject.x = aiComponent.player.sprite.x;
      seekObject.y = aiComponent.player.sprite.y;
    }
    this.accelerateToObject(this.target.sprite, seekObject,
      aiComponent
        ? cOwner.owner.getComponent<TankComponent>(ComponentType.TANK).bulletSpeed
        : Math.abs(cOwner.owner.getComponent<TankComponent>(ComponentType.TANK).bulletSpeed));
  }

  private accelerateToObject(obj1, obj2, velocity = 500) {
    const angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);


    /*
        let angle = -45;
        velocity = (obj2.x) - obj1.x  + velocity;*/

    let aiComponent = this.target.getComponent<OwnerComponent>(ComponentType.OWNER)
      .owner.getComponent<AiComponent>(ComponentType.AI);

    aiComponent
      ? obj1.body.velocity.x = calculateVelocityX(true, velocity, angle)
      : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
    aiComponent
      ? obj1.body.velocity.y = calculateVelocityY(true, velocity, angle)
      : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);

    function calculateVelocityX(isAi: boolean = true, tankSpeed: number, angle: number): number {
      const aiVelocityXCorrectionVal = 200;

      if (isAi) {
        return Math.cos(angle - Math.PI / 180) * tankSpeed - (aiVelocityXCorrectionVal * DataConfig.difficulty);
      }
      return Math.abs(Math.cos(angle - Math.PI / 180) * tankSpeed);
    }
    function calculateVelocityY(isAi: boolean = true, tankSpeed: number, angle: number): number {
      const velocityYCorrectionValue = 100;
      const antiGravityValue = 700;

      if (isAi) {
        return Math.sin(angle - Math.PI / 180) * velocity - antiGravityValue;
      }
      return (Math.sin(angle - Math.PI / 180) * velocity) - (velocityYCorrectionValue * DataConfig.difficulty);
    }
  }

}


export class AiComponent extends Component {
  private _player: Entity;

  constructor(player: Entity) {
    super(ComponentType.AI);
    this._requiredComponents = [ComponentType.MOVABLE, ComponentType.PHYSICS, ComponentType.SHOOT];
    this._player = player;
  }

  update() {
    this.decide();
  }

  private decide() {
    let distance: number = MathUtil.normalize(this._player.sprite.x - this.target.sprite.x);
    // Justify this in the report say tanks can only spawn on the right of the player
    let sComp = this._target.getComponent<StateComponent>(ComponentType.STATE);
    let tankComp = this._target.getComponent<TankComponent>(ComponentType.TANK);
    if (sComp) {
      // Here we are adding some random params to simulate a more realistic behaviour
      if (Math.abs(distance) >= 0.15 + MathUtil.randomIntFromInterval(0.05, 0.06)) {
        sComp.setState(FSMStates.SEEK);
      } else if (Math.abs(distance) <= 0.08 + MathUtil.randomIntFromInterval(0.02, 0.03)) {
        sComp.setState(FSMStates.FLEEING);
      }
      else {
        sComp.setState(FSMStates.FIRING);
      }
    }
  }

  get player(): Entity {
    return this._player;
  }

}
export class CameraComponent extends Component{
  private _game: Phaser.Game;

  constructor(game: Phaser.Game) {
    super(ComponentType.CAMERA);
    this._game = game;
  }
  setFocus(entity: Phaser.Sprite) {
    this._game.camera.follow(entity);
  }
}
