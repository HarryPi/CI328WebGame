"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
class CollisionsComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.COLLISION);
        this._ignoreCollision = true;
        this._requiredComponents = [
            GameConstants_1.ComponentType.PHYSICS
        ];
    }
    setCollisionGroup(ownerCollisionGroup) {
        this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
        return this;
    }
    cleanCollisions() {
        this.target.sprite.body.data.shapes[0].sensor = true;
    }
    collidesWith(collidesWith, actions) {
        let body = this.target.sprite.body;
        /*
            if (body.collidesWith.includes(collidesWith)) {
              return; // In case we attempt to set the same collision group twice
            }
        */
        actions.forEach((action) => {
            switch (action) {
                case GameConstants_1.Action.NOTHING:
                    body.collides(collidesWith);
                    break;
                /*
                        case Action.EXPLODE:
                          body.collides(collidesWith, this.explode, this);
                          break;
                */
                case GameConstants_1.Action.DAMAGE:
                    // Each bullet does the same damage regardless of type
                    // Bullet damage depends on difficulty level
                    let aiComp = this.target.getComponent(GameConstants_1.ComponentType.AI);
                    let healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                    if (aiComp) {
                        body.collides(collidesWith, () => {
                            healthComp.dealDamage(data_config_1.DataConfig.playerDamage);
                        }, this);
                    }
                    else {
                        body.collides(collidesWith, () => {
                            healthComp.dealDamage(data_config_1.DataConfig.enemyDamage);
                        });
                    }
                    break;
                default:
                    break;
            }
        });
        return this;
    }
    explode(ownerBody, impacted) {
        let ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER); // Here we check if this Entity is a bullet as only bullets have owners
        // Thus if this is bullet
        if (ownerComponent) {
            this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite(); // This should be true only if bullet
            this.target.getComponent(GameConstants_1.ComponentType.LAYER).playAnimation(GameConstants_1.Action.EXPLODE, null, null, true);
        }
    }
}
exports.CollisionsComponent = CollisionsComponent;
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
    get gravity() {
        return this._game.physics.p2.gravity.y;
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
//# sourceMappingURL=collision.components.js.map