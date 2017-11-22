"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
class ShootComponent extends component_1.Component {
    constructor(game, factory) {
        super(GameConstants_1.ComponentType.SHOOT);
        this._timer = 0;
        this._factory = factory;
    }
    update() {
        if (this._canShoot) {
            console.log(Date.now() - this._timer);
            if (Date.now() - this._timer > 1500) {
                this.shootBullet();
            }
        }
    }
    set canShoot(value) {
        this._canShoot = value;
    }
    shootBullet() {
        this._canShoot = false;
        this._factory.newBullet(this.target.sprite.x + 50, this.target.sprite.y - 30);
        this._timer = Date.now();
    }
}
exports.ShootComponent = ShootComponent;
//# sourceMappingURL=shoot.component.js.map