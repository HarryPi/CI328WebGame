"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class PhysicsComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.PHYSICS);
        this._game = game;
    }
    addPhysics(drag = true) {
        this._game.physics.p2.enable(this.target.sprite);
        this.target.sprite.anchor.setTo(0.5, 0.5);
        drag ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;
        return this;
    }
    flipSprite() {
        this.target.sprite.scale.x = -1;
        return this;
    }
    stopSprite() {
        this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
        this.target.sprite.body.restitution = 0.0;
        this.target.sprite.body.velocity.x = 0;
        this.target.sprite.body.velocity.y = 0;
        this.target.sprite.body.allowGravity = false;
        this.target.sprite.body.data.gravityScale = 0;
        this.target.sprite.body.angularDumping = 1;
    }
}
exports.PhysicsComponent = PhysicsComponent;
//# sourceMappingURL=physics.component.js.map