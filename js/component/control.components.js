"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const math_util_1 = require("../util/math.util");
const data_config_1 = require("../config/data.config");
var ControlComponents;
(function (ControlComponents) {
    class DisasterComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.DISASTER);
        }
        update() {
            const layoutComponent = this.target.getComponent(GameConstants_1.ComponentType.LAYER);
            const animation = layoutComponent.getCurrentAnimation();
            if (!animation.isPlaying) {
                this.target.sprite.angle = 45;
                this.target.sprite.body.velocity.y = 200 * (5 - data_config_1.DataConfig.difficulty);
                this.target.sprite.body.velocity.x = 100;
            }
        }
    }
    ControlComponents.DisasterComponent = DisasterComponent;
    class BulletComponent extends component_1.Component {
        constructor(game) {
            super(GameConstants_1.ComponentType.BULLET);
            this._game = game;
            this._requiredComponents.push(GameConstants_1.ComponentType.OWNER);
            this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
        }
        /**
         * @description
         * Initiates a normal bullet tank bullet and ensures it will reach the target
         * If this is an AI the target passed at the AI else at the mouse pointer of the player
         */
        bulletInit() {
            let cOwner = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
            let seekObject = {
                x: this._game.input.activePointer.x + this._game.camera.x,
                y: this._game.input.activePointer.y
            };
            // Check if there is an AIComponent if yes this is not our player
            let aiComponent = cOwner ? cOwner.owner.getComponent(GameConstants_1.ComponentType.AI) : null;
            if (aiComponent) {
                // If yes do not fire bullet according to mouse but to player; AIComponent knows where the player is
                seekObject.x = aiComponent.player.sprite.x;
                seekObject.y = aiComponent.player.sprite.y;
            }
            if (!aiComponent) {
                console.log(seekObject);
                console.log(`Player Postion: ${cOwner.owner.sprite.x}`);
                console.log(`Player scale: ${cOwner.owner.sprite.scale.x}`);
            }
            this.accelerateToObject(this.target.sprite, seekObject, aiComponent
                ? cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed
                : Math.abs(cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed));
        }
        accelerateToObject(owner, seekTarget, velocity = 500) {
            let angle = Math.atan2(seekTarget.y - owner.y, seekTarget.x - owner.x);
            const ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
            let aiComponent = ownerComponent.owner.getComponent(GameConstants_1.ComponentType.AI);
            let aiAngle;
            ownerComponent.owner.sprite.scale.x > 0 ? aiAngle = -45 : aiAngle = 180;
            if (aiComponent) {
                owner.body.velocity.x = calculateVelocityX(velocity, aiAngle);
                owner.body.velocity.y = calculateVelocityY(velocity, aiAngle);
            }
            else {
                owner.body.velocity.x = calculateVelocityX(velocity, angle);
                owner.body.velocity.y = calculateVelocityY(velocity, angle);
                correctBulletScale(ownerComponent, this);
            }
            function correctBulletScale(cOwner, self) {
                if (cOwner.owner.sprite.scale.x > 0 && owner.x > seekTarget.x) {
                    self.target.sprite.scale.x = -1;
                }
                if (cOwner.owner.sprite.scale.x < 0 && owner.x < seekTarget.x) {
                    self.target.sprite.scale.x = 1;
                }
            }
            function calculateVelocityX(tankSpeed, angle) {
                return velocity * Math.cos(angle);
            }
            function calculateVelocityY(tankSpeed, angle) {
                return velocity * Math.sin(angle);
            }
        }
    }
    ControlComponents.BulletComponent = BulletComponent;
    class AiComponent extends component_1.Component {
        constructor(player, aiFriendlies) {
            super(GameConstants_1.ComponentType.AI);
            this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT, GameConstants_1.ComponentType.TANK];
            this._player = player;
            this._friendlies = aiFriendlies;
        }
        update() {
            this.decide();
        }
        decide() {
            // Check if state was given externally or has to be calculated
            // Justify this in the report say tanks can only spawn on the right of the player
            let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
            // Here we are adding some random params to simulate a more realistic behaviour
            switch (this.canHitPlayer()) {
                case GameConstants_1.AIConstant.CAN_HIT_ENEMY:
                    sComp.setState(GameConstants_1.FsmStateName.PURSUING);
                    break;
                case GameConstants_1.AIConstant.CLOSE:
                    let healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                    let lowHealth = healthComp.getCurrentHealth() <= healthComp.getMaxHealth() / 2;
                    if (!lowHealth) {
                        sComp.setState(GameConstants_1.FsmStateName.EVADE);
                    }
                    else {
                        // Check if there is a reason to die
                        if (this.checkIfAliesNearby()) {
                            sComp.setState(GameConstants_1.FsmStateName.SUICIDE);
                            return;
                        }
                        sComp.setState(GameConstants_1.FsmStateName.FLEEING);
                    }
                    break;
                case GameConstants_1.AIConstant.FAR_AWAY:
                    sComp.setState(GameConstants_1.FsmStateName.SEEK);
                    break;
                default:
                    break;
            }
        }
        checkIfAliesNearby() {
            return this._friendlies.some((entity) => {
                return Math.abs(this.target.sprite.x - entity.sprite.x) < 20;
            });
        }
        canHitPlayer() {
            const tankComponent = this.target.getComponent(GameConstants_1.ComponentType.TANK);
            const physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
            const distance = this._player.sprite.x - this.target.sprite.x;
            const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
            const rangeOfProjectile = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity; // From Physics laws
            const decisionMakingDistance = 300;
            if (math_util_1.MathUtil.isBetween(rangeOfProjectile, Math.abs(distance) + decisionMakingDistance, Math.abs(distance) - decisionMakingDistance)) {
                return GameConstants_1.AIConstant.CAN_HIT_ENEMY;
            }
            else if (rangeOfProjectile > Math.abs(distance)) {
                return GameConstants_1.AIConstant.CLOSE;
            }
            else {
                return GameConstants_1.AIConstant.FAR_AWAY;
            }
        }
        get player() {
            return this._player;
        }
        get friendlies() {
            return this._friendlies;
        }
    }
    ControlComponents.AiComponent = AiComponent;
    class CameraComponent extends component_1.Component {
        constructor(game) {
            super(GameConstants_1.ComponentType.CAMERA);
            this._game = game;
        }
        setFocus(entity) {
            this._game.camera.follow(entity);
        }
    }
    ControlComponents.CameraComponent = CameraComponent;
})(ControlComponents = exports.ControlComponents || (exports.ControlComponents = {}));
//# sourceMappingURL=control.components.js.map