import State from './state';
import {MenuManager} from '../UI/MenuManager';


export class GameoverState extends State {
  private _args;
  init(args) {
    this._args = args;
  }
  preload(){

  }
  create(){
    MenuManager.drawGameOver(this);
  }
  update(){

  }
}

