import {MainMenuButtons, UIComponents} from '../constants/GameConstants';

export class MenuConfig {
  private _mainMenuSprites: Map<MainMenuButtons, Phaser.Sprite>;
  private _spriteGroups: Map<string, Array<Phaser.Sprite>>;
  private _fakeTileMap: Phaser.Tilemap;

  constructor() {
    this._mainMenuSprites = new Map();
    this._spriteGroups = new Map();
  }

  public getSprite(name: MainMenuButtons): Phaser.Sprite {
    return this._mainMenuSprites.get(name);
  }

  public setSprite(name: MainMenuButtons, sprite: Phaser.Sprite) {
    if (!this._mainMenuSprites.has(name)) {
      this._mainMenuSprites.set(name, sprite);
    }
  }

  public setSpriteGroup(name: string, spriteArr: Phaser.Sprite[]) {
    if (!this._spriteGroups.has(name)) {
      this._spriteGroups.set(name, spriteArr);
    }
  }

  public getSpriteGroup(name: string): Phaser.Sprite[] {
    return this._spriteGroups.get(name);
  }

  get allSprites() {
    let arr: Phaser.Sprite[] = [];
    this._mainMenuSprites.forEach((value: Phaser.Sprite) => {
      arr.push(value);
    });
    return arr;
  }

  get fakeTileMap(): Phaser.Tilemap {
    return this._fakeTileMap;
  }

  set fakeTileMap(value: Phaser.Tilemap) {
    this._fakeTileMap = value;
  }
}
