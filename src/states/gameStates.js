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
const vector_1 = require("../util/vector");
const SoundPlayer_1 = require("../UI/SoundPlayer");
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
            this._args = {};
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
    class StageClearState extends GameState {
        init(args) {
            this._args = args;
        }
        preload() {
        }
        create() {
            SoundPlayer_1.SoundPlayer.stopSound(GameConstants_1.Sounds.GAME_MUSIC);
            SoundPlayer_1.SoundPlayer.playSound(GameConstants_1.Sounds.MAIN_MENU);
            MenuManager.drawYouWonMenu(this, this._args.score);
        }
        update() {
        }
    }
    GameStates.StageClearState = StageClearState;
    class GameoverState extends GameState {
        init(args) {
            this._args = args;
            SoundPlayer_1.SoundPlayer.stopSound(GameConstants_1.Sounds.GAME_MUSIC);
        }
        preload() {
        }
        create() {
            SoundPlayer_1.SoundPlayer.playSound(GameConstants_1.Sounds.MAIN_MENU);
            MenuManager.drawGameOver(this, this._args.score);
        }
        update() {
        }
        shutdown() {
            SoundPlayer_1.SoundPlayer.stopSound(GameConstants_1.Sounds.MAIN_MENU);
        }
    }
    GameStates.GameoverState = GameoverState;
    class MainGameState extends GameState {
        constructor() {
            super();
            // keep record of spawn time in miliseconds
            this._timer = 0;
            this._disasterTimer = 0;
            this._powerUpTimer = 0;
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
            this._score = 0;
        }
        create() {
            SoundPlayer_1.SoundPlayer.stopSound(GameConstants_1.Sounds.MAIN_MENU);
            SoundPlayer_1.SoundPlayer.playSound(GameConstants_1.Sounds.GAME_MUSIC);
            const playerUIBuilder = new PlayerVisualsManager(this);
            const activeLevel = this._levels.get(this._activeLevel);
            // Subscribe to game winning condition
            // Input
            this._player = this._factory.newPlayer(activeLevel.playerStartPos.x, activeLevel.playerStartPos.y, this);
            let sub = this._player.whenDestroyed.subscribe(() => {
                this.game.state.start(GameConstants_1.States.GAMEOVER_SATE, true, false, { score: this._score });
                sub.unsubscribe();
            });
            playerUIBuilder.displayPlayerMaxHealth();
            MenuManager.drawPauseMenu(this);
            const physicsComponent = this._player.getComponent(GameConstants_1.ComponentType.PHYSICS);
            this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT), GameConstants_1.InputType.RIGHT_INPUT);
            this._input.add(this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT), GameConstants_1.InputType.LEFT_INPUT);
            this._input.add(this.game.input.activePointer.leftButton, GameConstants_1.InputType.SHOOT);
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
            this._scoreText = this.game.add.text(this.game.world.left + 60, this.game.world.top, `Score: ${this._score}`, {
                font: '22px Arial',
                fill: '#ff0044'
            });
            this._scoreText.fixedToCamera = true;
            this._buttons = playerUIBuilder.buildControlButtons(this._input);
        }
        update() {
            const activeLevel = this._levels.get(this._activeLevel);
            if (this.game.input.activePointer.isDown && this._buttons[0].input.checkPointerOver(this.game.input.activePointer)) {
                this._input.emitter.next(GameConstants_1.InputType.LEFT_INPUT); // For mobile design check if left button is clicked
            }
            if (this.game.input.activePointer.isDown && this._buttons[1].input.checkPointerOver(this.game.input.activePointer)) {
                this._input.emitter.next(GameConstants_1.InputType.RIGHT_INPUT); // for mobile design check if right button is clicked
            }
            if (this.game.input.activePointer.isDown && !(this._buttons[1].input.checkPointerOver(this.game.input.activePointer) || this._buttons[0].input.checkPointerOver(this.game.input.activePointer))) {
                this._input.emitter.next(GameConstants_1.InputType.SHOOT); // for mobile design check if touch but not on buttons
            }
            if (this.canSpawnPowerUp(activeLevel)) {
                this.spawnPowerUp();
            }
            if (activeLevel.isCleared()) {
                this.game.state.start(GameConstants_1.States.STAGE_CLEAR_STATE, true, false, { score: this._score });
            }
            if (this.canSpawnDisaster(activeLevel)) {
                this.spawnDisaster();
            }
            if (this.canSpawnEnemy(activeLevel)) {
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
            SoundPlayer_1.SoundPlayer.stopSound(GameConstants_1.Sounds.GAME_MUSIC);
            // Clean UI static values
            PlayerVisualsManager.cleanUp();
        }
        spawnPowerUp() {
            let getRandomX = () => {
                let x = this._player.sprite.x * math_util_1.MathUtil.randomIntFromInterval(-5, 5);
                if (this.game.world.bounds.x < x) {
                    x = this.game.world.bounds.x - 100;
                }
                return x;
            };
            // check if within world boundaries
            this._powerUpTimer = Date.now();
            let randomLocation = new vector_1.default(getRandomX(), this.game.world.top);
            this._factory.spawnPowerUp(randomLocation.x, randomLocation.y);
        }
        canSpawnPowerUp(activeLevel) {
            return Date.now() - this._powerUpTimer > activeLevel.powerUpSpawnTime * 1000;
        }
        spawnDisaster() {
            this._factory.newDisaster(this._player.sprite.x + 100 * math_util_1.MathUtil.randomIntFromInterval(-10, 10), this.game.world.top);
            this._activeDisasters++;
            if (this._activeDisasters >= 7) {
                this._disasterTimer = Date.now();
                this._activeDisasters = 0;
            }
        }
        canSpawnEnemy(activeLevel) {
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
        canSpawnDisaster(activeLevel) {
            if (Date.now() - this._disasterTimer > activeLevel.randomDisasterSpawnTime) {
                return true;
            }
        }
    }
    GameStates.MainGameState = MainGameState;
    class MainMenuState extends GameState {
        init(args) {
            this._args = args;
            SoundPlayer_1.SoundPlayer.init(this.game);
        }
        preload() {
        }
        create() {
            SoundPlayer_1.SoundPlayer.playSound(GameConstants_1.Sounds.MAIN_MENU);
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