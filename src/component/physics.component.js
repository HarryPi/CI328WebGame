"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const vector_1 = require("../util/vector");
class PhysicsComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.PHYSICS);
        this._game = game;
    }
    addPhysics(gravity = 1, anchor = new vector_1.default(0.5, 0.5)) {
        this._game.physics.p2.enable(this.target.sprite);
        this.target.sprite.anchor.setTo(anchor.x, anchor.y);
        this.target.sprite.body.data.gravityScale = gravity;
        this.target.sprite.body.angularDamping = 0.7;
        console.log(this.target.sprite);
        return this;
    }
    setVelocity(vec) {
        this.target.sprite.body.velocity.x = vec.x;
        this.target.sprite.body.velocity.y = vec.y;
        return this;
    }
}
exports.PhysicsComponent = PhysicsComponent;
//# sourceMappingURL=physics.component.js.map