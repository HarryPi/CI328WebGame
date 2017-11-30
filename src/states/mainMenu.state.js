"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const Assets_1 = require("../UI/Assets");
class MainMenuState extends state_1.default {
    preload() {
    }
    create() {
        // the only reason for this is so we can fade them out
        const preferences = 'preference_group';
        const gameMenu = 'game_menu_group';
        const levels = 'level_menu_group';
        let arr = []; // Keep ok/cance reference
        let config = Assets_1.default.drawMainMenu(this);
    }
    update() {
    }
}
exports.MainMenuState = MainMenuState;
//# sourceMappingURL=mainMenu.state.js.map