"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
const stateMachine_1 = require("../AI/fsm/stateMachine");
var EventComponents;
(function (EventComponents) {
    class ShootComponent extends component_1.Component {
        constructor(game, factory) {
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
    }
    EventComponents.ShootComponent = ShootComponent;
    class StateComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.STATE);
            this._fsm = new stateMachine_1.default();
        }
        addState(name, state) {
            this._fsm.add(name, state);
            state.entity = this.target;
            return this;
        }
        setState(name) {
            this._fsm.enter(name);
            return this;
        }
        get currentState() {
            return this._fsm.current;
        }
        update() {
            this._fsm.update();
        }
    }
    EventComponents.StateComponent = StateComponent;
    class MovableComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.MOVABLE);
            this._isMoving = false;
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
    EventComponents.MovableComponent = MovableComponent;
})(EventComponents = exports.EventComponents || (exports.EventComponents = {}));
//# sourceMappingURL=event.components.js.map