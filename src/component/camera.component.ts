import { ComponentType } from '../constants/GameConstants';
import { Component } from './component';
import { Entity } from '../entities/entity';

export class CameraComponent extends Component{
  private _game: Phaser.Game;

  constructor(game: Phaser.Game) {
    super(ComponentType.CAMERA);
    this._game = game;
  }
  setFocus(entity: Phaser.Sprite) {
    this._game.camera.focusOn(entity);
  }
}
