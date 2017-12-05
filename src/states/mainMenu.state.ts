import State from './state';
import AssetsUtils from '../UI/Assets';
import { MenuConfig } from '../config/menu.config';
import { Levels, MainMenuButtons, States, UIComponents } from '../constants/GameConstants';
import { DataConfig } from '../config/data.config';
import Vector from '../util/vector';
import {Extras, IStateMessanger} from '../util/IStateMessanger';
import {MenuManager} from '../UI/MenuManager';

export class MainMenuState extends State {
  private _args;
  init(args) {
   this._args = args;
  }
  preload(){

  }
  create(){
    let config: MenuConfig = MenuManager.drawMainMenu(this);
    this.game.camera.unfollow();
    config.allSprites.forEach((sprite: Phaser.Sprite) => {
      // This is when the game restars
      // The sprites must be set to top and visible otherwise will be hidden
      sprite.bringToTop();
      sprite.visible = true;
      console.log(sprite);
    });

  }
  update(){

  }
}

