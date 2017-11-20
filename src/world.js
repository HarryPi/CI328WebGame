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
var World = /** @class */ (function (_super) {
    __extends(World, _super);
    function World(game) {
        var _this = _super.call(this, game) || this;
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 1400;
        return _this;
    }
    Object.defineProperty(World.prototype, "player", {
        get: function () {
            return this._player;
        },
        enumerable: true,
        configurable: true
    });
    return World;
}(Phaser.World));
exports.default = World;
//# sourceMappingURL=world.js.map