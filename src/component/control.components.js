"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
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
        // Not a bullet?
        if (!cOwner) {
            return;
        }
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
        const angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        /*
            let angle = -45;
            velocity = (obj2.x) - obj1.x  + velocity;*/
        let aiComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER)
            .owner.getComponent(GameConstants_1.ComponentType.AI);
        aiComponent
            ? obj1.body.velocity.x = calculateVelocityX(true, velocity, angle)
            : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
        aiComponent
            ? obj1.body.velocity.y = calculateVelocityY(true, velocity, angle)
            : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);
        function calculateVelocityX(isAi = true, tankSpeed, angle) {
            const aiVelocityXCorrectionVal = 200;
            if (isAi) {
                return Math.cos(angle - Math.PI / 180) * tankSpeed - (aiVelocityXCorrectionVal * data_config_1.DataConfig.difficulty);
            }
            return Math.abs(Math.cos(angle - Math.PI / 180) * tankSpeed);
        }
        function calculateVelocityY(isAi = true, tankSpeed, angle) {
            const velocityYCorrectionValue = 100;
            const antiGravityValue = 700;
            if (isAi) {
                return Math.sin(angle - Math.PI / 180) * velocity - antiGravityValue;
            }
            return (Math.sin(angle - Math.PI / 180) * velocity) - (velocityYCorrectionValue * data_config_1.DataConfig.difficulty);
        }
    }
}
exports.BulletComponent = BulletComponent;
class AiComponent extends component_1.Component {
    constructor(player) {
        super(GameConstants_1.ComponentType.AI);
        this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT];
        this._player = player;
    }
    update() {
        this.decide();
    }
    decide() {
        let distance = math_util_1.MathUtil.normalize(this._player.sprite.x - this.target.sprite.x);
        // Justify this in the report say tanks can only spawn on the right of the player
        let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
        let tankComp = this._target.getComponent(GameConstants_1.ComponentType.TANK);
        if (sComp) {
            // Here we are adding some random params to simulate a more realistic behaviour
            if (Math.abs(distance) >= 0.15 + math_util_1.MathUtil.randomIntFromInterval(0.05, 0.06)) {
                sComp.setState(GameConstants_1.FSMStates.SEEK);
            }
            else if (Math.abs(distance) <= 0.08 + math_util_1.MathUtil.randomIntFromInterval(0.02, 0.03)) {
                sComp.setState(GameConstants_1.FSMStates.FLEEING);
            }
            else {
                sComp.setState(GameConstants_1.FSMStates.FIRING);
            }
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