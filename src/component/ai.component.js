"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const math_util_1 = require("../util/math.util");
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
//# sourceMappingURL=ai.component.js.map