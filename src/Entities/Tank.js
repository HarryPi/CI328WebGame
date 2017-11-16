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
var Entity_1 = require("./Entity");
var Tank = /** @class */ (function (_super) {
    __extends(Tank, _super);
    function Tank() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tank.prototype.fire = function () {
        throw new Error('Not Implemented');
    };
    Object.defineProperty(Tank.prototype, "health", {
        get: function () {
            return this._health;
        },
        set: function (value) {
            this._health = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "layout", {
        get: function () {
            return this._layout;
        },
        set: function (value) {
            this._layout = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "speed", {
        get: function () {
            return this._speed;
        },
        set: function (value) {
            this._speed = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "rateOfFire", {
        get: function () {
            return this._rateOfFire;
        },
        set: function (value) {
            this._rateOfFire = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tank.prototype, "angleToFire", {
        get: function () {
            return this._angleToFire;
        },
        set: function (value) {
            this._angleToFire = value;
        },
        enumerable: true,
        configurable: true
    });
    return Tank;
}(Entity_1.Entity));
exports.Tank = Tank;
//# sourceMappingURL=Tank.js.map