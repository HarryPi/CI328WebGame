"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const math_util_1 = require("../util/math.util");
class BulletComponent extends component_1.Component {
    // todo: Should this be on the PhysicsComponent?
    constructor(game) {
        super(GameConstants_1.ComponentType.BULLET);
        this._game = game;
        this._requiredComponents.push(GameConstants_1.ComponentType.OWNER);
        this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
    }
    /**
     * @description
     * This is to be called if a bullet is not a 'normal' bullet instead is a random disaster bullet
     * */
    disasterBullet() {
        this.target.sprite.angle = 90;
        this.target.sprite.body.velocity.y = 2000;
    }
    /**
     * @description
     * Initiates a normal bullet tank bullet and ensures it will reach the target
     * If this is an AI the target passed at the AI else at the mouse pointer of the player
     * */
    bulletInit() {
        let cOwner = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        let seekObject = {
            x: this._game.input.activePointer.x + this._game.camera.x,
            y: this._game.input.activePointer.y
        };
        // Check if there is an AIComponent if yes this is not our player
        let aiComponent = cOwner ? cOwner.owner.getComponent(GameConstants_1.ComponentType.AI) : null;
        if (aiComponent) {
            // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
            seekObject.x = aiComponent.player.sprite.x;
            seekObject.y = aiComponent.player.sprite.y;
        }
        this.accelerateToObject(this.target.sprite, seekObject, aiComponent
            ? cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed
            : Math.abs(cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed));
    }
    accelerateToObject(obj1, obj2, velocity = 500) {
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        const ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        let tankComponent = ownerComponent.owner.getComponent(GameConstants_1.ComponentType.TANK);
        let aiComponent = ownerComponent.owner.getComponent(GameConstants_1.ComponentType.AI);
        aiComponent
            ? obj1.body.velocity.x = calculateVelocityX(true, velocity, tankComponent.angle)
            : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
        aiComponent
            ? obj1.body.velocity.y = calculateVelocityY(true, velocity, tankComponent.angle)
            : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);
        function calculateVelocityX(isAi = true, tankSpeed, angle) {
            if (isAi) {
                return velocity * Math.cos(angle);
            }
            return velocity * Math.cos(angle);
        }
        function calculateVelocityY(isAi = true, tankSpeed, angle) {
            if (isAi) {
                return velocity * Math.sin(angle);
            }
            return velocity * Math.sin(angle);
        }
    }
}
exports.BulletComponent = BulletComponent;
class AiComponent extends component_1.Component {
    constructor(player) {
        super(GameConstants_1.ComponentType.AI);
        this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT, GameConstants_1.ComponentType.TANK];
        this._player = player;
    }
    update() {
        this.decide();
    }
    decide() {
        // Justify this in the report say tanks can only spawn on the right of the player
        let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
        // Here we are adding some random params to simulate a more realistic behaviour
        switch (this.canHitPlayer()) {
            case GameConstants_1.AIConstant.CAN_HIT_ENEMY:
                sComp.setState(GameConstants_1.FSMStates.FIRING);
                break;
            case GameConstants_1.AIConstant.CLOSE:
                sComp.setState(GameConstants_1.FSMStates.FLEEING);
                break;
            case GameConstants_1.AIConstant.FAR_AWAY:
                sComp.setState(GameConstants_1.FSMStates.SEEK);
                break;
            default:
                break;
        }
    }
    canHitPlayer() {
        const tankComponent = this.target.getComponent(GameConstants_1.ComponentType.TANK);
        const physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
        const distance = Math.abs(this._player.sprite.x - this.target.sprite.x);
        const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
        const rangeOfProjectile = Math.abs((2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity);
        const approximateError = 10;
        if (math_util_1.MathUtil.isBetween(rangeOfProjectile, distance + approximateError, distance - approximateError)) {
            return GameConstants_1.AIConstant.CAN_HIT_ENEMY;
        }
        else if (rangeOfProjectile > distance) {
            return GameConstants_1.AIConstant.CLOSE;
        }
        else {
            return GameConstants_1.AIConstant.FAR_AWAY;
        }
    }
    get player() {
        return this._player;
    }
}
exports.AiComponent = AiComponent;
class CameraComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.CAMERA);
        this._game = game;
    }
    setFocus(entity) {
        this._game.camera.follow(entity);
    }
}
exports.CameraComponent = CameraComponent;
//# sourceMappingURL=control.components.js.map