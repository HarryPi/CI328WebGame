"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const print_1 = require("../util/print");
class AiComponent extends component_1.Component {
    constructor(player) {
        super(GameConstants_1.ComponentType.AI);
        this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT];
        this._player = player;
    }
    update() {
        this.steer();
    }
    steer() {
        let position = this.target.sprite.x + this.target.sprite.body.velocity.x;
        let velocity = this.normalize(this._player.sprite.x - this.target.sprite.x);
        print_1.default.log(`position is ${position}`, `velocity is: ${velocity}`);
    }
    normalize(val, max = 4941, min = -46) {
        return (val - min) / (max - min);
    }
}
exports.AiComponent = AiComponent;
//# sourceMappingURL=ai.component.js.map