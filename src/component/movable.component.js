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
var component_1 = require("./component");
var GameConstants_1 = require("../constants/GameConstants");
var MovableComponent = /** @class */ (function (_super) {
    __extends(MovableComponent, _super);
    function MovableComponent() {
        var _this = _super.call(this, GameConstants_1.ComponentType.MOVABLE) || this;
        _this._speed = 100;
        _this._isMoving = false;
        return _this;
    }
    MovableComponent.prototype.moveRight = function () {
    };
    MovableComponent.prototype.moveLeft = function () {
    };
    MovableComponent.prototype.stop = function () {
    };
    MovableComponent.prototype.update = function () {
    };
    return MovableComponent;
}(component_1.Component));
exports.MovableComponent = MovableComponent;
//# sourceMappingURL=movable.component.js.map