"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class HealthComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.HEALTH);
        this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
        this._requiredComponents.push(GameConstants_1.ComponentType.PHYSICS);
    }
    /**
     * @description
     * Deals damage to target returns true if target is still alive after damage
     *
     * */
    dealDamage(damage) {
        // Check if the damage will kill the entity
        if (this.target.sprite.health - damage <= 0) {
            this.target.getComponent(GameConstants_1.ComponentType.COLLISION).cleanCollisions();
            this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite();
            this.target.getComponent(GameConstants_1.ComponentType.LAYER).playAnimation(GameConstants_1.Action.EXPLODE, null, null, true).then(() => {
                this.target.destroy();
            });
        }
        else {
            console.log(this.target.sprite.health);
            this.target.sprite.damage(damage);
        }
    }
    setHealth(health) {
        this.target.sprite.health = health;
    }
}
exports.HealthComponent = HealthComponent;
//# sourceMappingURL=health.component.js.map