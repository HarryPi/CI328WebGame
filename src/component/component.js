"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get target() {
        return this._target;
    }
    set target(target) {
        this._target = target;
    }
    validateComponentRequirements(components) {
        components.forEach((comp) => {
            if (!this.target.getComponent(comp)) {
                throw new Error(`Failed to find required component ${comp}`);
            }
        });
    }
    update(params) { }
}
exports.Component = Component;
//# sourceMappingURL=component.js.map