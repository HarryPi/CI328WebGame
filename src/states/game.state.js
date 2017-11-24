"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const input_1 = require("../util/input");
const TankWorldFactory_1 = require("../TankWorldFactory");
const GameConstants_1 = require("../constants/GameConstants");
class GameState extends state_1.default {
    constructor() {
        super();
        this._input = new input_1.default();
    }
    preload() {
        // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
        this._factory = new TankWorldFactory_1.default(this.game);
    }
    create() {
        // Input
        let player = this._factory.newPlayer();
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.InputType.RIGHT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.InputType.LEFT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), GameConstants_1.InputType.SHOOT);
        this._inputSubscription = this._input.emitter.subscribe((input) => {
            input !== GameConstants_1.InputType.SHOOT.toString() ? player.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = input
                : player.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = true;
        });
        this._factory.newEnemy();
    }
    update() {
        this._input.run();
        this._factory.entities.forEach((e) => {
            e.update();
        });
    }
    shutdown() {
        // Ensure no memory leaks
        this._inputSubscription.unsubscribe();
    }
}
exports.GameState = GameState;
//# sourceMappingURL=game.state.js.map