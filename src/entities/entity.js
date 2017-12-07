"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const Subject_1 = require("rxjs/Subject");
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
        this._whenDestroyed = new Subject_1.Subject();
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
        }
        this._sprite = game.add.sprite(x, y, GameConstants_1.TankLayout.TANK_SPRITESHEET);
        this._components.forEach((comp) => {
            comp.validateComponentRequirments();
        });
    }
    addComponent(component) {
        this._components.set(component.name, component);
        this._components.get(component.name).target = this;
        return component;
    }
    hasComponent(componentName) {
        return this._components.has(componentName);
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
    destroy() {
        try {
            this._components.clear();
            this._sprite.destroy();
            this._whenDestroyed.next();
        }
        catch (e) {
            this._whenDestroyed.error(e);
        }
    }
    get whenDestroyed() {
        return this._whenDestroyed;
    }
    get sprite() {
        return this._sprite;
    }
}
exports.Entity = Entity;
//# sourceMappingURL=entity.js.map