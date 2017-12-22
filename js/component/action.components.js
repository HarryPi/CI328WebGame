"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
const uimanagers_1 = require("../UI/uimanagers");
var ActionComponents;
(function (ActionComponents) {
    var PlayerVisualsManager = uimanagers_1.UiManagers.PlayerVisualsManager;
    class ShootComponent extends component_1.Component {
        constructor(factory) {
            super(GameConstants_1.ComponentType.SHOOT);
            this._canShoot = false;
            this._timer = 0;
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
        set canShoot(value) {
            this._canShoot = value;
        }
        shootBullet() {
            this._factory.newBullet(this.target.sprite.x + 50, this.target.sprite.y - 20, this.target);
            this._timer = Date.now();
        }
        get rangeOfProjectile() {
            const tankComponent = this.target.getComponent(GameConstants_1.ComponentType.TANK);
            const physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
            const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
            const rangeOfProjectile = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity;
            return rangeOfProjectile;
        }
    }
    ActionComponents.ShootComponent = ShootComponent;
    class MovableComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.MOVABLE);
        }
        _correctRotation() {
            if (this.target.sprite.body.velocity.x > 0 && this.target.sprite.body.velocity.y < 0) {
                this.target.sprite.body.angle = Math.atan2(this.target.sprite.body.velocity.y, this.target.sprite.body.velocity.x) * 180 / Math.PI;
            }
            if (this.target.sprite.body.velocity.x < 0 && this.target.sprite.body.velocity.y < 0) {
                this.target.sprite.body.angle = Math.atan2(-this.target.sprite.body.velocity.y, -this.target.sprite.body.velocity.x) * 180 / Math.PI;
            }
        }
        moveRight() {
            this.target.sprite.body.moveRight(this.target.getComponent(GameConstants_1.ComponentType.TANK).speed);
        }
        moveLeft() {
            this.target.sprite.body.moveLeft(this.target.getComponent(GameConstants_1.ComponentType.TANK).speed);
        }
        update() {
            switch (this._direction) {
                case GameConstants_1.InputType.LEFT_INPUT:
                    this.moveLeft();
                    this._correctRotation();
                    this._direction = GameConstants_1.InputType.STOP;
                    break;
                case GameConstants_1.InputType.RIGHT_INPUT:
                    this.moveRight();
                    this._correctRotation();
                    this._direction = GameConstants_1.InputType.STOP;
                    break;
                default:
                    break;
            }
        }
        get direction() {
            return this._direction;
        }
        set direction(value) {
            this._direction = value;
        }
    }
    ActionComponents.MovableComponent = MovableComponent;
    class PowerUpComponent extends component_1.Component {
        constructor(state, tank) {
            super(GameConstants_1.ComponentType.POWER_UP);
            this._tank = tank;
            this._state = state;
        }
        update() {
            const healthComponent = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
            if (this._currentCrate === GameConstants_1.TankLayout.CRATE_REPAIR) {
                healthComponent.restoreHealth();
                this._currentCrate = null;
            }
        }
        loadCrate(kindOfCrate) {
            this._currentCrate = kindOfCrate;
            if (kindOfCrate === GameConstants_1.TankLayout.CRATE_REPAIR) {
                let playerUIManager = new PlayerVisualsManager(this._state);
                playerUIManager.addPowerUpIcon(GameConstants_1.TankLayout.CRATE_REPAIR);
            }
        }
    }
    ActionComponents.PowerUpComponent = PowerUpComponent;
})(ActionComponents = exports.ActionComponents || (exports.ActionComponents = {}));
//# sourceMappingURL=action.components.js.map