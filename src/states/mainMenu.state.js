"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const Assets_1 = require("../UI/Assets");
const GameConstants_1 = require("../constants/GameConstants");
const data_config_1 = require("../config/data.config");
const vector_1 = require("../util/vector");
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
                        // Get x,y of last sprite created
                        let lastSprite = levConfig.allSprites[levConfig.allSprites.length - 1];
                        let vec = new vector_1.default(lastSprite.x, lastSprite.y);
                        Assets_1.default.drawAcceptCancelButtons(new vector_1.default(vec.x, vec.y + 100), new vector_1.default(vec.x + 46, vec.y + 100), this);
                        // Now levels menu is being displayed
                        config.setSpriteGroup(levels, levConfig.allSprites);
                        levConfig.getSprite(GameConstants_1.UIComponents.LEVEL_ONE_IMAGE).events.onInputDown.add(() => {
                            data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_ONE; // Store selected level
                        });
                    }); // End Fadeout Promise;
                }); // End Event;
            });
        });
    }
    update() {
    }
}
exports.MainMenuState = MainMenuState;
//# sourceMappingURL=mainMenu.state.js.map