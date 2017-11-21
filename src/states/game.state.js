"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const world_service_1 = require("../serivce/world.service");
const input_1 = require("../util/input");
const TankWorldFactory_1 = require("../TankWorldFactory");
const levelOne_1 = require("../config/levels/levelOne");
const GameConstants_1 = require("../constants/GameConstants");
const behaviour_service_1 = require("../serivce/behaviour.service");
class GameState extends state_1.default {
    constructor() {
        super();
        this._entities = [];
        this._input = new input_1.default();
    }
    preload() {
        // Setup level todo: Make this to be user selected
        world_service_1.default.level = new levelOne_1.LevelOne(this.game);
        world_service_1.default.initLevel();
    }
    create() {
        // Input
        let player = TankWorldFactory_1.default.newPlayer(this.game);
        this._entities.push(player);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.Direction.RIGHT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.Direction.LEFT_INPUT);
        this._subscription = this._input.emitter.subscribe((val) => {
            behaviour_service_1.default.moveEntity(player, val);
        });
    }
    update() {
        this._input.run();
        this._entities.forEach((e) => {
            e.update();
        });
    }
    shutdown() {
        // Ensure no memory leaks
        this._subscription.unsubscribe();
    }
}
exports.GameState = GameState;
//# sourceMappingURL=game.state.js.map