import {Sounds} from '../constants/GameConstants';

export class SoundPlayer {
  private static _game: Phaser.Game;
  private static _missileSound: Phaser.Sound;
  private static _mainMenuSound: Phaser.Sound;
  private static _gameMusic: Phaser.Sound;

  public static init(game: Phaser.Game) {
    this._game = game;
    this._missileSound = game.add.audio(Sounds.MISSILE_FIRE);
    this._mainMenuSound = game.add.audio(Sounds.MAIN_MENU);
    this._gameMusic = game.add.audio(Sounds.GAME_MUSIC);
  }

  public static playSound(sound: Sounds) {
    switch (sound) {
      case Sounds.MISSILE_FIRE:
        this._missileSound.play();
        break;
      case Sounds.MAIN_MENU:
        this._mainMenuSound.play(null, null, 0.6, true);
        break;
      case Sounds.GAME_MUSIC:
        this._gameMusic.play(null, null, 0.6, true);
        break;
      default:
        break;
    }
  }
  public static stopSound(sound: Sounds) {
    switch (sound) {
      case Sounds.MISSILE_FIRE:
        this._missileSound.stop();
        break;
      case Sounds.MAIN_MENU:
        this._mainMenuSound.stop();
        break;
      case Sounds.GAME_MUSIC:
        this._gameMusic.stop();
        break;
      default:
        break;
    }
  }
}
