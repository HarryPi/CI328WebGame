"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
/**
 * @class Entity
 * @description
 * Represents any object that can be added to the game world
 * Exposes functions to load components in order to modify the actions and the abilities of the entity see {@link Entity#addComponent}
 * Exposes a function to retrieve any component that is loaded to an entity see {@link  Entity#getComponent}
 * */
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
    /**
     * Retrieves a component by Component type see {@Link ComponentType}
     * and casts it to any parameter that extends Component see {@Link Component}
     * @param {string} componentName
     * @return {Component} component
     * */
    getComponent(componentName) {
        return this._components.get(componentName);
    }
    update() {
        this._components.forEach((componentType) => {
            this._components.get(componentType.name).update();
        });
    }
    /**
     * Loads an array of components {@Link Component} to an entity
     * and then returns the entity
     * @param {Array<Component>} components
     * @return {Entity} this
     * */
    withComponent(components) {
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            return this;
        }
    }
    get components() {
        return this._components;
    }
    get sprite() {
        return this._sprite;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map