"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const GameConstants_1 = require("../constants/GameConstants");
const Assets_1 = require("../util/Assets");
class BootState extends state_1.default {
    constructor() {
        super();
    }
    preload() {
        Assets_1.default.init(this.load);
        Assets_1.default.loadBoot();
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.scale.setGameSize(window.innerWidth, window.innerHeight);
    }
    create() {
        this.game.stage.backgroundColor = '#FFF';
        this.game.state.start(GameConstants_1.States.PRELOAD_STATE);
    }
}
exports.BootState = BootState;
//# sourceMappingURL=boot.state.js.map