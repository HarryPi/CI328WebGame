"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const Assets_1 = require("../UI/Assets");
const GameConstants_1 = require("../constants/GameConstants");
class MainMenuState extends state_1.default {
    preload() {
    }
    create() {
        // the only reason for this is so we can fade them out
        const preferences = 'preference_group';
        const gameMenu = 'game_menu_group';
        const levels = 'level_menu_group';
        let config = Assets_1.default.drawMainMenu(this);
        let initialMenuSprites = config.allSprites;
        config.setSpriteGroup(gameMenu, initialMenuSprites);
        config.getSprite(GameConstants_1.MainMenuButtons.NEW_GAME).events.onInputDown.add(() => {
            config.fakeTileMap.destroy();
            this.game.state.start(GameConstants_1.States.GAME_STATE);
        });
        config.getSprite(GameConstants_1.MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
            Assets_1.default.fadeoutSprites(this, config.getSpriteGroup(gameMenu)).then(() => {
                // Preference menu is being displayed
                // Keep this so we can add events on new sprites
                let prefConfig = Assets_1.default.drawPreferences(this);
                config.setSpriteGroup(preferences, prefConfig.allSprites);
                prefConfig.getSprite(GameConstants_1.MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
                    Assets_1.default.fadeoutSprites(this, config.getSpriteGroup(preferences)).then(() => {
                        // Preference menu has faded out
                        let levConfig = Assets_1.default.drawLevels(this);
                        // Know levels menu is being displayed
                    });
                });
            });
        });
    }
    update() {
    }
}
exports.MainMenuState = MainMenuState;
//# sourceMappingURL=mainMenu.state.js.map