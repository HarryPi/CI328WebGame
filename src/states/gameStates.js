"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = require("../UI/Assets");
const GameConstants_1 = require("../constants/GameConstants");
const TankWorldFactory_1 = require("../TankWorldFactory");
const input_1 = require("../util/input");
const data_config_1 = require("../config/data.config");
const levels_tankLevels_1 = require("../config/levels/levels.tankLevels");
const math_util_1 = require("../util/math.util");
const uimanagers_1 = require("../UI/uimanagers");
var LevelOne = levels_tankLevels_1.TankGameLevels.LevelOne;
var LevelTwo = levels_tankLevels_1.TankGameLevels.LevelTwo;
var GameStates;
(function (GameStates) {
    var MenuManager = uimanagers_1.UiManagers.MenuManager;
    var PlayerVisualsManager = uimanagers_1.UiManagers.PlayerVisualsManager;
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
            MenuManager.drawGameOver(this, this._args.score);
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
            this._disasterTimer = 0;
            this._activeDisasters = 0;
            this._input = new input_1.default();
            this._levels = new Map();
        }
        preload() {
            // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
            this._levels.set(GameConstants_1.Levels.LEVEL_ONE, new LevelOne(this.game));
            this._levels.set(GameConstants_1.Levels.LEVEL_TWO, new LevelTwo(this.game));
            this._activeLevel = data_config_1.DataConfig.level;
            this._levels.get(this._activeLevel).init();
            this._factory = new TankWorldFactory_1.default(this.game, this);
            this._factory.init(this._levels.get(this._activeLevel).collisionLayer); // Initialise collision groups
        }
        create() {
            const playerUIBuilder = new PlayerVisualsManager(this);
            const activeLevel = this._levels.get(this._activeLevel);
            // Subscribe to game winning condition
            // Input
            this._player = this._factory.newPlayer(activeLevel.playerStartPos.x, activeLevel.playerStartPos.y);
            let sub = this._player.whenDestroyed.subscribe(() => {
                this.game.state.start(GameConstants_1.States.GAMEOVER_SATE, true, false, { score: this._score });
                sub.unsubscribe();
            });
            playerUIBuilder.displayPlayerMaxHealth();
            MenuManager.drawPauseMenu(this);
            let gamewon = activeLevel.whenStageCleared.subscribe(() => {
                MenuManager.drawYouWonMenu();
            });
            const physicsComponent = this._player.getComponent(GameConstants_1.ComponentType.PHYSICS);
            this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.InputType.RIGHT_INPUT);
            this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.InputType.LEFT_INPUT);
            this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR), GameConstants_1.InputType.SHOOT);
            // Subscribe to inputs
            this._inputSubscription = this._input.emitter.subscribe((input) => {
                if (input !== GameConstants_1.InputType.SHOOT.toString()) {
                    this._player.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = input;
                    if (input === GameConstants_1.InputType.RIGHT_INPUT) {
                        physicsComponent.scaleSprite(1);
                    }
                    else {
                        physicsComponent.scaleSprite(-1);
                    }
                }
                else {
                    this._player.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = true;
                }
            });
            this._scoreText = this.game.add.text(this.game.world.left + 50, this.game.world.top, `Score: ${this._score}`, {
                font: '22px Arial',
                fill: '#ff0044'
            });
            this._scoreText.fixedToCamera = true;
        }
        update() {
            if (this.canSpawnDisaster()) {
                this.spawnDisaster();
            }
            if (this.canSpawnEnemy()) {
                this.spawnEnemies();
            }
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
        spawnDisaster() {
            this._factory.newDisaster(this._player.sprite.x + 100 * math_util_1.MathUtil.randomIntFromInterval(-10, 10), this.game.world.top);
            this._activeDisasters++;
            if (this._activeDisasters >= 7) {
                this._disasterTimer = Date.now();
                this._activeDisasters = 0;
            }
        }
        canSpawnEnemy() {
            let activeLevel = this._levels.get(this._activeLevel);
            if (activeLevel.enemiesCount < activeLevel.capEnemies && activeLevel.totalEnemies !== 0) {
                if (Date.now() - this._timer > activeLevel.enemiesSpawnTime * 1000) {
                    return true;
                }
            }
            return false;
        }
        spawnEnemies() {
            const activeLevel = this._levels.get(this._activeLevel);
            const enemyKind = activeLevel.getRandomEnemy();
            let random = math_util_1.MathUtil.randomIntFromInterval(0, 1);
            const spawningPoint = new Phaser.Point(getSpawningPointX(), getSpawningPointY());
            this._factory.newEnemy(enemyKind, spawningPoint.x, spawningPoint.y, () => {
                activeLevel.enemiesCount--;
                this._score += 100;
                this._scoreText.setText(`Score: ${this._score}`);
            });
            this._timer = Date.now();
            function getSpawningPointX() {
                return random === 0 ? activeLevel.playerStartPos.x : activeLevel.enemyStartPos.x;
            }
            function getSpawningPointY() {
                return random === 0 ? activeLevel.playerStartPos.y : activeLevel.enemyStartPos.y;
            }
        }
        canSpawnDisaster() {
            const activeLevel = this._levels.get(this._activeLevel);
            if (Date.now() - this._disasterTimer > activeLevel.randomDisasterSpawnTime) {
                return true;
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
            let config = MenuManager.drawMainMenu(this);
            this.game.camera.unfollow(); // stop following the main menu
            config.allSprites.forEach((sprite) => {
                // This is when the game restart
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
            MenuManager.setLoadingScreen(this);
            // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
            Assets_1.default.loadAll();
            // Set World variables
            this.game.physics.startSystem(Phaser.Physics.P2JS);
            this.game.physics.p2.gravity.y = 1400;
            this.game.physics.p2.setImpactEvents(true);
            this.game.physics.p2.setBoundsToWorld(true, true, false, true);
        }
        create() {
            this.game.state.start(GameConstants_1.States.MAIN_MENU_STATE, true, false, this._args);
        }
        update() {
        }
    }
    GameStates.PreloadState = PreloadState;
})(GameStates = exports.GameStates || (exports.GameStates = {}));
//# sourceMappingURL=gameStates.js.map