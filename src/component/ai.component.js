"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
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
        let distance = this.normalize(this._player.sprite.x - this.target.sprite.x);
        // Justify this in the report say tanks can only spawn on the right of the player
        let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
        console.log(sComp);
        console.log('At AI Component');
        if (sComp) {
            if (distance <= -0.15) {
                console.log('Setting to seek');
                sComp.setState(GameConstants_1.FSMStates.SEEK);
            }
            else {
                console.log('Setting to fire');
                sComp.setState(GameConstants_1.FSMStates.FIRING);
            }
        }
    }
    normalize(val, max = 4941, min = -46) {
        return (val - min) / (max - min);
    }
}
exports.AiComponent = AiComponent;
//# sourceMappingURL=ai.component.js.map