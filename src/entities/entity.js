"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class Entity {
    constructor(game, x, y, components) {
        this._components = [];
        debugger;
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            debugger;
            this._sprite = game.add.sprite(x, y, GameConstants_1.TankLayout.TANK_SPRITESHEET, GameConstants_1.TankLayout.CANDY_HUNTER);
        }
    }
    addComponent(component) {
        debugger;
        this._components[component.name] = component;
        this._components[component.name].target = this;
        return component;
    }
    getComponent(componentName) {
        return this._components[componentName];
    }
    update() {
        this._components.forEach((componentType) => {
            this._components[componentType.name].update();
        });
    }
    withComponent(components) {
        debugger;
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            return this;
        }
    }
    get sprite() {
        return this._sprite;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map