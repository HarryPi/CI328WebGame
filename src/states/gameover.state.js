"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const Assets_1 = require("../UI/Assets");
class GameoverState extends state_1.default {
    init(args) {
        this._args = args;
    }
    preload() {
    }
    create() {
        Assets_1.default.drawGameOver(this);
    }
    update() {
    }
}
exports.GameoverState = GameoverState;
//# sourceMappingURL=gameover.state.js.map