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
    addAnimation(name, frames, frameRate, loop, useNumericIndex) {
        this.target.sprite.animations.add(name, frames, frameRate, loop, useNumericIndex);
    }
    getAnimation(name) {
        return this.target.sprite.animations.getAnimation(name);
    }
    playAnimation(name, frameRate, loop, killOnComplete) {
        return new Promise(((resolve, reject) => {
            this.target.sprite.animations.play(name, frameRate, loop).onComplete.add(() => {
                resolve();
            });
        }));
    }
}
exports.LayerComponent = LayerComponent;
//# sourceMappingURL=layer.component.js.map