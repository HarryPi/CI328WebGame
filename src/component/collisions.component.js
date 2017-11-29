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
    setCollisionGroup(ownerCollisionGroup) {
        this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
        return this;
    }
    collidesWith(collidesWith, actions) {
        let body = this.target.sprite.body;
        if (body.collidesWith.includes(collidesWith)) {
            return; // In case we attempt to set the same collision group twice
        }
        actions.forEach((action) => {
            switch (action) {
                case GameConstants_1.Action.NOTHING:
                    body.collides(collidesWith);
                    break;
                case GameConstants_1.Action.EXPLODE:
                    body.collides(collidesWith, this.explode, this);
                    break;
                case GameConstants_1.Action.DAMAGE:
                    break;
                default:
                    break;
            }
        });
        return this;
    }
    explode(ownerBody, impacted) {
        // If layout is imported with tiled, which we do the body doesn't have a sprite therefor would throw an exception
        let impactedSprite = impacted.sprite;
        let ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        if (impactedSprite) {
            // not all entities have an owner
            if (ownerComponent) {
                if (ownerComponent.owner.sprite.data.tag === impactedSprite.data.tag) {
                    return; // do nothing
                }
            }
        }
        this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite();
        ownerBody.sprite.animations.add(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        ownerBody.sprite.animations.play(GameConstants_1.Action.EXPLODE).onComplete.add(() => {
            ownerBody.sprite.kill();
            ownerBody.sprite.destroy();
        });
    }
}
exports.CollisionsComponent = CollisionsComponent;
//# sourceMappingURL=collisions.component.js.map