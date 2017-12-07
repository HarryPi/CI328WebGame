"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
var CollisionComponents;
(function (CollisionComponents) {
    class CollisionsComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.COLLISION);
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
            actions.forEach((action) => {
                switch (action) {
                    case GameConstants_1.Action.NOTHING:
                        body.collides(collidesWith);
                        break;
                    case GameConstants_1.Action.DAMAGE:
                        // Each bullet does the same damage regardless of type
                        // Bullet damage depends on difficulty level
                        let aiComp = this.target.getComponent(GameConstants_1.ComponentType.AI);
                        let healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                        if (aiComp) {
                            body.collides(collidesWith, () => {
                                healthComp.dealDamage(data_config_1.DataConfig.playerDamage);
                                console.log(healthComp.getCurrentHealth());
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
    }
    CollisionComponents.CollisionsComponent = CollisionsComponent;
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
        scaleSprite(scale) {
            this.target.sprite.scale.x = scale;
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
    CollisionComponents.PhysicsComponent = PhysicsComponent;
})(CollisionComponents = exports.CollisionComponents || (exports.CollisionComponents = {}));
//# sourceMappingURL=collision.components.js.map