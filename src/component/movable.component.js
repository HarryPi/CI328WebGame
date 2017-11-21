"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const print_1 = require("../util/print");
class MovableComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.MOVABLE);
        this._speed = 180;
        this._isMoving = false;
    }
    round(angleToRound) {
        let arr = [];
        arr.push(Math.ceil(angleToRound));
        arr.push(Math.floor(angleToRound));
        return arr;
    }
    moveRight() {
        this.target.sprite.body.velocity.x = this._speed;
    }
    moveLeft() {
        this.target.sprite.body.velocity.x = -this._speed;
    }
    stop() {
        this.target.sprite.body.velocity.x = 0;
    }
    move(input) {
        switch (input) {
            case GameConstants_1.Direction.LEFT_INPUT:
                this.moveLeft();
                this._direction = GameConstants_1.Direction.LEFT_INPUT;
                break;
            case GameConstants_1.Direction.RIGHT_INPUT:
                this.moveRight();
                this._direction = GameConstants_1.Direction.RIGHT_INPUT;
                break;
            default:
                console.log('No Input');
                break;
        }
    }
    update() {
        let tankAngle = this.target.sprite.body.angle;
        let worldPos = this.target.sprite.body.world.x;
        print_1.default.log('Sprite Location x:', this.round(this.target.sprite.world.x), 'y:', this.round(this.target.sprite.world.x));
        print_1.default.log(this._direction);
        if (this._direction === GameConstants_1.Direction.RIGHT_INPUT && Math.ceil(worldPos) >= 396) {
            debugger;
            console.log('funcking hell');
            this.target.sprite.body.angle = 45;
        }
        else if (this._direction === GameConstants_1.Direction.RIGHT_INPUT && this.round(worldPos).some((value) => {
            console.log('WTF');
            return value > 750;
        })) {
            this.target.sprite.body.angle = 0;
        }
    }
}
exports.MovableComponent = MovableComponent;
//# sourceMappingURL=movable.component.js.map