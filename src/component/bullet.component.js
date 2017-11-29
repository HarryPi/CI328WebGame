"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class BulletComponent extends component_1.Component {
    // todo: Should this be on the PhysicsComponent?
    constructor(game) {
        super(GameConstants_1.ComponentType.BULLET);
        this._game = game;
        this._requiredComponents.push(GameConstants_1.ComponentType.OWNER);
    }
    bulletInit() {
        let cOwner = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        if (!cOwner) {
            return;
        }
        let seekObject = {
            x: this._game.input.activePointer.x,
            y: this._game.input.activePointer.y
        };
        // Check if there is an AIComponent if yes this is not our player
        let ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        let aiComponent = ownerComponent ? ownerComponent.owner.getComponent(GameConstants_1.ComponentType.AI) : null;
        if (aiComponent) {
            // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
            seekObject.x = aiComponent.player.sprite.x;
            seekObject.y = aiComponent.player.sprite.y;
        }
        this.accelerateToObject(this.target.sprite, seekObject);
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    accelerateToObject(obj1, obj2, speed = 1400) {
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        obj1.body.velocity.x = Math.cos(angle) * speed; // accelerateToObject
        obj1.body.velocity.y = Math.sin(angle) * speed;
    }
}
exports.BulletComponent = BulletComponent;
//# sourceMappingURL=bullet.component.js.map