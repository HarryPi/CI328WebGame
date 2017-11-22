"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class BulletComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.BULLET);
        this._game = game;
    }
    bulletInit() {
        let speed;
        let angle = this.target.owner.sprite.angle;
        this.target.sprite.rotation = angle + this.degToRad(90);
        this.target.sprite.body.velocity.x = Math.cos(angle) * 1500;
        this.target.sprite.body.velocity.y = Math.sin(angle) * 1500;
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
}
exports.BulletComponent = BulletComponent;
//# sourceMappingURL=bullet.component.js.map