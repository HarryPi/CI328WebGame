"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
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
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        /*
            let angle = -45;
            velocity = (obj2.x) - obj1.x  + velocity;*/
        let aiComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER)
            .owner.getComponent(GameConstants_1.ComponentType.AI);
        aiComponent
            ? obj1.body.velocity.x = Math.cos(angle - Math.PI / 180) * velocity + 200 * data_config_1.DataConfig.difficulty
            : obj1.body.velocity.x = Math.abs(Math.cos(angle - Math.PI / 180) * velocity);
        aiComponent
            ? obj1.body.velocity.y = Math.sin(angle - Math.PI / 180) * velocity
            : obj1.body.velocity.y = (Math.sin(angle - Math.PI / 180) * velocity) - 100 * data_config_1.DataConfig.difficulty;
    }
}
exports.BulletComponent = BulletComponent;
//# sourceMappingURL=bullet.component.js.map