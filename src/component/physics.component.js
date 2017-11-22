"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class PhysicsComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.PHYSICS);
        this._game = game;
    }
    addPhysics() {
        this._game.physics.p2.enable(this.target.sprite);
        this.target.sprite.body.angularDamping = 0.7;
        console.log(this.target.sprite);
        return this;
    }
    setVelocity(vec) {
        this.target.sprite.body.velocity.x = vec.x;
        this.target.sprite.body.velocity.y = vec.y;
        return this;
    }
    setAngle(angle) {
        this.target.sprite.body.angle = angle;
        return this;
    }
    delayGravity(bool, delay = 1000) {
        this.target.sprite.body.enableGravity = false;
        if (bool) {
            setInterval(() => {
                this.target.sprite.body.enableGravity = true;
            }, delay);
        }
    }
}
exports.PhysicsComponent = PhysicsComponent;
//# sourceMappingURL=physics.component.js.map