import State from './state';
import AssetsUtils from '../UI/Assets';
import { MenuConfig } from '../config/menu.config';


export class GameoverState extends State {
  private _args;
  init(args) {
    this._args = args;
  }
  preload(){

  }
  create(){
    AssetsUtils.drawGameOver(this);
  }
  update(){

  }
}

