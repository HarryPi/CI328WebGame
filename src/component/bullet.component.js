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
        // Not a bullet?
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
        else {
        }
        this.accelerateToObject(this.target.sprite, seekObject);
    }
    accelerateToObject(obj1, obj2, velocity = 500) {
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        this.target.getComponent(GameConstants_1.ComponentType.OWNER).owner.getComponent(GameConstants_1.ComponentType.AI)
            ? obj1.body.velocity.x = Math.cos(angle - Math.PI / 180) * velocity
            : obj1.body.velocity.x = Math.abs(Math.cos(angle - Math.PI / 180) * velocity); // accelerateToObject
        obj1.body.velocity.y = (Math.sin(angle - Math.PI / 180) * velocity - 1400);
        /*
      
          let angle = MathUtil.calculateAngle2ToHitCoordinate(obj2.x, obj2.y, velocity, 1400);
          obj1.body.angle = angle;
          obj1.body.velocity.x = velocity;*/
    }
}
exports.BulletComponent = BulletComponent;
//# sourceMappingURL=bullet.component.js.map