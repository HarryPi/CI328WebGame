"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(name) {
        this._requiredComponents = [];
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
    validateComponentRequirements() {
        let errorString = '';
        this._requiredComponents.forEach((comp) => {
            if (!this._target.getComponent(comp)) {
                errorString += `Missing component: ${comp.toString()} from component: ${this._name}}`;
            }
        });
        if (errorString) {
            throw new Error(errorString);
        }
    }
    update() { }
}
exports.Component = Component;
//# sourceMappingURL=component.js.map