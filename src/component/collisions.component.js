"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class CollisionsComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.COLLISION);
        this._ignoreCollision = true;
        this._requiredComponents = [GameConstants_1.ComponentType.PHYSICS];
    }
    enableCollision(actions, collisionGroups) {
        this.target.sprite.body.onBeginContact.add((contactWith, contactWith1, thisBody, shape, eqArr) => {
            if (this._ignoreCollision) {
                this._ignoreCollision = false;
                return;
            }
            this.triggerCollisionAction(actions, eqArr, collisionGroups);
        });
    }
    triggerCollisionAction(actions, eqArr, collisionGroups) {
        actions.forEach((action) => {
            switch (action) {
                case GameConstants_1.Action.EXPLODE:
                    this.target.sprite.animations.add(action.toString(), Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
                    this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite(this.target.sprite);
                    this.target.sprite.animations.play(action.toString()).onComplete.add(() => {
                        this.target.sprite.kill();
                    });
                    break;
                default:
                    break;
            }
        });
    }
}
exports.CollisionsComponent = CollisionsComponent;
//# sourceMappingURL=collisions.component.js.map