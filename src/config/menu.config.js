"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MenuConfig {
    constructor() {
        this._mainMenuSprites = new Map();
        this._spriteGroups = new Map();
    }
    getSprite(name) {
        return this._mainMenuSprites.get(name);
    }
    setSprite(name, sprite) {
        if (!this._mainMenuSprites.has(name)) {
            this._mainMenuSprites.set(name, sprite);
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
        this._mainMenuSprites.forEach((value) => {
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