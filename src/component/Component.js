"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var Component = /** @class */ (function () {
    function Component(name) {
        this._name = name;
        this._physicsEngine = Phaser.Physics.P2JS;
    }
    Object.defineProperty(Component.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "target", {
        get: function () {
            return this._target;
        },
        set: function (target) {
            this._target = target;
            index_1.default.physics.enable(target, this._physicsEngine);
        },
        enumerable: true,
        configurable: true
    });
    Component.prototype.update = function () {
    };
    return Component;
}());
exports.Component = Component;
//# sourceMappingURL=Component.js.map