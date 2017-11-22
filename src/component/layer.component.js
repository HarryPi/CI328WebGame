"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class LayerComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.LAYER);
    }
    addLayer(cachedName) {
        if (cachedName) {
            this.target.sprite.frameName = cachedName;
        }
    }
}
exports.LayerComponent = LayerComponent;
//# sourceMappingURL=layer.component.js.map