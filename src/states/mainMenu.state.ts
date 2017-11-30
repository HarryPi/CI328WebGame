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

    let arr = []; // Keep ok/cance reference
    let config: MenuConfig = AssetsUtils.drawMainMenu(this);


  }
  update(){

  }
}
