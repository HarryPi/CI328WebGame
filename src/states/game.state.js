"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const world_service_1 = require("../serivce/world.service");
const input_1 = require("../util/input");
const levelOne_1 = require("../config/levels/levelOne");
const GameConstants_1 = require("../constants/GameConstants");
const entity_1 = require("../entities/entity");
const movable_component_1 = require("../component/movable.component");
const camera_component_1 = require("../component/camera.component");
class GameState extends state_1.default {
    constructor() {
        super();
        this._input = new input_1.default();
    }
    preload() {
        // Setup level todo: Make this to be user selected
        world_service_1.default.level = new levelOne_1.LevelOne(this.game);
        world_service_1.default.initLevel();
    }
    create() {
        let player = new entity_1.Entity(this.game, world_service_1.default.level.playerStartPos.x, world_service_1.default.level.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(), new camera_component_1.CameraComponent(this.game)]);
        // Input
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.InputType.RIGHT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.InputType.LEFT_INPUT);
        this.subscription = this._input.emitter.subscribe((val) => {
            let playerC = player.getComponent(GameConstants_1.ComponentType.MOVABLE);
            playerC.move(val);
        });
    }
    update() {
        this._input.run();
    }
    shutdown() {
        this.subscription.unsubscribe();
    }
}
exports.GameState = GameState;
//# sourceMappingURL=game.state.js.map