"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("rxjs/Subject");
class Input {
    constructor() {
        this._map = new Map();
        this._emitter = new Subject_1.Subject();
    }
    add(condition, action) {
        this._map.set(condition, action);
    }
    run() {
        this._map.forEach((value, key) => {
            if (key instanceof Phaser.SignalBinding) {
            }
            if (key.isDown) {
                this._emitter.next(value);
            }
        });
    }
    get emitter() {
        return this._emitter;
    }
}
exports.default = Input;
//# sourceMappingURL=input.js.map