"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class MovableComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.MOVABLE);
        this._speed = 100;
        this._isMoving = false;
    }
    moveRight() {
        console.log('Moving right...');
    }
    moveLeft() {
        console.log('Moving left...');
    }
    stop() {
    }
    update() {
    }
    move(input) {
        switch (input) {
            case GameConstants_1.InputType.LEFT_INPUT:
                this.moveLeft();
                break;
            case GameConstants_1.InputType.RIGHT_INPUT:
                this.moveRight();
                break;
            default:
                console.log('No Input');
                break;
        }
    }
}
exports.MovableComponent = MovableComponent;
//# sourceMappingURL=movable.component.js.map