"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class Entity {
    constructor(game, x, y, components) {
        this._components = new Map();
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
        }
        this._sprite = game.add.sprite(x, y, GameConstants_1.TankLayout.TANK_SPRITESHEET);
    }
    addComponent(component) {
        this._components.set(component.name, component);
        this._components.get(component.name).target = this;
        return component;
    }
    getComponent(componentName) {
        return this._components.get(componentName);
    }
    update() {
        this._components.forEach((componentType) => {
            this._components.get(componentType.name).update();
        });
    }
    withComponent(components) {
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            return this;
        }
    }
    withOwner(entity) {
        this._owner = entity;
        return this;
    }
    get sprite() {
        return this._sprite;
    }
    get owner() {
        return this._owner;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map