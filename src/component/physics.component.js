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
        this.target.sprite.body.allowGravity = true;
        this.target.sprite.body.angularDamping = 0.7;
    }
}
exports.PhysicsComponent = PhysicsComponent;
//# sourceMappingURL=physics.component.js.map