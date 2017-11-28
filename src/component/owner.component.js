"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class OwnerComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.OWNER);
    }
    set owner(owner) {
        this._owner = owner;
    }
    get owner() {
        return this._owner;
    }
}
exports.OwnerComponent = OwnerComponent;
//# sourceMappingURL=owner.component.js.map