"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class CollisionsComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.COLLISION);
    }
    enableCollision(collisionGroup, collidesWith) {
        this.target.sprite.body.setCollisionGroup(collisionGroup);
        this.target.sprite.body.collides(collidesWith);
    }
}
exports.CollisionsComponent = CollisionsComponent;
//# sourceMappingURL=collisions.component.js.map