"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var world_service_1 = require("../serivce/world.service");
var levelOne_1 = require("../config/levels/levelOne");
var GameState = /** @class */ (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super.call(this) || this;
    }
    GameState.prototype.preload = function () {
        world_service_1.default.level = new levelOne_1.LevelOne(this.game);
        world_service_1.default.initLevel();
    };
    GameState.prototype.create = function () {
    };
    return GameState;
}(state_1.default));
exports.GameState = GameState;
//# sourceMappingURL=game.state.js.map