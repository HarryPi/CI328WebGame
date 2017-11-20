"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var world_1 = require("../world");
var WorldService = /** @class */ (function () {
    function WorldService() {
    }
    Object.defineProperty(WorldService, "game", {
        set: function (value) {
            this._game = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorldService, "level", {
        get: function () {
            return this._level;
        },
        set: function (value) {
            this._level = value;
        },
        enumerable: true,
        configurable: true
    });
    WorldService.initLevel = function () {
        this._world = new world_1.default(this._game);
        this._level.init();
    };
    Object.defineProperty(WorldService, "world", {
        get: function () {
            return this._world;
        },
        set: function (value) {
            this._world = value;
        },
        enumerable: true,
        configurable: true
    });
    return WorldService;
}());
exports.default = WorldService;
//# sourceMappingURL=world.service.js.map