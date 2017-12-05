"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const input_1 = require("../util/input");
const TankWorldFactory_1 = require("../TankWorldFactory");
const GameConstants_1 = require("../constants/GameConstants");
const levelOne_1 = require("../config/levels/levelOne");
const levelTwo_1 = require("../config/levels/levelTwo");
const data_config_1 = require("../config/data.config");
class GameState extends state_1.default {
    constructor() {
        super();
        this._score = 0;
        // keep record of spawn time in miliseconds
        this._timer = 0;
        this._input = new input_1.default();
        this._levels = new Map();
    }
    preload() {
        // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
        this._levels.set(GameConstants_1.Levels.LEVEL_ONE, new levelOne_1.LevelOne(this.game));
        this._levels.set(GameConstants_1.Levels.LEVEL_TWO, new levelTwo_1.LevelTwo(this.game));
        this._factory = new TankWorldFactory_1.default(this.game, this);
        this._factory.currentLevel = this._levels.get(data_config_1.DataConfig.level);
        this._factory.init(); // Initialise collision groups
    }
    create() {
        // Input
        let player = this._factory.newPlayer();
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.InputType.RIGHT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.InputType.LEFT_INPUT);
        this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), GameConstants_1.InputType.SHOOT);
        // Subscribe to inputs
        this._inputSubscription = this._input.emitter.subscribe((input) => {
            input !== GameConstants_1.InputType.SHOOT.toString() ? player.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = input
                : player.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = true;
        });
        this._scoreText = this.game.add.text(this.game.world.left + 50, this.game.world.top, `Score: ${this._score}`, { font: '22px Arial', fill: '#ff0044' });
        this._scoreText.fixedToCamera = true;
        this.game.time.events.add(Phaser.Timer.SECOND * 5, this.generateRandomEventFromCurrentLevel, this);
    }
    update() {
        this.spawnEnemiesAsCurrentLevel();
        this._input.run();
        this._factory.entities.forEach((e) => {
            e.update();
        });
    }
    shutdown() {
        // Ensure no memory leaks
        this._inputSubscription.unsubscribe();
        this._factory.cleanUp();
    }
    generateRandomEventFromCurrentLevel() {
        console.log('random disaster');
        if (this._factory.currentLevel) {
            for (let i = 0; i < 6; i++) {
                this._factory.newDisaster();
            }
        }
    }
    spawnEnemiesAsCurrentLevel() {
        if (this._factory.currentLevel) {
            if (typeof this._factory.currentLevel.enemiesCount === 'number' && this._factory.currentLevel.enemiesSpawnTime) {
                // typeof is there as enemiesCount can be 0 and javascript considers that as false what we are looking to avoid is typeof 'undefined'
                if (this._factory.currentLevel.enemiesCount < this._factory.currentLevel.capEnemies) {
                    if (Date.now() - this._timer > this._factory.currentLevel.enemiesSpawnTime * 1000) {
                        this._factory.newEnemy(() => {
                            this._score += 100;
                            this._scoreText.setText(`Score: ${this._score}`);
                        });
                        this._factory.currentLevel.enemiesCount++;
                        this._timer = Date.now();
                    }
                }
            }
        }
    }
}
exports.GameState = GameState;
//# sourceMappingURL=game.state.js.map