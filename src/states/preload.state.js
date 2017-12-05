"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const GameConstants_1 = require("../constants/GameConstants");
const Assets_1 = require("../UI/Assets");
class PreloadState extends state_1.default {
    constructor() {
        super();
        this._args = {};
    }
    init(args) {
        this._args = args;
    }
    preload() {
        Assets_1.default.setLoadingScreen(this);
        // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
        Assets_1.default.loadAll();
        // Set World variables
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.setBoundsToWorld(true, true, false, true);
    }
    create() {
        // todo: Set main menu instead of level one
        this.game.state.start(GameConstants_1.States.MAIN_MENU_STATE, true, false, this._args);
    }
    update() {
    }
}
exports.PreloadState = PreloadState;
//# sourceMappingURL=preload.state.js.map