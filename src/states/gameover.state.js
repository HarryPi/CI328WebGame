"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const MenuManager_1 = require("../UI/MenuManager");
class GameoverState extends state_1.default {
    init(args) {
        this._args = args;
    }
    preload() {
    }
    create() {
        MenuManager_1.MenuManager.drawGameOver(this);
    }
    update() {
    }
}
exports.GameoverState = GameoverState;
//# sourceMappingURL=gameover.state.js.map