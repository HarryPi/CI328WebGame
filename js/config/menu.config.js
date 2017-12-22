"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * As the only way to create a menu in phaser is sprites we need a class to store and retrieve them
 * */
class MenuConfig {
    constructor() {
        this._mapSprites = new Map();
        this._spriteGroups = new Map();
    }
    /**
     * @description
     * returns the matching sprite
     * @param {MainMenuButtons | UIComponents} name
     * @return {Phaser.Sprite} sprite
     * */
    getSprite(name) {
        return this._mapSprites.get(name);
    }
    setSprite(name, sprite) {
        if (!this._mapSprites.has(name)) {
            this._mapSprites.set(name, sprite);
        }
    }
    setSpriteGroup(name, spriteArr) {
        if (!this._spriteGroups.has(name)) {
            this._spriteGroups.set(name, spriteArr);
        }
    }
    getSpriteGroup(name) {
        return this._spriteGroups.get(name);
    }
    get allSprites() {
        let arr = [];
        this._mapSprites.forEach((value) => {
            arr.push(value);
        });
        return arr;
    }
    get fakeTileMap() {
        return this._fakeTileMap;
    }
    set fakeTileMap(value) {
        this._fakeTileMap = value;
    }
}
exports.MenuConfig = MenuConfig;
//# sourceMappingURL=menu.config.js.map