"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const world_1 = require("../world");
class WorldService {
    static set game(value) {
        this._game = value;
    }
    static get level() {
        return this._level;
    }
    static set level(value) {
        this._level = value;
    }
    static initLevel() {
        this._world = new world_1.default(this._game);
        this._level.init();
    }
    static get world() {
        return this._world;
    }
    static set world(value) {
        this._world = value;
    }
}
exports.default = WorldService;
//# sourceMappingURL=world.service.js.map