"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var movable_component_1 = require("../component/movable.component");
var Entity = /** @class */ (function () {
    function Entity() {
    }
    Entity.prototype.addComponent = function (component) {
        this._components[component.name] = component;
        this._components[component.name.toString()].target(this);
        return component;
    };
    Entity.prototype.create = function () {
        this.addComponent(new movable_component_1.MovableComponent());
    };
    Entity.prototype.update = function () {
        var _this = this;
        Object.keys(this._components).forEach(function (componentType) {
            _this._components[componentType.toString()].update();
        });
    };
    Object.defineProperty(Entity.prototype, "components", {
        get: function () {
            return this._components;
        },
        set: function (value) {
            this._components = value;
        },
        enumerable: true,
        configurable: true
    });
    return Entity;
}());
exports.Entity = Entity;
//# sourceMappingURL=Entity.js.map