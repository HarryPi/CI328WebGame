"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
const uimanagers_1 = require("../UI/uimanagers");
var CollisionComponents;
(function (CollisionComponents) {
    var PlayerVisualsManager = uimanagers_1.UiManagers.PlayerVisualsManager;
    class CollisionsComponent extends component_1.Component {
        constructor(emitter, state) {
            super(GameConstants_1.ComponentType.COLLISION);
            this._requiredComponents = [
                GameConstants_1.ComponentType.PHYSICS
            ];
            this._state = state;
            this._emitter = emitter;
            this._emitter.makeParticles(GameConstants_1.TankLayout.TANK_SPRITESHEET, GameConstants_1.TankLayout.EXPLOSION_NINE);
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
            if (this.target.sprite.body.collidesWith.includes(collidesWith)) {
                return;
            }
            actions.forEach((action) => {
                switch (action) {
                    case GameConstants_1.Action.NOTHING:
                        body.collides(collidesWith);
                        break;
                    case GameConstants_1.Action.DAMAGE:
                        // Each bullet does the same damage regardless of type
                        // Bullet damage depends on difficulty level
                        const aiComp = this.target.getComponent(GameConstants_1.ComponentType.AI);
                        const healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                        const tankComp = this.target.getComponent(GameConstants_1.ComponentType.TANK);
                        if (!aiComp && tankComp) {
                            body.collides(collidesWith, () => {
                                const heartManager = new PlayerVisualsManager();
                                const damage = tankComp.bulletDmg * data_config_1.DataConfig.enemyDamage;
                                heartManager.removeHeartByDamage(damage);
                                healthComp.dealDamage(damage);
                                this._emitter.x = body.sprite.x;
                                this._emitter.y = body.sprite.y;
                                this._emitter.start(true, 500, null, 30);
                            });
                            break;
                        }
                        body.collides(collidesWith, () => {
                            const damage = tankComp ? data_config_1.DataConfig.playerDamage * tankComp.bulletDmg : data_config_1.DataConfig.playerDamage; // if its not bullet
                            healthComp.dealDamage(damage);
                            this._emitter.x = body.sprite.x;
                            this._emitter.y = body.sprite.y;
                            this._emitter.start(true, 500, null, 30);
                        });
                        break;
                    case GameConstants_1.Action.POWER_UP:
                        const powerUpComponent = this.target.getComponent(GameConstants_1.ComponentType.POWER_UP);
                        const healthComponent = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                        body.collides(collidesWith, (tank, powerup) => {
                            if (!healthComponent.pendingHeal()) {
                                let frameName = powerup.sprite.frameName;
                                if (frameName.includes(GameConstants_1.TankLayout.CRATE_REPAIR.toString())) {
                                    powerUpComponent.loadCrate(GameConstants_1.TankLayout.CRATE_REPAIR);
                                    powerup.sprite.visible = false;
                                    powerup.data.shapes[0].sensor = true;
                                }
                            }
                        });
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