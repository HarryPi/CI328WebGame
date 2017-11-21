"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class MovableComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.MOVABLE);
        this._speed = 300;
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
        this.target.sprite.body.velocity.x = this._speed;
    }
    moveLeft() {
        this.target.sprite.body.velocity.x = -this._speed;
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
exports.MovableComponent = MovableComponent;
//# sourceMappingURL=movable.component.js.map