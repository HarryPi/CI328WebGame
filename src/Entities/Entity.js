"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Entity = /** @class */ (function () {
    function Entity() {
    }
    Entity.prototype.addComponent = function (component) {
        this._components[component.name] = component;
        this._components[component.name].target(this);
        return component;
    };
    /*
      protected create(){
        this.addComponent();
      }
    */
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
//# sourceMappingURL=entity.js.map