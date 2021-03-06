"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
class SoundPlayer {
    static init(game) {
        return new Promise((resolve) => {
            this._game = game;
            this._missileSound = game.add.audio(GameConstants_1.Sounds.MISSILE_FIRE);
            this._mainMenuSound = game.add.audio(GameConstants_1.Sounds.MAIN_MENU);
            this._gameMusic = game.add.audio(GameConstants_1.Sounds.GAME_MUSIC);
            this._explosionMusic = game.add.audio(GameConstants_1.Sounds.EXPLOSION);
            game.sound.setDecodedCallback([this._gameMusic, this._mainMenuSound, this._missileSound, this._explosionMusic], () => resolve(), this);
        });
    }
    static playSound(sound) {
        switch (sound) {
            case GameConstants_1.Sounds.MISSILE_FIRE:
                this._missileSound.play(null, null, 0.6, false);
                break;
            case GameConstants_1.Sounds.EXPLOSION:
                this._explosionMusic.play(null, null, 0.6, false);
                break;
            case GameConstants_1.Sounds.MAIN_MENU:
                this._mainMenuSound.play(null, null, 0.6, true);
                break;
            case GameConstants_1.Sounds.GAME_MUSIC:
                this._gameMusic.play(null, null, 0.6, true);
                break;
            default:
                break;
        }
    }
    static stopSound(sound) {
        switch (sound) {
            case GameConstants_1.Sounds.MISSILE_FIRE:
                this._missileSound.stop();
                break;
            case GameConstants_1.Sounds.EXPLOSION:
                this._explosionMusic.stop();
                break;
            case GameConstants_1.Sounds.MAIN_MENU:
                this._mainMenuSound.stop();
                break;
            case GameConstants_1.Sounds.GAME_MUSIC:
                this._gameMusic.stop();
                break;
            default:
                break;
        }
    }
}
exports.SoundPlayer = SoundPlayer;
//# sourceMappingURL=SoundPlayer.js.map