import {Difficulty, MainMenuButtons, UIComponents} from '../constants/GameConstants';

/**
 * @class
 * As the only way to create a menu in phaser is sprites we need a class to store and retrieve them
 * */
export class MenuConfig {
  private _mapSprites: Map<MainMenuButtons | UIComponents | Difficulty, Phaser.Sprite>;
  private _spriteGroups: Map<string, Array<Phaser.Sprite>>;
  private _fakeTileMap: Phaser.Tilemap;

  constructor() {
    this._mapSprites = new Map();
    this._spriteGroups = new Map();
  }

  /**
   * @description
   * returns the matching sprite
   * @param {MainMenuButtons | UIComponents} name
   * @return {Phaser.Sprite} sprite
   * */
  public getSprite(name: MainMenuButtons | UIComponents | Difficulty): Phaser.Sprite {
    return this._mapSprites.get(name);
  }

  public setSprite(name: MainMenuButtons | UIComponents | Difficulty, sprite: Phaser.Sprite) {
    if (!this._mapSprites.has(name)) {
      this._mapSprites.set(name, sprite);
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
    this._mapSprites.forEach((value: Phaser.Sprite) => {
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
