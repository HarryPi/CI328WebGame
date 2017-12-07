"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = require("../UI/Assets");
const GameConstants_1 = require("../constants/GameConstants");
const MenuManager_1 = require("../UI/MenuManager");
const TankWorldFactory_1 = require("../TankWorldFactory");
const input_1 = require("../util/input");
const data_config_1 = require("../config/data.config");
const levels_tankLevels_1 = require("../config/levels/levels.tankLevels");
var LevelOne = levels_tankLevels_1.TankGameLevels.LevelOne;
var LevelTwo = levels_tankLevels_1.TankGameLevels.LevelTwo;
var GameStates;
(function (GameStates) {
    class GameState extends Phaser.State {
    }
    GameStates.GameState = GameState;
    class BootState extends GameState {
        constructor() {
            super();
        }
        init(args) {
            this._args = args;
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
            this.game.state.start(GameConstants_1.States.PRELOAD_STATE, true, false, this._args);
        }
    }
    GameStates.BootState = BootState;
    class GameoverState extends GameState {
        init(args) {
            this._args = args;
        }
        preload() {
        }
        create() {
            MenuManager_1.MenuManager.drawGameOver(this);
        }
        update() {
        }
    }
    GameStates.GameoverState = GameoverState;
    class MainGameState extends GameState {
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
            this._levels.set(GameConstants_1.Levels.LEVEL_ONE, new LevelOne(this.game));
            this._levels.set(GameConstants_1.Levels.LEVEL_TWO, new LevelTwo(this.game));
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
            for (let i = 0; i < 6; i++) {
                this._factory.newDisaster();
            }
        }
        spawnEnemiesAsCurrentLevel() {
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
    GameStates.MainGameState = MainGameState;
    class MainMenuState extends GameState {
        init(args) {
            this._args = args;
        }
        preload() {
        }
        create() {
            let config = MenuManager_1.MenuManager.drawMainMenu(this);
            this.game.camera.unfollow();
            config.allSprites.forEach((sprite) => {
                // This is when the game restars
                // The sprites must be set to top and visible otherwise will be hidden
                sprite.bringToTop();
                sprite.visible = true;
            });
        }
        update() {
        }
    }
    GameStates.MainMenuState = MainMenuState;
    class PreloadState extends GameState {
        constructor() {
            super();
            this._args = {};
        }
        init(args) {
            this._args = args;
        }
        preload() {
            MenuManager_1.MenuManager.setLoadingScreen(this);
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
    GameStates.PreloadState = PreloadState;
})(GameStates = exports.GameStates || (exports.GameStates = {}));
//# sourceMappingURL=gameStates.js.map