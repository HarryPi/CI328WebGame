"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const Assets_1 = require("../util/Assets");
const GameConstants_1 = require("../constants/GameConstants");
const world_service_1 = require("../serivce/world.service");
class PreloadState extends state_1.default {
    constructor() {
        super();
        console.log(this.load);
    }
    preload() {
        Assets_1.default.setLoadingScreen(this);
        // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
        Assets_1.default.loadAll();
        // Init Services
        world_service_1.default.game = this.game;
    }
    create() {
        // todo: Set main menu instead of level one
        this.game.state.start(GameConstants_1.States.GAME_STATE);
    }
    update() {
    }
}
exports.PreloadState = PreloadState;
//# sourceMappingURL=preload.state.js.map