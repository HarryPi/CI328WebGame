"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const MenuManager_1 = require("../UI/MenuManager");
class MainMenuState extends state_1.default {
    init(args) {
        this._args = args;
    }
    preload() {
    }
    create() {
        let config = MenuManager_1.MenuManager.drawMainMenu(this);
        this.game.camera.unfollow();
        config.allSprites.forEach((sprite) => {
            // This is when the game restars
            // The sprites must be set to top and visible otherwise will be hidden
            sprite.bringToTop();
            sprite.visible = true;
            console.log(sprite);
        });
    }
    update() {
    }
}
exports.MainMenuState = MainMenuState;
//# sourceMappingURL=mainMenu.state.js.map