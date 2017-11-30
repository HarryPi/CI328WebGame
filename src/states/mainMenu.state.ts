import State from './state';
import AssetsUtils from '../UI/Assets';
import { MenuConfig } from '../config/menu.config';
import { Levels, MainMenuButtons, States, UIComponents } from '../constants/GameConstants';
import { DataConfig } from '../config/data.config';
import Vector from '../util/vector';

export class MainMenuState extends State {
  preload(){

  }
  create(){
    // the only reason for this is so we can fade them out
    const preferences: string = 'preference_group';
    const gameMenu: string = 'game_menu_group';
    const levels: string = 'level_menu_group';

    let config: MenuConfig = AssetsUtils.drawMainMenu(this);
    let initialMenuSprites: Array<Phaser.Sprite> = config.allSprites;

    config.setSpriteGroup(gameMenu, initialMenuSprites);

    config.getSprite(MainMenuButtons.NEW_GAME).events.onInputDown.add( () => {
      config.fakeTileMap.destroy();
      this.game.state.start(States.GAME_STATE);
    });

    config.getSprite(MainMenuButtons.PREFERENCES).events.onInputDown.add( () => {
      AssetsUtils.fadeoutSprites(this, config.getSpriteGroup(gameMenu)).then(() => {
        // Preference menu is being displayed
        // Keep this so we can add events on new sprites
        let prefConfig = AssetsUtils.drawPreferences(this);

        config.setSpriteGroup(preferences, prefConfig.allSprites);

        prefConfig.getSprite(MainMenuButtons.SELECT_LEVEL).events.onInputDown.add( () => {
          AssetsUtils.fadeoutSprites(this, config.getSpriteGroup(preferences)).then( () => {
            // Preference menu has faded out
            let levConfig = AssetsUtils.drawLevels(this);
            // Get x,y of last sprite created
            let lastSprite = levConfig.allSprites[levConfig.allSprites.length - 1];
            let vec = new Vector(lastSprite.x, lastSprite.y);

            AssetsUtils.drawAcceptCancelButtons(new Vector(vec.x, vec.y + 100), new Vector(vec.x + 46, vec.y + 100), this);

            // Now levels menu is being displayed
            config.setSpriteGroup(levels, levConfig.allSprites);
            levConfig.getSprite(UIComponents.LEVEL_ONE_IMAGE).events.onInputDown.add( () => {
              DataConfig.level = Levels.LEVEL_ONE; // Store selected level
            });

          }); // End Fadeout Promise;
        }); // End Event;

      });
    });

  }
  update(){

  }
}
