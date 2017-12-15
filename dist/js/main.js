webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var States;
(function (States) {
    States["GAMEOVER_SATE"] = "gameover_state";
    States["MAIN_MENU_STATE"] = "main_menu_state";
    States["BOOT_STATE"] = "boot_state";
    States["PRELOAD_STATE"] = "preload_state";
    States["GAME_STATE"] = "game_state";
})(States = exports.States || (exports.States = {}));
var Levels;
(function (Levels) {
    Levels["LEVEL_ONE"] = "level_one";
    Levels["LEVEL_TWO"] = "level_two";
})(Levels = exports.Levels || (exports.Levels = {}));
var Difficulty;
(function (Difficulty) {
    Difficulty[Difficulty["INSANE"] = 1] = "INSANE";
    Difficulty[Difficulty["HARD"] = 2] = "HARD";
    Difficulty[Difficulty["NORMAL"] = 3] = "NORMAL";
    Difficulty[Difficulty["EASY"] = 4] = "EASY";
})(Difficulty = exports.Difficulty || (exports.Difficulty = {}));
var TankLayout;
(function (TankLayout) {
    TankLayout["GREEN_FORTRESS"] = "tanks_tankGreen1.png";
    TankLayout["GREEN_ARTILERY"] = "tanks_tankGreen2.png";
    TankLayout["GREEN_HUNTER"] = "tanks_tankGreen3.png";
    TankLayout["GREEN_RECON"] = "tanks_tankGreen4.png";
    TankLayout["GREEN_LIGHT"] = "tanks_tankGreen5.png";
    TankLayout["GREY_FORTRESS"] = "tanks_tankGrey1.png";
    TankLayout["GREY_ARTILERY"] = "tanks_tankGrey2.png";
    TankLayout["GREY_HUNTER"] = "tanks_tankGrey3.png";
    TankLayout["GREY_RECON"] = "tanks_tankGrey4.png";
    TankLayout["GREY_LIGHT"] = "tanks_tankGrey5.png";
    TankLayout["CANDY_FORTRESS"] = "tanks_tankDesert1.png";
    TankLayout["CANDY_ARTILLERY"] = "tanks_tankDesert2.png";
    TankLayout["CANDY_HUNTER"] = "tanks_tankDesert3.png";
    TankLayout["CANDY_RECON"] = "tanks_tankDesert4.png";
    TankLayout["CANDY_LIGHT"] = "tanks_tankDesert5.png";
    TankLayout["DARK_FORTRESS"] = "tanks_tankNavy1.png";
    TankLayout["DARK_ARTILLERY"] = "tanks_tankNavy2.png";
    TankLayout["DARK_HUNTER"] = "tanks_tankNavy3.png";
    TankLayout["DARK_RECON"] = "tanks_tankNavy4.png";
    TankLayout["DARK_LIGHT"] = "tanks_tankNavy5.png";
    TankLayout["BULLET_ONE"] = "tank_bullet1.png";
    TankLayout["BULLET_TWO"] = "tank_bullet2.png";
    TankLayout["BULLET_THREE"] = "tank_bullet3.png";
    TankLayout["BULLET_FOUR"] = "tank_bullet4.png";
    TankLayout["BULLET_FIVE"] = "tank_bullet5.png";
    TankLayout["BULLET_SIX"] = "tank_bullet6.png";
    TankLayout["EXPLOSION_ONE"] = "tank_explosion1.png";
    TankLayout["EXPLOSION_TWO"] = "tank_explosion2.png";
    TankLayout["EXPLOSION_THREE"] = "tank_explosion3.png";
    TankLayout["EXPLOSION_FOUR"] = "tank_explosion4.png";
    TankLayout["EXPLOSION_FIVE"] = "tank_explosion5.png";
    TankLayout["EXPLOSION_SIX"] = "tank_explosion6.png";
    TankLayout["EXPLOSION_SEVEN"] = "tank_explosion7.png";
    TankLayout["EXPLOSION_EIGHT"] = "tank_explosion8.png";
    TankLayout["EXPLOSION_NINE"] = "tank_explosion9.png";
    TankLayout["EXPLOSION_TEN"] = "tank_explosion10.png";
    TankLayout["EXPLOSION_ELEVEN"] = "tank_explosion11.png";
    TankLayout["EXPLOSION_TWELVE"] = "tank_explosion12.png";
    TankLayout["TANK_SPRITESHEET"] = "tankSpritesheet";
})(TankLayout = exports.TankLayout || (exports.TankLayout = {}));
var ComponentType;
(function (ComponentType) {
    ComponentType["DISASTER"] = "disaster_component";
    ComponentType["HEALTH"] = "health_component";
    ComponentType["TANK"] = "tank_component";
    ComponentType["OWNER"] = "owner_component";
    ComponentType["STATE"] = "state_component";
    ComponentType["AI"] = "ai_component";
    ComponentType["COLLISION"] = "collision_component";
    ComponentType["BULLET"] = "bullet_component";
    ComponentType["LAYER"] = "layer_component";
    ComponentType["SHOOT"] = "shoot_component";
    ComponentType["PHYSICS"] = "physics_component";
    ComponentType["CAMERA"] = "camera_component";
    ComponentType["MOVABLE"] = "movable_component";
})(ComponentType = exports.ComponentType || (exports.ComponentType = {}));
var UIComponents;
(function (UIComponents) {
    UIComponents["PROGRESS_BAR"] = "progresBar";
    UIComponents["LOGO"] = "logo";
    UIComponents["PANEL"] = "green_panel.png";
    UIComponents["FULL_BUTTON"] = "green_button00.png";
    UIComponents["YES_BUTTON"] = "green_boxCheckmark.png";
    UIComponents["NO_BUTTON"] = "green_boxCross.png";
    UIComponents["UI_SPRITESHEET"] = "uiSpritesheet";
    UIComponents["LEVEL_ONE_IMAGE"] = "level_one_image";
    UIComponents["LEVEL_TWO_IMAGE"] = "level_two_image";
    UIComponents["CANDY_FORTRESS_IMG"] = "candy_fortress_img";
    UIComponents["CANDY_ARTILLERY_IMG"] = "candy_artillery_img";
    UIComponents["CANDY_HUNTER_IMG"] = "candy_hunter_img";
    UIComponents["CANDY_RECON_IMG"] = "candy_recon_img";
    UIComponents["CANDY_LIGHT_IMG"] = "candy_light_img";
    UIComponents["PLAYER_VISUALS_SPRITESHEET"] = "player_visuals_spritesheet";
    UIComponents["FULL_HEART"] = "hudHeart_full.png";
    UIComponents["HALF_HEART"] = "hudHeart_half.png";
    UIComponents["EMPTY_HEART"] = "hudHeart_empty.png";
})(UIComponents = exports.UIComponents || (exports.UIComponents = {}));
var TileLayers;
(function (TileLayers) {
    TileLayers["GRASS_LAYER"] = "grassLayer";
    TileLayers["BACKGROUND"] = "background";
    TileLayers["CANDY_LAYER"] = "candyLayer";
})(TileLayers = exports.TileLayers || (exports.TileLayers = {}));
var InputType;
(function (InputType) {
    InputType["STOP"] = "stop";
    InputType["RIGHT_INPUT"] = "right";
    InputType["LEFT_INPUT"] = "left";
    InputType["SHOOT"] = "shoot";
})(InputType = exports.InputType || (exports.InputType = {}));
var Action;
(function (Action) {
    Action["EXPLODE"] = "explode_action";
    Action["DAMAGE"] = "damage_action";
    Action["NOTHING"] = "no_action";
})(Action = exports.Action || (exports.Action = {}));
var AnimationTypes;
(function (AnimationTypes) {
    AnimationTypes["EXPLOSION"] = "explosion_animation";
})(AnimationTypes = exports.AnimationTypes || (exports.AnimationTypes = {}));
var FsmStateName;
(function (FsmStateName) {
    FsmStateName[FsmStateName["EVADE"] = 0] = "EVADE";
    FsmStateName[FsmStateName["SUICIDE"] = 1] = "SUICIDE";
    FsmStateName[FsmStateName["IDLE"] = 2] = "IDLE";
    FsmStateName[FsmStateName["SEEK"] = 3] = "SEEK";
    FsmStateName[FsmStateName["PURSUING"] = 4] = "PURSUING";
    FsmStateName[FsmStateName["FLEEING"] = 5] = "FLEEING";
})(FsmStateName = exports.FsmStateName || (exports.FsmStateName = {}));
var MainMenuButtons;
(function (MainMenuButtons) {
    MainMenuButtons["NEW_GAME"] = "new_game";
    MainMenuButtons["HIGH_SCORE"] = "high_score";
    MainMenuButtons["PREFERENCES"] = "preferences";
    MainMenuButtons["SELECT_LEVEL"] = "select_level";
    MainMenuButtons["SELECT_PLAYER"] = "select_player";
    MainMenuButtons["SELECT_DIFFICULTY"] = "select_difficulty";
    MainMenuButtons["BACK"] = "back";
})(MainMenuButtons = exports.MainMenuButtons || (exports.MainMenuButtons = {}));
var AIConstant;
(function (AIConstant) {
    AIConstant[AIConstant["FAR_AWAY"] = 0] = "FAR_AWAY";
    AIConstant[AIConstant["CLOSE"] = 1] = "CLOSE";
    AIConstant[AIConstant["CANNOT_HIT"] = 2] = "CANNOT_HIT";
    AIConstant[AIConstant["CAN_HIT_ENEMY"] = 3] = "CAN_HIT_ENEMY";
})(AIConstant = exports.AIConstant || (exports.AIConstant = {}));


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
/**
 * @class
 * Will hold the options selected by the player
 * */
class DataConfig {
    /**
     * @static
     * Returns the selected level
     * */
    static get level() {
        return this._level;
    }
    /**
     * @static
     * Sets the playable level
     * @param {Levels} value - the enum representation of a level
     * */
    static set level(value) {
        this._shadowLevel = this._level;
        this._level = value;
    }
    static set tank(value) {
        this._shadowTank = this._tank;
        this._tank = value;
    }
    static get tank() {
        return this._tank;
    }
    /**
     * @description
     * Checks if the any of the data has been changed see {@link DataConfig}
     * @return {boolean} changed
     * */
    static hasChanged() {
        let changed = false;
        this._level === this._shadowLevel ? changed = changed : changed = true;
        return changed;
    }
    /**
     * @description
     * Will revert the values to their prior conditions NOT the initial conditions
     * */
    static revertChanges() {
        this._shadowLevel ? this._level = this._shadowLevel : this._level = this._level;
        this._shadowTank ? this._tank = this._shadowTank : this._tank = this._tank;
        this._shadowDifficulty ? this._difficulty = this._shadowDifficulty : this._difficulty = this._difficulty;
        DataConfig.applyCahnges();
    }
    /**
     * @description
     * Use once you set up all the values to confirm the changes
     * */
    static applyCahnges() {
        this._shadowLevel = null;
        this._shadowTank = null;
        this._shadowDifficulty = null;
    }
    static get playerMaxHealth() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
                return 8;
            case GameConstants_1.Difficulty.NORMAL:
                return 6;
            case GameConstants_1.Difficulty.HARD:
                return 4;
            case GameConstants_1.Difficulty.INSANE:
                return 2;
            default:
                break;
        }
    }
    static get enemyHealth() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
            case GameConstants_1.Difficulty.NORMAL:
                return 4;
            case GameConstants_1.Difficulty.HARD:
                return 8;
            case GameConstants_1.Difficulty.INSANE:
                return 10;
            default:
                break;
        }
    }
    static get playerDamage() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
                return 3;
            case GameConstants_1.Difficulty.NORMAL:
                return 2;
            case GameConstants_1.Difficulty.HARD:
            case GameConstants_1.Difficulty.INSANE:
                return 1;
            default:
                break;
        }
    }
    static get enemyDamage() {
        switch (this._difficulty) {
            case GameConstants_1.Difficulty.EASY:
            case GameConstants_1.Difficulty.NORMAL:
                return 1;
            case GameConstants_1.Difficulty.HARD:
                return 2;
            case GameConstants_1.Difficulty.INSANE:
                return 3;
            default:
                break;
        }
    }
    static get difficulty() {
        return this._difficulty;
    }
    static set difficulty(value) {
        this._shadowDifficulty = this._difficulty;
        this._difficulty = value;
    }
}
DataConfig._level = GameConstants_1.Levels.LEVEL_ONE;
DataConfig._tank = GameConstants_1.TankLayout.CANDY_HUNTER;
DataConfig._difficulty = GameConstants_1.Difficulty.NORMAL;
exports.DataConfig = DataConfig;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil {
    static normalize(val, max = 4941, min = -46) {
        return (val - min) / (max - min);
    }
    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }
    /**
     * @description
     * Will return a random number between the two values provided including the values
     * @param {number} min - The lowest number to return
     * @param {number} max - The maximum number to return
     * @return {number} randomNum - A number between min and max
     * */
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    static isBetween(toCompare, max, min) {
        if (max > toCompare && toCompare > min) {
            return true;
        }
        return false;
    }
}
exports.MathUtil = MathUtil;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(name) {
        this._requiredComponents = [];
        this._name = name;
    }
    get name() {
        return this._name;
    }
    get target() {
        return this._target;
    }
    set target(target) {
        this._target = target;
    }
    validateComponentRequirments() {
        let errorString = '';
        this._requiredComponents.forEach((comp) => {
            if (!this._target.getComponent(comp)) {
                errorString += `Missing component: ${comp.toString()} from component: ${this._name}}`;
            }
        });
        if (errorString) {
            throw new Error(errorString);
        }
    }
    update(params) { }
}
exports.Component = Component;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const vector_1 = __webpack_require__(14);
const data_config_1 = __webpack_require__(1);
const menu_config_1 = __webpack_require__(69);
var UiManagers;
(function (UiManagers) {
    class MenuManager {
        /**
         * @description
         * Draws the loading screen at state passed
         * @param {Phaser.State} state
         */
        static setLoadingScreen(state) {
            let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
            let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
            logo.anchor.setTo(0.5);
            progressBar.anchor.setTo(0.5);
            state.load.setPreloadSprite(progressBar);
        }
        /**
         * @description
         * Will use the default box scheme to draw boxes at a location
         * @param {number} noOfBoxes - How many boxes will be created
         * @param {Array<Vector>} location - An Array of vectors see {@Link Vector} the location of where the boxes will be created
         * @param {Phaser.State} state - State to draw the boxes
         * @param {Array<string} itemToAttach - What text to attach (Optional)
         * @param {boolean} enableInput - Enable input on buttons defaults to true
         * @param {UIComponents} componentToDraw - What component will be the parent
         * @param {Vector} childRelevantPosition - Defaults to 0.5, will place the children at this position of parent object
         * @return {Array<Phaser.Sprite>} arr - Returns an array of sprites in the order passed
         */
        static drawBoxes(noOfBoxes, location, state, itemToAttach, enableInput = true, componentToDraw = GameConstants_1.UIComponents.FULL_BUTTON, childRelevantPosition = new vector_1.default(0.5, 0.5)) {
            let arr = [];
            for (let i = 0; i < noOfBoxes; i++) {
                let sprite = state.add.sprite(location[i].x, location[i].y, GameConstants_1.UIComponents.UI_SPRITESHEET, componentToDraw);
                let style = { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: sprite.width, align: 'center' };
                let attachment;
                sprite.scale.setTo(0.0, 0.0);
                sprite.anchor.setTo(0.5, 0.5);
                if (itemToAttach) {
                    itemToAttach[i] ? attachment = itemToAttach[i] : null;
                }
                if (attachment) {
                    if (attachment.includes('level') || attachment.includes('img')) {
                        let imageSprite = state.game.add.sprite(0, 0, attachment);
                        imageSprite.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
                        sprite.addChild(imageSprite);
                    }
                    else {
                        let toAttach = state.game.add.text(0, 0, attachment, style);
                        toAttach.anchor.setTo(childRelevantPosition.x, childRelevantPosition.y);
                        sprite.addChild(toAttach);
                    }
                }
                sprite.inputEnabled = enableInput;
                arr.push(sprite);
            }
            return arr;
        }
        /**
         * @description
         * Draws Tick button and Cross button at provided location
         * @param cancelLocation
         * @param okLocation
         * @param state
         * @return
         */
        static drawAcceptCancelButtons(okLocation, cancelLocation, state) {
            let arr = [];
            console.log('drawing buttons');
            arr = this.drawBoxes(1, [okLocation], state, null, true, GameConstants_1.UIComponents.YES_BUTTON);
            arr.push(this.drawBoxes(1, [cancelLocation], state, null, true, GameConstants_1.UIComponents.NO_BUTTON)[0]);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
            });
            return arr;
        }
        /**
         * @description
         * Use to draw the main menu at selected state
         * @return {MenuConfig} config
         * returns the config file with the sprites
         */
        static drawMainMenu(state, restartGame = false) {
            if (state.key === GameConstants_1.States.GAMEOVER_SATE || restartGame) {
                state.game.state.start(GameConstants_1.States.BOOT_STATE, true, true);
                this._fakeMapExists = false;
                this._fakeMap = null;
                return;
            }
            let textArr = ['New Game', 'High Score', 'Preferences'];
            let config = new menu_config_1.MenuConfig();
            let arr = this.drawBoxes(3, [
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight * 2),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY)
            ], state, textArr);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
                state.game.camera.focusOn(value);
                value.bringToTop();
            });
            let map;
            if (!this._fakeMapExists) {
                map = config.fakeTileMap = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
                map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
                map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
                map.createLayer('SkyPrimary').resizeWorld();
                map.createLayer('GroundSecondary').resizeWorld();
                map.createLayer('GroundPrimary').resizeWorld();
                this._fakeMapExists = true;
                this._fakeMap = map;
            }
            config.getSprite(GameConstants_1.MainMenuButtons.NEW_GAME).events.onInputDown.add(() => {
                this._fakeMapExists ? this._fakeMap.destroy() : null;
                state.game.state.start(GameConstants_1.States.GAME_STATE); // Phaser cant detect start on first state???
            });
            config.getSprite(GameConstants_1.MainMenuButtons.PREFERENCES).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Fades out passed sprites and then destroys them
         * @param {Phaser.State} state
         * @param {Array<Phaser.Sprite>} fadeoutSprites
         * @return {Promise} promise - The returned promise will be completed when all sprites have fadedout
         */
        static fadeoutSprites(state, fadeoutSprites) {
            return new Promise((resolve, reject) => {
                if (fadeoutSprites) {
                    fadeoutSprites.forEach((sprite) => {
                        state.game.add.tween(sprite.scale).to({
                            x: 0.0,
                            y: 0.0
                        }, this._animationTime, Phaser.Easing.Linear.None, true).onComplete.add(() => {
                            sprite.destroy();
                            resolve();
                        });
                    });
                }
                else {
                    reject();
                }
            });
        }
        /**
         * @description
         * Function to draw preferences options on current state
         * @param {Phaser.State} state - Current State
         * @param {Phaser.Sprite[]} fadeoutSprites
         * @return {MenuConfig} MenuConfig - The menu config to return
         */
        static drawPreferences(state) {
            let config = new menu_config_1.MenuConfig();
            let textArr = ['Select Level', 'Select Player', 'Select Difficulty', 'Back'];
            let arr = this.drawBoxes(4, [
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight * 2),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY - this._buttonHeight),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY),
                new vector_1.default(state.game.world.centerX, state.game.world.centerY + this._buttonHeight)
            ], state, textArr);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.MainMenuButtons[textArr[index].toUpperCase().replace(' ', '_')], value);
                // Gives the change of scenery effect
                state.game.camera.focusOn(value);
            });
            // Back Button
            config.getSprite(GameConstants_1.MainMenuButtons.BACK).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawMainMenu(state);
                });
            });
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_DIFFICULTY).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawDifficulty(state);
                });
            });
            // Select level Button
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_LEVEL).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr);
                this.fadeoutSprites(state, arr).then(() => {
                    // Preference menu has faded out
                    this.drawLevels(state);
                });
            });
            config.getSprite(GameConstants_1.MainMenuButtons.SELECT_PLAYER).events.onInputDown.add(() => {
                this.fadeoutSprites(state, arr);
                this.fadeoutSprites(state, arr).then(() => {
                    // Preference menu has faded out
                    this.drawPlayerChoice(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Function to draw the player options of tank choices
         * @param {Phaser.State} state
         * @return config
         */
        static drawPlayerChoice(state) {
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let config = new menu_config_1.MenuConfig();
            let tanks = [
                GameConstants_1.UIComponents.CANDY_RECON_IMG,
                GameConstants_1.UIComponents.CANDY_LIGHT_IMG,
                GameConstants_1.UIComponents.CANDY_HUNTER_IMG,
                GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG,
                GameConstants_1.UIComponents.CANDY_FORTRESS_IMG
            ];
            let vecs = [
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX + this._buttonLength, centerY),
                new vector_1.default(centerX + this._buttonLength * 2, centerY),
                new vector_1.default(centerX, centerY + this._buttonLength),
                new vector_1.default(centerX + this._buttonLength, centerY + this._buttonLength)
            ];
            let arr = this.drawBoxes(tanks.length, vecs, state, tanks, true, GameConstants_1.UIComponents.PANEL);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                config.setSprite(GameConstants_1.UIComponents[tanks[index].toUpperCase().replace(' ', '_')], value);
                // Gives the change of scenery effect
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG).events.onInputDown.add(() => {
                data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_ARTILLERY;
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_FORTRESS_IMG).events.onInputDown.add(() => {
                data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_FORTRESS;
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_HUNTER_IMG).events.onInputDown.add(() => {
                data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_HUNTER;
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_LIGHT_IMG).events.onInputDown.add(() => {
                data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_LIGHT;
            });
            config.getSprite(GameConstants_1.UIComponents.CANDY_RECON_IMG).events.onInputDown.add(() => {
                data_config_1.DataConfig.tank = GameConstants_1.TankLayout.CANDY_RECON;
            });
            let lastSprite = arr[arr.length - 2];
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                data_config_1.DataConfig.applyCahnges();
                this.fadeoutSprites(state, bArr);
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                data_config_1.DataConfig.revertChanges();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        static drawDifficulty(state) {
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let config = new menu_config_1.MenuConfig();
            let difficulties = ['Easy', 'Normal', 'Hard', 'Insane'];
            let loc = [
                new vector_1.default(centerX, centerY - this._buttonHeight * 2),
                new vector_1.default(centerX, centerY - this._buttonHeight),
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX, centerY + this._buttonHeight)
            ];
            let arr = this.drawBoxes(4, loc, state, difficulties);
            arr.forEach((sprite, index) => {
                state.game.add.tween(sprite.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                switch (index) {
                    case 0:
                        config.setSprite(GameConstants_1.Difficulty.EASY, sprite);
                        break;
                    case 1:
                        config.setSprite(GameConstants_1.Difficulty.NORMAL, sprite);
                        break;
                    case 2:
                        config.setSprite(GameConstants_1.Difficulty.HARD, sprite);
                        break;
                    case 3:
                        config.setSprite(GameConstants_1.Difficulty.INSANE, sprite);
                        break;
                    default:
                        break;
                }
            });
            config.getSprite(GameConstants_1.Difficulty.EASY).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.EASY;
            });
            config.getSprite(GameConstants_1.Difficulty.NORMAL).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.NORMAL;
            });
            config.getSprite(GameConstants_1.Difficulty.HARD).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.HARD;
            });
            config.getSprite(GameConstants_1.Difficulty.INSANE).events.onInputDown.add(() => {
                data_config_1.DataConfig.difficulty = GameConstants_1.Difficulty.INSANE;
            });
            let lastSprite = arr[arr.length - 1];
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - 30, lastSprite.y + 100), new vector_1.default(lastSprite.x + 10, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                data_config_1.DataConfig.applyCahnges();
                this.fadeoutSprites(state, bArr);
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                data_config_1.DataConfig.revertChanges();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        /**
         * @description
         * Will Generate the available levels the player can choose from
         * @return {MenuConfig} config - see {@Link MenuConfig}
         */
        static drawLevels(state) {
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let config = new menu_config_1.MenuConfig();
            let levels = [GameConstants_1.UIComponents.LEVEL_ONE_IMAGE, GameConstants_1.UIComponents.LEVEL_TWO_IMAGE];
            let arr = this.drawBoxes(2, [
                new vector_1.default(centerX, centerY),
                new vector_1.default(centerX + this._buttonLength, centerY)
            ], state, levels, true, GameConstants_1.UIComponents.PANEL);
            arr.forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                let name = GameConstants_1.UIComponents[levels[index].toUpperCase().replace(' ', '_')];
                config.setSprite(name, value);
                value.events.onInputDown.add(() => {
                    let lName = name.toString();
                    if (lName.includes('one')) {
                        data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_ONE;
                    }
                    else if (lName.includes('two')) {
                        data_config_1.DataConfig.level = GameConstants_1.Levels.LEVEL_TWO;
                    }
                });
            });
            // Setup ok/no buttons
            let lastSprite = arr[arr.length - 1];
            let bArr = this.drawAcceptCancelButtons(new vector_1.default(lastSprite.x - arr.length * 50, lastSprite.y + 100), new vector_1.default(lastSprite.x - (arr.length - 1) * 50, lastSprite.y + 100), state);
            bArr[0].events.onInputDown.add(() => {
                data_config_1.DataConfig.applyCahnges();
                this.fadeoutSprites(state, bArr);
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            bArr[1].events.onInputDown.add(() => {
                this.fadeoutSprites(state, bArr);
                data_config_1.DataConfig.revertChanges();
                this.fadeoutSprites(state, arr).then(() => {
                    this.drawPreferences(state);
                });
            });
            return config;
        }
        static drawGameOver(state, score) {
            let map;
            if (this._fakeMapExists) {
                this._fakeMapExists = false;
                this._fakeMap.destroy();
            }
            map = state.game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._fakeMapExists = true;
            this._fakeMap = map;
            state.game.camera.unfollow();
            let centerX = state.game.world.centerX;
            let centerY = state.game.world.centerY;
            let loc = [new vector_1.default(centerX, centerY)];
            this.drawBoxes(1, loc, state, ['Main Menu']).forEach((value, index) => {
                state.game.add.tween(value.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
                state.game.camera.focusOn(value);
                value.events.onInputDown.add(() => {
                    this.drawMainMenu(state);
                });
            });
            let gameOver = state.game.add.text(centerX - 145, centerY + 110, `You lost :( your score was ${score}!`, {
                font: '22px Arial',
                fill: '#ff0044'
            });
            gameOver.scale.setTo(0.0, 0.0);
            state.game.add.tween(gameOver.scale).to({ x: 1.0, y: 1.0 }, this._animationTime, Phaser.Easing.Bounce.Out, true);
        }
        static drawPauseMenu(state) {
            const buttonWidth = 130;
            let pauseMenu = state.add.sprite(state.game.world.right - buttonWidth, state.game.world.top, GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
            let toAttach = state.game.add.text(0, 0, 'Pause', { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: pauseMenu.width, align: 'center' });
            toAttach.anchor.setTo(-1, -0.35);
            pauseMenu.addChild(toAttach);
            pauseMenu.scale = new Phaser.Point(0.7, 0.7);
            pauseMenu.inputEnabled = true;
            pauseMenu.fixedToCamera = true;
            pauseMenu.events.onInputDown.add(() => {
                if (state.game.paused === true) {
                    return;
                }
                state.game.paused = true;
                let mainMenuBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y + (state.game.height / 2), GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
                let backBtn = state.add.sprite(state.game.camera.x + (state.game.width / 2), state.game.camera.y - (buttonWidth / 2) + (state.game.height / 2), GameConstants_1.UIComponents.UI_SPRITESHEET, GameConstants_1.UIComponents.FULL_BUTTON);
                let mainMenuTxt = state.add.text(0, 0, 'Main Menu', { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: mainMenuBtn.width, align: 'center' });
                let resumeTxt = state.add.text(0, 0, 'Resume', { font: '22px Arial', fill: '#ff0044', wordWrap: true, wordWrapWidth: backBtn.width, align: 'center' });
                mainMenuTxt.anchor.setTo(-0.4, -0.35);
                resumeTxt.anchor.setTo(-0.65, -0.35);
                mainMenuBtn.addChild(mainMenuTxt);
                backBtn.addChild(resumeTxt);
                mainMenuBtn.inputEnabled = true;
                backBtn.inputEnabled = true;
                mainMenuBtn.events.onInputDown.add(() => {
                    state.game.paused = false;
                    this.drawMainMenu(state, true);
                });
                backBtn.events.onInputDown.add(() => {
                    state.game.paused = false;
                    mainMenuBtn.destroy();
                    backBtn.destroy();
                });
            });
        }
        static drawYouWonMenu() {
        }
    }
    // Class Global vars
    MenuManager._fakeMapExists = false;
    MenuManager._animationTime = 333;
    MenuManager._buttonHeight = 50;
    MenuManager._buttonLength = 100;
    UiManagers.MenuManager = MenuManager;
    class PlayerVisualsManager {
        constructor(state) {
            this._state = state;
        }
        displayPlayerMaxHealth() {
            this.drawHearts(data_config_1.DataConfig.playerMaxHealth / 2, this._state.game.world.left + 50, this._state.game.world.top + 20, GameConstants_1.UIComponents.FULL_HEART);
        }
        removeHeartByDamage(damage) {
            for (let i = damage; i > 0; i--) {
                let heart = PlayerVisualsManager._heartList.reverse().find((heartSprite) => {
                    return heartSprite.frameName === GameConstants_1.UIComponents.FULL_HEART || heartSprite.frameName === GameConstants_1.UIComponents.HALF_HEART;
                });
                if (heart) {
                    if (heart.frameName === GameConstants_1.UIComponents.HALF_HEART) {
                        heart.frameName = GameConstants_1.UIComponents.EMPTY_HEART;
                    }
                    else {
                        heart.frameName = GameConstants_1.UIComponents.HALF_HEART;
                    }
                    PlayerVisualsManager._heartList.reverse(); // ensure array returns to its original form
                }
            }
        }
        addHeartByHealingReceived(healing) {
            for (let i = healing; i >= 0; i--) {
                let heart = PlayerVisualsManager._heartList.find((heart) => {
                    return heart.frame === GameConstants_1.UIComponents.EMPTY_HEART || heart.frame === GameConstants_1.UIComponents.HALF_HEART;
                });
                if (heart.frame === GameConstants_1.UIComponents.HALF_HEART) {
                    heart.frame = GameConstants_1.UIComponents.FULL_HEART;
                }
                else {
                    heart.frame = GameConstants_1.UIComponents.FULL_HEART;
                }
            }
        }
        drawHearts(no, x, y, kindOfHeart) {
            const heartWidth = 128;
            for (let i = 0; i < no; i++) {
                let heart = this._state.add.sprite(x + (heartWidth / 2) * i, y, GameConstants_1.UIComponents.PLAYER_VISUALS_SPRITESHEET, kindOfHeart);
                heart.fixedToCamera = true;
                heart.scale = new Phaser.Point(0.5, 0.5);
                PlayerVisualsManager._heartList.push(heart);
            }
        }
    }
    PlayerVisualsManager._heartList = [];
    UiManagers.PlayerVisualsManager = PlayerVisualsManager;
})(UiManagers = exports.UiManagers || (exports.UiManagers = {}));


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Vector {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
}
exports.default = Vector;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
__webpack_require__(17);
__webpack_require__(19);
__webpack_require__(21);
__webpack_require__(24);
const GameConstants_1 = __webpack_require__(0);
const ScreenMetrics_1 = __webpack_require__(30);
const gameStates_1 = __webpack_require__(31);
var BootState = gameStates_1.GameStates.BootState;
var PreloadState = gameStates_1.GameStates.PreloadState;
var GameState = gameStates_1.GameStates.MainGameState;
var MainMenuState = gameStates_1.GameStates.MainMenuState;
var GameoverState = gameStates_1.GameStates.GameoverState;
// The main class of our application
class App extends Phaser.Game {
    constructor(config) {
        super(config);
        this.state.add(GameConstants_1.States.BOOT_STATE, BootState);
        this.state.add(GameConstants_1.States.PRELOAD_STATE, PreloadState);
        this.state.add(GameConstants_1.States.GAME_STATE, GameState);
        this.state.add(GameConstants_1.States.MAIN_MENU_STATE, MainMenuState);
        this.state.add(GameConstants_1.States.GAMEOVER_SATE, GameoverState);
        this.state.start(GameConstants_1.States.BOOT_STATE);
    }
}
exports.App = App;
// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
    window.onload = () => {
        let gameWidth = ScreenMetrics_1.DEFAULT_GAME_WIDTH;
        let gameHeight = ScreenMetrics_1.DEFAULT_GAME_HEIGHT;
        if (ScreenMetrics_1.SCALE_MODE === 'USER_SCALE') {
            let screenMetrics = ScreenMetrics_1.ScreenUtils.calculateScreenMetrics(gameWidth, gameHeight);
            gameWidth = screenMetrics.gameWidth;
            gameHeight = screenMetrics.gameHeight;
        }
        const config = {
            width: gameWidth,
            height: gameHeight,
            renderer: Phaser.AUTO,
            parent: '',
            resolution: 1,
            forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
        };
        new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
    };
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(16)(module)))

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
    All credits for this class belong to http://sbcgamesdev.blogspot.co.uk/2015/04/phaser-tutorial-manage-different-screen.html
    The Screen[...] classes are modified versions of the classes in an article I found.
    Author: Tomáš Rychnovský
    Article: http://sbcgamesdev.blogspot.ca/2015/04/phaser-tutorial-manage-different-screen.html
    Date: Thursday, April 9, 2015
    Big thanks to Tomáš!

 */
var ScreenOrientation;
(function (ScreenOrientation) {
    ScreenOrientation[ScreenOrientation["PORTRAIT"] = 0] = "PORTRAIT";
    ScreenOrientation[ScreenOrientation["LANDSCAPE"] = 1] = "LANDSCAPE";
})(ScreenOrientation = exports.ScreenOrientation || (exports.ScreenOrientation = {}));
class ScreenMetrics {
}
exports.ScreenMetrics = ScreenMetrics;
class ScreenUtils {
    static calculateScreenMetrics(defaultWidth, defaultHeight, orientation = ScreenOrientation.LANDSCAPE, maxGameWidth, maxGameHeight) {
        // Just to give some explanation as to the numbers and colors in the included background;
        // The GREEN is the safe area and will be displayed fully on any device and is based on 16:10 aspect ratio, build your actual gameplay here
        // The YELLOW is the extra area that will be visible on devices with a 3:2 aspect ratio (iPhone 4S and below)
        // The BLUE is the extra area that will be visible on devices with a 4:3 aspect ratio (iPads)
        // The RED is the extra area that will be visible on devices with a 16:9 aspect ratio (iPhone 5 and above) (this is probably the most common ratio overall...)
        // The GREY area will most likely never be seen, unless some device has a really odd aspect ratio (and with Android, I wouldn't be surprised if there is a few out there)
        this.screenMetrics = new ScreenMetrics();
        this.screenMetrics.windowWidth = window.innerWidth;
        this.screenMetrics.windowHeight = window.innerHeight;
        this.screenMetrics.defaultGameWidth = defaultWidth;
        this.screenMetrics.defaultGameHeight = defaultHeight;
        // Swap width and height if necessary to match the specified orientation
        let dimensionsOppositeForLandscape = ((this.screenMetrics.windowWidth < this.screenMetrics.windowHeight) && orientation === ScreenOrientation.LANDSCAPE);
        let dimensionsOppositeForPortrait = ((this.screenMetrics.windowHeight < this.screenMetrics.windowWidth) && orientation === ScreenOrientation.PORTRAIT);
        if (dimensionsOppositeForLandscape || dimensionsOppositeForPortrait) {
            [this.screenMetrics.windowWidth, this.screenMetrics.windowHeight] = [this.screenMetrics.windowHeight, this.screenMetrics.windowWidth];
        }
        // Calculate the max width and max height if not provided; ratios are based off iPad (4:3) and iPhone 5+ (16:9) as the extremes in both width and height
        if (!maxGameWidth || !maxGameHeight) {
            if (orientation === ScreenOrientation.LANDSCAPE) {
                this.screenMetrics.maxGameWidth = Math.round(this.screenMetrics.defaultGameWidth * (exports.MAX_GAME_WIDTH / exports.DEFAULT_GAME_WIDTH));
                this.screenMetrics.maxGameHeight = Math.round(this.screenMetrics.defaultGameHeight * (exports.MAX_GAME_HEIGHT / exports.DEFAULT_GAME_HEIGHT));
            }
            else {
                this.screenMetrics.maxGameWidth = Math.round(this.screenMetrics.defaultGameWidth * (exports.MAX_GAME_HEIGHT / exports.DEFAULT_GAME_HEIGHT));
                this.screenMetrics.maxGameHeight = Math.round(this.screenMetrics.defaultGameHeight * (exports.MAX_GAME_WIDTH / exports.DEFAULT_GAME_WIDTH));
            }
        }
        else {
            this.screenMetrics.maxGameWidth = maxGameWidth;
            this.screenMetrics.maxGameHeight = maxGameHeight;
        }
        let defaultAspectRatio = ((orientation === ScreenOrientation.LANDSCAPE) ? (exports.DEFAULT_GAME_WIDTH / exports.DEFAULT_GAME_HEIGHT) : (exports.DEFAULT_GAME_HEIGHT / exports.DEFAULT_GAME_WIDTH));
        let windowAspectRatio = (this.screenMetrics.windowWidth / this.screenMetrics.windowHeight);
        if (windowAspectRatio > defaultAspectRatio) {
            this.screenMetrics.gameHeight = this.screenMetrics.defaultGameHeight;
            this.screenMetrics.gameWidth = (Math.ceil((this.screenMetrics.gameHeight * windowAspectRatio) * 0.5) * 2);
            this.screenMetrics.gameWidth = Math.min(this.screenMetrics.gameWidth, this.screenMetrics.maxGameWidth);
            this.screenMetrics.offsetX = ((this.screenMetrics.gameWidth - this.screenMetrics.defaultGameWidth) * 0.5);
            this.screenMetrics.offsetY = 0;
        }
        else {
            this.screenMetrics.gameWidth = this.screenMetrics.defaultGameWidth;
            this.screenMetrics.gameHeight = (Math.ceil((this.screenMetrics.gameWidth / windowAspectRatio) * 0.5) * 2);
            this.screenMetrics.gameHeight = Math.min(this.screenMetrics.gameHeight, this.screenMetrics.maxGameHeight);
            this.screenMetrics.offsetX = 0;
            this.screenMetrics.offsetY = ((this.screenMetrics.gameHeight - this.screenMetrics.defaultGameHeight) * 0.5);
        }
        // Calculate scaling
        this.screenMetrics.scaleX = (this.screenMetrics.windowWidth / this.screenMetrics.gameWidth);
        this.screenMetrics.scaleY = (this.screenMetrics.windowHeight / this.screenMetrics.gameHeight);
        return this.screenMetrics;
    }
}
exports.ScreenUtils = ScreenUtils;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Assets_1 = __webpack_require__(32);
const GameConstants_1 = __webpack_require__(0);
const TankWorldFactory_1 = __webpack_require__(53);
const input_1 = __webpack_require__(76);
const data_config_1 = __webpack_require__(1);
const levels_tankLevels_1 = __webpack_require__(77);
const math_util_1 = __webpack_require__(3);
const uimanagers_1 = __webpack_require__(13);
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


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
/**
 * @class
 * Class to load assets into the cached memory
 * */
class AssetLoader {
    /**
     * @constructor
     * Will generate all required paths for the assets
     * */
    constructor() {
        // Since Webpack is running in build-time, it can't figure out which modules to bundle when the name is a dynamic variable.
        // Therefor all required targets must be hardcoded
        // Images
        this._progressBarUrl = __webpack_require__(33);
        this._logoUrl = __webpack_require__(34);
        this._levelOneImgUrl = __webpack_require__(35);
        this._levelTwoImgUrl = __webpack_require__(36);
        this._tank1Url = __webpack_require__(37);
        this._tank2Url = __webpack_require__(38);
        this._tank3Url = __webpack_require__(39);
        this._tank4Url = __webpack_require__(40);
        this._tank5Url = __webpack_require__(41);
        // Levels
        this._levelOneUrl = __webpack_require__(42);
        this._levelTwoUrl = __webpack_require__(43);
        // Atlas
        this._tankSpritesheetUrlXLM = __webpack_require__(44);
        this._tankSpritesheetUrl = __webpack_require__(45);
        // Spritesheet
        this._grassLayerUrl = __webpack_require__(46);
        this._candyLayerUrl = __webpack_require__(47);
        this._backgroundUrl = __webpack_require__(48);
        this._uiBackgroundUrl = __webpack_require__(49);
        this.uiBackgroundUrlXML = __webpack_require__(50);
        this._playerVisualsSpritesheetUrl = __webpack_require__(51);
        this._playerVisualsSpritesheetUrlXML = __webpack_require__(52);
    }
    /**
     * Run once during Boot state to pass reference to loader.
     * @param {Phaser.Loader} loader   The phaser loader
     * @return {void}
     **/
    init(loader) {
        this.loader = loader;
    }
    /**
     * @description
     * Loads the pre-requisites for the loading screen
     */
    loadBoot() {
        try {
            this.loader.image(GameConstants_1.UIComponents.PROGRESS_BAR, this._progressBarUrl);
            this.loader.image(GameConstants_1.UIComponents.LOGO, this._logoUrl);
        }
        catch (e) {
            // todo: Exception handling class
        }
    }
    /**
     * @description
     * Loads all assets into the cached memory **Note this doesnt include loading screen assets see {@link AssetLoader#loadBoot}
     */
    loadAll() {
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_TWO, this._levelTwoUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.atlasXML(GameConstants_1.UIComponents.UI_SPRITESHEET, this._uiBackgroundUrl, this.uiBackgroundUrlXML);
        this.loader.atlasXML(GameConstants_1.UIComponents.PLAYER_VISUALS_SPRITESHEET, this._playerVisualsSpritesheetUrl, this._playerVisualsSpritesheetUrlXML);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
        this.loader.image(GameConstants_1.UIComponents.LEVEL_ONE_IMAGE, this._levelOneImgUrl);
        this.loader.image(GameConstants_1.UIComponents.LEVEL_TWO_IMAGE, this._levelTwoImgUrl);
        this.loader.image(GameConstants_1.TileLayers.CANDY_LAYER, this._candyLayerUrl);
        this.loader.image(GameConstants_1.UIComponents.CANDY_ARTILLERY_IMG, this._tank1Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_HUNTER_IMG, this._tank2Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_LIGHT_IMG, this._tank5Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_FORTRESS_IMG, this._tank3Url);
        this.loader.image(GameConstants_1.UIComponents.CANDY_RECON_IMG, this._tank4Url);
    }
    /**
     * @description
     * Returns the cached memory object see {@link Phaser.Loader}
     * @return {Phaser.Loader} AssetLoader._loader
     * */
    get loader() {
        if (this._loader === null) {
            throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
        }
        return this._loader;
    }
    /**
     * @description
     * Sets current loader
     * @param {Phaser.Loader} value
     * */
    set loader(value) {
        this._loader = value;
    }
}
// Imitate all methods as static as this class needs to be initiated
// noinspection TsLint
const AssetsUtils = new AssetLoader();
exports.default = AssetsUtils;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/progressBar.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/logo.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/levelOneImage.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/levelTwoImage.png";

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/tanks_tankDesert1.png";

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/tanks_tankDesert2.png";

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/tanks_tankDesert3.png";

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/tanks_tankDesert4.png";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/tanks_tankDesert5.png";

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/levels/level1.json";

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/levels/level2.json";

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/tanks_xml.xml";

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/tanks.png";

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/grassLayer.png";

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/candyLayer.png";

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/backgroundElements.png";

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/UISpritesheet.png";

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/UISpritesheet_xml.xml";

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/playerVisuals.png";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/playerVisuals.xml";

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = __webpack_require__(54);
const guid_1 = __webpack_require__(66);
const data_config_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
const fsm_states_1 = __webpack_require__(67);
const collision_components_1 = __webpack_require__(68);
const control_components_1 = __webpack_require__(70);
const data_components_1 = __webpack_require__(71);
const action_components_1 = __webpack_require__(73);
var IdleState = fsm_states_1.FsmStates.IdleState;
var PursuingState = fsm_states_1.FsmStates.PursuingState;
var FleeState = fsm_states_1.FsmStates.FleeState;
var SeekState = fsm_states_1.FsmStates.SeekState;
var PhysicsComponent = collision_components_1.CollisionComponents.PhysicsComponent;
var CollisionsComponent = collision_components_1.CollisionComponents.CollisionsComponent;
var CameraComponent = control_components_1.ControlComponents.CameraComponent;
var AiComponent = control_components_1.ControlComponents.AiComponent;
var BulletComponent = control_components_1.ControlComponents.BulletComponent;
var LayerComponent = data_components_1.DataComponents.LayerComponent;
var HealthComponent = data_components_1.DataComponents.HealthComponent;
var TankComponent = data_components_1.DataComponents.TankComponent;
var OwnerComponent = data_components_1.DataComponents.OwnerComponent;
var MovableComponent = action_components_1.ActionComponents.MovableComponent;
var ShootComponent = action_components_1.ActionComponents.ShootComponent;
var SuicideState = fsm_states_1.FsmStates.SuicideState;
const math_util_1 = __webpack_require__(3);
var EvadeState = fsm_states_1.FsmStates.EvadeState;
const state_component_1 = __webpack_require__(74);
var DisasterComponent = control_components_1.ControlComponents.DisasterComponent;
/**
 * @class TankWorldFactory
 * @description
 * This is the game factory and exposes functions to
 * create a new player {@link TankWorldFactory#newPlayer}
 * create a new bullet {@link TankWorldFactory#newBullet}
 * create a new enemy {@link TankWorldFactory#newEnemy}
 * start spawning enemies {@Link TankWorldFactory#spawnEnemies}
 * All of the above are dependant on the information passed to the factory by what {@link TankLevel} is loaded
 */
class TankWorldFactory {
    /**
     * @constructor
     * @param {Phaser.Game} game
     * @param state - Current conditions
     */
    constructor(game, state) {
        this._entitiesSubscriptions = []; // Keep a record of the subscriptions to remove later
        // Arrays
        this._entities = [];
        this._game = game;
        this._currentState = state;
    }
    /**
     * Initializes the factory
     * @param {Array<Phaser.Physics.P2.Body>} levelCollisionLayer - The current level collision layer so that tank factory objects can collide with it
     */
    init(levelCollisionLayer) {
        // init collision groups
        this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._playerBulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();
        // Have to do this here as we cannot enforce layer to be Entity to attach component
        levelCollisionLayer.forEach((layer) => {
            layer.setCollisionGroup(this._groundCollisionGroup);
            layer.collides([
                this._tankCollisionGroup,
                this._playerBulletCollisionGroup,
                this._enemyBulletsCollisionGroup,
                this._enemyTankCollisionGroup
            ]);
        });
        // Force all groups to collide with world bounds
        this._game.physics.p2.updateBoundsCollisionGroup();
    }
    /**
     * @description
     * Creates a new player based on the loaded level {@link TankLevel#playerStartPos}
     */
    newPlayer(x, y) {
        let player = new entity_1.Entity(this._game, x, y)
            .withComponent([new MovableComponent(),
            new CameraComponent(this._game),
            new PhysicsComponent(this._game),
            new ShootComponent(this._game, this),
            new LayerComponent(),
            new CollisionsComponent(),
            new HealthComponent(),
            new TankComponent(data_config_1.DataConfig.tank)]);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        player.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.playerMaxHealth);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics();
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(data_config_1.DataConfig.tank);
        player.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._tankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyBulletsCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(player);
        this._player = player;
        this._player.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        return player;
    }
    /**
     * @description
     * Creates a new enemy based on the loaded level {@link TankLevel#enemyStartPos}
     */
    newEnemy(kindOfenemy, x, y, subFunction) {
        let kindOfTank = kindOfenemy; // As each level can have many random enemies
        // Get one store it and use it where appropriate
        let enemy = new entity_1.Entity(this._game, x, y, null)
            .withComponent([
            new MovableComponent(),
            new PhysicsComponent(this._game),
            new ShootComponent(this._game, this),
            new LayerComponent(),
            new CollisionsComponent(),
            new state_component_1.StateComponent(),
            new AiComponent(this._player, this._entities.filter((entity) => {
                return entity.hasComponent(GameConstants_1.ComponentType.AI);
            })),
            new HealthComponent(),
            new TankComponent(kindOfTank)
        ]);
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        enemy.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(data_config_1.DataConfig.enemyHealth);
        enemy.getComponent(GameConstants_1.ComponentType.STATE)
            .addState(GameConstants_1.FsmStateName.SEEK, new SeekState())
            .addState(GameConstants_1.FsmStateName.IDLE, new IdleState())
            .addState(GameConstants_1.FsmStateName.PURSUING, new PursuingState())
            .addState(GameConstants_1.FsmStateName.FLEEING, new FleeState())
            .addState(GameConstants_1.FsmStateName.SUICIDE, new SuicideState())
            .addState(GameConstants_1.FsmStateName.EVADE, new EvadeState())
            .setState(GameConstants_1.FsmStateName.IDLE);
        enemy.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics();
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(kindOfTank);
        enemy.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyTankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._playerBulletCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(enemy);
        // NECESSARY FOR BULLET TO GET CORRECT GROUP
        enemy.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        let sub = enemy.whenDestroyed.subscribe(() => {
            // this is to ensure when the entity is destroyed all memorie refs are released for garbage collection
            subFunction();
            const index = this._entities.indexOf(enemy);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return enemy;
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([
            new PhysicsComponent(this._game),
            new LayerComponent(),
            new BulletComponent(this._game),
            new CollisionsComponent(),
            new HealthComponent(),
            new OwnerComponent()
        ]);
        bullet.getComponent(GameConstants_1.ComponentType.OWNER).owner = owner;
        bullet.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(1);
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false)
            .scaleSprite(owner.sprite.scale.x);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(owner.getComponent(GameConstants_1.ComponentType.TANK).bulletKind);
        bullet.getComponent(GameConstants_1.ComponentType.BULLET)
            .bulletInit();
        bullet.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this.setBulletColisionGroup(owner))
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        this._entities.push(bullet);
        let sub = bullet.whenDestroyed.subscribe(() => {
            const index = this._entities.indexOf(bullet);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return bullet;
    }
    newDisaster(x, y) {
        let disaster = new entity_1.Entity(this._game, x, y)
            .withComponent([
            new PhysicsComponent(this._game),
            new LayerComponent(),
            new CollisionsComponent(),
            new DisasterComponent(),
            new HealthComponent()
        ]);
        disaster.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false);
        disaster.getComponent(GameConstants_1.ComponentType.LAYER)
            .addLayer(getRandomLayout())
            .addAnimation(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        disaster.getComponent(GameConstants_1.ComponentType.HEALTH).setHealth(1);
        disaster.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyBulletsCollisionGroup)
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.DAMAGE]);
        this._entities.push(disaster);
        let sub = disaster.whenDestroyed.subscribe(() => {
            const index = this._entities.indexOf(disaster);
            this._entities.splice(index, 1);
            sub.unsubscribe();
        });
        this._entitiesSubscriptions.push(sub); // In case player dies before all entites we still need to clean up the memory
        return disaster;
        function getRandomLayout() {
            let random = math_util_1.MathUtil.randomIntFromInterval(0, 5);
            let tankLayout = () => {
                switch (random) {
                    case 0:
                        return GameConstants_1.TankLayout.BULLET_ONE;
                    case 1:
                        return GameConstants_1.TankLayout.BULLET_TWO;
                    case 2:
                        return GameConstants_1.TankLayout.BULLET_THREE;
                    case 3:
                        return GameConstants_1.TankLayout.BULLET_FOUR;
                    case 4:
                        return GameConstants_1.TankLayout.BULLET_FIVE;
                    default:
                        break;
                }
            };
            return tankLayout();
        }
    }
    cleanUp() {
        this._entities = null;
        this._entitiesSubscriptions.forEach((e) => {
            e.unsubscribe();
        });
    }
    get entities() {
        return this._entities;
    }
    setBulletColisionGroup(owner) {
        if (owner.sprite.data.tag === this._player.sprite.data.tag) {
            return this._playerBulletCollisionGroup;
        }
        return this._enemyBulletsCollisionGroup;
    }
}
exports.default = TankWorldFactory;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const Subject_1 = __webpack_require__(8);
/**
 * @class Entity
 * @description
 * Represents any object that can be added to the game world
 * Exposes functions to load components in order to modify the actions and the abilities of the entity see {@link Entity#addComponent}
 * Exposes a function to retrieve any component that is loaded to an entity see {@link  Entity#getComponent}
 * */
class Entity {
    constructor(game, x, y, components) {
        this._components = new Map();
        this._whenDestroyed = new Subject_1.Subject();
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
        }
        this._sprite = game.add.sprite(x, y, GameConstants_1.TankLayout.TANK_SPRITESHEET);
        this._components.forEach((comp) => {
            comp.validateComponentRequirments();
        });
    }
    addComponent(component) {
        this._components.set(component.name, component);
        this._components.get(component.name).target = this;
        return component;
    }
    hasComponent(componentName) {
        return this._components.has(componentName);
    }
    /**
     * Retrieves a component by Component type see {@Link ComponentType}
     * and casts it to any parameter that extends Component see {@Link Component}
     * @param {string} componentName
     * @return {Component} component
     * */
    getComponent(componentName) {
        return this._components.get(componentName);
    }
    update() {
        this._components.forEach((componentType) => {
            this._components.get(componentType.name).update();
        });
    }
    /**
     * Loads an array of components {@Link Component} to an entity
     * and then returns the entity
     * @param {Array<Component>} components
     * @return {Entity} this
     * */
    withComponent(components) {
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            return this;
        }
    }
    destroy() {
        try {
            this._components.clear();
            this._sprite.destroy();
            this._whenDestroyed.next();
        }
        catch (e) {
            this._whenDestroyed.error(e);
        }
    }
    get whenDestroyed() {
        return this._whenDestroyed;
    }
    get sprite() {
        return this._sprite;
    }
}
exports.Entity = Entity;


/***/ }),
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Guid {
    static newGuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}
exports.Guid = Guid;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const data_config_1 = __webpack_require__(1);
const math_util_1 = __webpack_require__(3);
var FsmStates;
(function (FsmStates) {
    class State {
        set entity(entity) {
            this._entity = entity;
        }
    }
    FsmStates.State = State;
    class PursuingState extends State {
        enter() {
        }
        leave() {
        }
        update() {
            const tankComponent = this._entity.getComponent(GameConstants_1.ComponentType.TANK);
            const aiComp = this._entity.getComponent(GameConstants_1.ComponentType.AI);
            const shootComponent = this._entity.getComponent(GameConstants_1.ComponentType.SHOOT);
            const movableComponent = this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE);
            const difficultyModifier = 10 + data_config_1.DataConfig.difficulty * data_config_1.DataConfig.difficulty;
            const distance = this._entity.sprite.x - aiComp.player.sprite.x;
            let seconds = (distance / tankComponent.speed);
            let futurePosition = aiComp.player.sprite.x + (aiComp.player.sprite.body.velocity.x / 1000) * seconds;
            let direction = futurePosition - this._entity.sprite.x;
            let rangeOfProjectile = shootComponent.rangeOfProjectile;
            if (math_util_1.MathUtil.isBetween(Math.abs(direction), rangeOfProjectile + difficultyModifier, rangeOfProjectile - difficultyModifier)) {
                shootComponent.canShoot = true;
            }
            else if (Math.abs(direction) < rangeOfProjectile) {
                direction > 0 ? movableComponent.direction = GameConstants_1.InputType.LEFT_INPUT : movableComponent.direction = GameConstants_1.InputType.RIGHT_INPUT;
            }
            else {
                direction > 0 ? movableComponent.direction = GameConstants_1.InputType.RIGHT_INPUT : movableComponent.direction = GameConstants_1.InputType.LEFT_INPUT;
            }
            this.correctScale();
        }
        correctScale() {
            const aiComp = this._entity.getComponent(GameConstants_1.ComponentType.AI);
            const distance = aiComp.player.sprite.x - this._entity.sprite.x;
            if (distance > 0 && this._entity.sprite.scale.x === -1) {
                this._entity.sprite.scale.x = 1;
            }
            else if (distance < 0 && this._entity.sprite.scale.x === 1) {
                this._entity.sprite.scale.x = -1;
            }
        }
    }
    FsmStates.PursuingState = PursuingState;
    class FleeState extends State {
        enter() {
            let aiComponent = this._entity.getComponent(GameConstants_1.ComponentType.AI);
            let moveComponent = this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE);
            // Get player direction
            let playerDir = aiComponent.player.sprite.scale.x;
            // Go in the other direction of the player
            if (playerDir === 1) {
                moveComponent.direction = GameConstants_1.InputType.LEFT_INPUT;
            }
            else {
                moveComponent.direction = GameConstants_1.InputType.RIGHT_INPUT;
            }
        }
        leave() {
            this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
        }
        update() {
            this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
        }
    }
    FsmStates.FleeState = FleeState;
    class SuicideState extends State {
        enter() {
            this._direction = this._entity.getComponent(GameConstants_1.ComponentType.AI).player.sprite.x - this._entity.sprite.x;
            if (this._direction < 0) {
                this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.LEFT_INPUT;
            }
            else {
                this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.RIGHT_INPUT;
            }
        }
        leave() {
        }
        update() {
            if (Math.abs(this._direction) <= 10) {
                const overKillDamage = 10000;
                const playerDamageOnSuicide = 2;
                this._entity.getComponent(GameConstants_1.ComponentType.HEALTH).dealDamage(overKillDamage);
                this._entity.getComponent(GameConstants_1.ComponentType.AI)
                    .player.getComponent(GameConstants_1.ComponentType.HEALTH)
                    .dealDamage(playerDamageOnSuicide);
            }
        }
    }
    FsmStates.SuicideState = SuicideState;
    class IdleState extends State {
        enter() {
        }
        leave() {
        }
        update() {
        }
    }
    FsmStates.IdleState = IdleState;
    class SeekState extends State {
        enter() {
            let direction = this._entity.getComponent(GameConstants_1.ComponentType.AI).player.sprite.x - this._entity.sprite.x;
            const physicsComponent = this._entity.getComponent(GameConstants_1.ComponentType.PHYSICS);
            if (direction < 0) {
                this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.LEFT_INPUT;
                physicsComponent.scaleSprite(-1);
            }
            else {
                this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.RIGHT_INPUT;
                physicsComponent.scaleSprite(1);
            }
        }
        leave() {
            this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
        }
        update() {
            this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
        }
    }
    FsmStates.SeekState = SeekState;
    class EvadeState extends State {
        enter() {
        }
        leave() {
        }
        update() {
            const aiComp = this._entity.getComponent(GameConstants_1.ComponentType.AI);
            const movableComponent = this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE);
            // Move until in range to pursuit again
            aiComp.player.sprite.scale.x > 0 ? movableComponent.direction = GameConstants_1.InputType.LEFT_INPUT : movableComponent.direction = GameConstants_1.InputType.RIGHT_INPUT;
        }
    }
    FsmStates.EvadeState = EvadeState;
})(FsmStates = exports.FsmStates || (exports.FsmStates = {}));


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(4);
const GameConstants_1 = __webpack_require__(0);
const data_config_1 = __webpack_require__(1);
const uimanagers_1 = __webpack_require__(13);
var CollisionComponents;
(function (CollisionComponents) {
    var PlayerVisualsManager = uimanagers_1.UiManagers.PlayerVisualsManager;
    class CollisionsComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.COLLISION);
            this._requiredComponents = [
                GameConstants_1.ComponentType.PHYSICS
            ];
        }
        setCollisionGroup(ownerCollisionGroup) {
            this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
            return this;
        }
        cleanCollisions() {
            this.target.sprite.body.data.shapes[0].sensor = true;
        }
        collidesWith(collidesWith, actions) {
            let body = this.target.sprite.body;
            if (this.target.sprite.body.collidesWith.includes(collidesWith)) {
                return;
            }
            actions.forEach((action) => {
                switch (action) {
                    case GameConstants_1.Action.NOTHING:
                        body.collides(collidesWith);
                        break;
                    case GameConstants_1.Action.DAMAGE:
                        // Each bullet does the same damage regardless of type
                        // Bullet damage depends on difficulty level
                        const aiComp = this.target.getComponent(GameConstants_1.ComponentType.AI);
                        const healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                        const tankComp = this.target.getComponent(GameConstants_1.ComponentType.TANK);
                        if (!aiComp && tankComp) {
                            body.collides(collidesWith, () => {
                                let heartManager = new PlayerVisualsManager();
                                heartManager.removeHeartByDamage(data_config_1.DataConfig.enemyDamage);
                                healthComp.dealDamage(data_config_1.DataConfig.enemyDamage);
                            });
                            break;
                        }
                        body.collides(collidesWith, () => {
                            healthComp.dealDamage(data_config_1.DataConfig.playerDamage);
                        });
                        break;
                    default:
                        break;
                }
            });
            return this;
        }
    }
    CollisionComponents.CollisionsComponent = CollisionsComponent;
    class PhysicsComponent extends component_1.Component {
        constructor(game) {
            super(GameConstants_1.ComponentType.PHYSICS);
            this._game = game;
        }
        addPhysics(drag = true) {
            this._game.physics.p2.enable(this.target.sprite);
            this.target.sprite.anchor.setTo(0.5, 0.5);
            drag ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;
            return this;
        }
        get gravity() {
            return this._game.physics.p2.gravity.y;
        }
        scaleSprite(scale) {
            this.target.sprite.scale.x = scale;
            return this;
        }
        stopSprite() {
            this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
            this.target.sprite.body.restitution = 0.0;
            this.target.sprite.body.velocity.x = 0;
            this.target.sprite.body.velocity.y = 0;
            this.target.sprite.body.allowGravity = false;
            this.target.sprite.body.data.gravityScale = 0;
            this.target.sprite.body.angularDumping = 1;
        }
    }
    CollisionComponents.PhysicsComponent = PhysicsComponent;
})(CollisionComponents = exports.CollisionComponents || (exports.CollisionComponents = {}));


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class
 * As the only way to create a menu in phaser is sprites we need a class to store and retrieve them
 * */
class MenuConfig {
    constructor() {
        this._mapSprites = new Map();
        this._spriteGroups = new Map();
    }
    /**
     * @description
     * returns the matching sprite
     * @param {MainMenuButtons | UIComponents} name
     * @return {Phaser.Sprite} sprite
     * */
    getSprite(name) {
        return this._mapSprites.get(name);
    }
    setSprite(name, sprite) {
        if (!this._mapSprites.has(name)) {
            this._mapSprites.set(name, sprite);
        }
    }
    setSpriteGroup(name, spriteArr) {
        if (!this._spriteGroups.has(name)) {
            this._spriteGroups.set(name, spriteArr);
        }
    }
    getSpriteGroup(name) {
        return this._spriteGroups.get(name);
    }
    get allSprites() {
        let arr = [];
        this._mapSprites.forEach((value) => {
            arr.push(value);
        });
        return arr;
    }
    get fakeTileMap() {
        return this._fakeTileMap;
    }
    set fakeTileMap(value) {
        this._fakeTileMap = value;
    }
}
exports.MenuConfig = MenuConfig;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(4);
const GameConstants_1 = __webpack_require__(0);
const math_util_1 = __webpack_require__(3);
const data_config_1 = __webpack_require__(1);
var ControlComponents;
(function (ControlComponents) {
    class DisasterComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.DISASTER);
        }
        update() {
            const layoutComponent = this.target.getComponent(GameConstants_1.ComponentType.LAYER);
            const animation = layoutComponent.getCurrentAnimation();
            if (!animation.isPlaying) {
                this.target.sprite.angle = 45;
                this.target.sprite.body.velocity.y = 200 * (5 - data_config_1.DataConfig.difficulty);
                this.target.sprite.body.velocity.x = 100;
            }
        }
    }
    ControlComponents.DisasterComponent = DisasterComponent;
    class BulletComponent extends component_1.Component {
        constructor(game) {
            super(GameConstants_1.ComponentType.BULLET);
            this._game = game;
            this._requiredComponents.push(GameConstants_1.ComponentType.OWNER);
            this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
        }
        /**
         * @description
         * Initiates a normal bullet tank bullet and ensures it will reach the target
         * If this is an AI the target passed at the AI else at the mouse pointer of the player
         * */
        bulletInit() {
            let cOwner = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
            let seekObject = {
                x: this._game.input.activePointer.x + this._game.camera.x,
                y: this._game.input.activePointer.y
            };
            // Check if there is an AIComponent if yes this is not our player
            let aiComponent = cOwner ? cOwner.owner.getComponent(GameConstants_1.ComponentType.AI) : null;
            if (aiComponent) {
                // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
                seekObject.x = aiComponent.player.sprite.x;
                seekObject.y = aiComponent.player.sprite.y;
            }
            this.accelerateToObject(this.target.sprite, seekObject, aiComponent
                ? cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed
                : Math.abs(cOwner.owner.getComponent(GameConstants_1.ComponentType.TANK).bulletSpeed));
        }
        accelerateToObject(obj1, obj2, velocity = 500) {
            let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
            const ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
            let aiComponent = ownerComponent.owner.getComponent(GameConstants_1.ComponentType.AI);
            let aiAngle;
            ownerComponent.owner.sprite.scale.x > 0 ? aiAngle = -45 : aiAngle = 180;
            aiComponent
                ? obj1.body.velocity.x = calculateVelocityX(true, velocity, aiAngle)
                : obj1.body.velocity.x = calculateVelocityX(false, velocity, angle);
            aiComponent
                ? obj1.body.velocity.y = calculateVelocityY(true, velocity, aiAngle)
                : obj1.body.velocity.y = calculateVelocityY(false, velocity, angle);
            function calculateVelocityX(isAi = true, tankSpeed, angle) {
                return velocity * Math.cos(angle);
            }
            function calculateVelocityY(isAi = true, tankSpeed, angle) {
                return velocity * Math.sin(angle);
            }
        }
    }
    ControlComponents.BulletComponent = BulletComponent;
    class AiComponent extends component_1.Component {
        constructor(player, aiFriendlies) {
            super(GameConstants_1.ComponentType.AI);
            this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT, GameConstants_1.ComponentType.TANK];
            this._player = player;
            this._friendlies = aiFriendlies;
        }
        update() {
            this.decide();
        }
        decide() {
            // Check if state was given externally or has to be calculated
            // Justify this in the report say tanks can only spawn on the right of the player
            let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
            // Here we are adding some random params to simulate a more realistic behaviour
            switch (this.canHitPlayer()) {
                case GameConstants_1.AIConstant.CAN_HIT_ENEMY:
                    sComp.setState(GameConstants_1.FsmStateName.PURSUING);
                    break;
                case GameConstants_1.AIConstant.CLOSE:
                    let healthComp = this.target.getComponent(GameConstants_1.ComponentType.HEALTH);
                    let lowHealth = healthComp.getCurrentHealth() <= healthComp.getMaxHealth() / 2;
                    if (!lowHealth) {
                        sComp.setState(GameConstants_1.FsmStateName.EVADE);
                    }
                    else {
                        // Check if there is a reason to die
                        if (this.checkIfAliesNearby()) {
                            sComp.setState(GameConstants_1.FsmStateName.SUICIDE);
                            return;
                        }
                        sComp.setState(GameConstants_1.FsmStateName.FLEEING);
                    }
                    break;
                case GameConstants_1.AIConstant.FAR_AWAY:
                    sComp.setState(GameConstants_1.FsmStateName.SEEK);
                    break;
                default:
                    break;
            }
        }
        checkIfAliesNearby() {
            return this._friendlies.some((entity) => {
                return Math.abs(this.target.sprite.x - entity.sprite.x) < 20;
            });
        }
        canHitPlayer() {
            const tankComponent = this.target.getComponent(GameConstants_1.ComponentType.TANK);
            const physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
            const distance = this._player.sprite.x - this.target.sprite.x;
            const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
            const rangeOfProjectile = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity;
            const decisionMakingDistance = 300;
            if (math_util_1.MathUtil.isBetween(rangeOfProjectile, Math.abs(distance) + decisionMakingDistance, Math.abs(distance) - decisionMakingDistance)) {
                return GameConstants_1.AIConstant.CAN_HIT_ENEMY;
            }
            else if (rangeOfProjectile > Math.abs(distance)) {
                return GameConstants_1.AIConstant.CLOSE;
            }
            else {
                return GameConstants_1.AIConstant.FAR_AWAY;
            }
        }
        get player() {
            return this._player;
        }
        get friendlies() {
            return this._friendlies;
        }
    }
    ControlComponents.AiComponent = AiComponent;
    class CameraComponent extends component_1.Component {
        constructor(game) {
            super(GameConstants_1.ComponentType.CAMERA);
            this._game = game;
        }
        setFocus(entity) {
            this._game.camera.follow(entity);
        }
    }
    ControlComponents.CameraComponent = CameraComponent;
})(ControlComponents = exports.ControlComponents || (exports.ControlComponents = {}));


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(4);
const GameConstants_1 = __webpack_require__(0);
const tank_util_1 = __webpack_require__(72);
var DataComponents;
(function (DataComponents) {
    class HealthComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.HEALTH);
            this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
            this._requiredComponents.push(GameConstants_1.ComponentType.PHYSICS);
        }
        /**
         * @description
         * Deals damage to target returns true if target is still alive after damage
         *
         * */
        dealDamage(damage) {
            // Check if the damage will kill the entity
            if (this.target.sprite.health - damage <= 0) {
                this.target.getComponent(GameConstants_1.ComponentType.COLLISION).cleanCollisions();
                this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite();
                this.target.getComponent(GameConstants_1.ComponentType.LAYER).playAnimation(GameConstants_1.Action.EXPLODE, null, null, true).then(() => {
                    this.target.destroy();
                });
            }
            else {
                this.target.sprite.damage(damage);
            }
        }
        setHealth(health) {
            this.target.sprite.health = health;
            this._maxHealth = health;
        }
        getCurrentHealth() {
            return this.target.sprite.health;
        }
        getMaxHealth() {
            return this._maxHealth;
        }
    }
    DataComponents.HealthComponent = HealthComponent;
    class LayerComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.LAYER);
        }
        addLayer(cachedName) {
            if (cachedName) {
                this.target.sprite.frameName = cachedName;
            }
            return this;
        }
        addAnimation(name, frames, frameRate, loop, useNumericIndex) {
            this.target.sprite.animations.add(name, frames, frameRate, loop, useNumericIndex);
        }
        getAnimation(name) {
            return this.target.sprite.animations.getAnimation(name);
        }
        getCurrentAnimation() {
            return this.target.sprite.animations.currentAnim;
        }
        playAnimation(name, frameRate, loop, killOnComplete) {
            return new Promise(((resolve, reject) => {
                this.target.sprite.animations.play(name, frameRate, loop).onComplete.add(() => {
                    resolve();
                });
            }));
        }
    }
    DataComponents.LayerComponent = LayerComponent;
    class TankComponent extends component_1.Component {
        constructor(tankKind) {
            super(GameConstants_1.ComponentType.TANK);
            this._tankKind = tankKind;
        }
        get bulletSpeed() {
            if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
                return 700;
            }
            else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
                return 1000;
            }
            else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
                return 850;
            }
            else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
                return 1200;
            }
            else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
                return 800;
            }
            else {
                throw new Error('NO TANK FOUND TO SET BULLET SPEED');
            }
        }
        get bulletKind() {
            if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
                return GameConstants_1.TankLayout.BULLET_ONE;
            }
            else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
                return GameConstants_1.TankLayout.BULLET_THREE;
            }
            else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
                return GameConstants_1.TankLayout.BULLET_SIX;
            }
            else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
                return GameConstants_1.TankLayout.BULLET_FOUR;
            }
            else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
                return GameConstants_1.TankLayout.BULLET_FIVE;
            }
            else {
                throw new Error('NO TANK FOUND TO SET BULLET KIND');
            }
        }
        get speed() {
            if (tank_util_1.TankUtil.isLightTank(this._tankKind)) {
                return 400;
            }
            else if (tank_util_1.TankUtil.isHunterTank(this._tankKind)) {
                return 400;
            }
            else if (tank_util_1.TankUtil.isFortressTank(this._tankKind)) {
                return 300;
            }
            else if (tank_util_1.TankUtil.isArtilleryTank(this._tankKind)) {
                return 400;
            }
            else if (tank_util_1.TankUtil.isReconTank(this._tankKind)) {
                return 500;
            }
            else {
                throw new Error('NO TANK FOUND TO SET BULLET KIND');
            }
        }
        get angle() {
            return 180;
        }
        get tankKind() {
            return this._tankKind;
        }
    }
    DataComponents.TankComponent = TankComponent;
    class OwnerComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.OWNER);
        }
        set owner(owner) {
            this._owner = owner;
        }
        get owner() {
            return this._owner;
        }
    }
    DataComponents.OwnerComponent = OwnerComponent;
})(DataComponents = exports.DataComponents || (exports.DataComponents = {}));


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TankUtil {
    static isArtilleryTank(tankKind) {
        return tankKind.toString().includes('2');
    }
    static isFortressTank(tankKind) {
        return tankKind.toString().includes('1');
    }
    static isHunterTank(tankKind) {
        return tankKind.toString().includes('3');
    }
    static isLightTank(tankKind) {
        return tankKind.toString().includes('5');
    }
    static isReconTank(tankKind) {
        return tankKind.toString().includes('4');
    }
}
exports.TankUtil = TankUtil;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const component_1 = __webpack_require__(4);
var ActionComponents;
(function (ActionComponents) {
    class ShootComponent extends component_1.Component {
        constructor(game, factory) {
            super(GameConstants_1.ComponentType.SHOOT);
            this._canShoot = false;
            this._timer = 0;
            this._factory = factory;
        }
        update() {
            if (this._canShoot) {
                this._canShoot = false;
                if (Date.now() - this._timer > 1500) {
                    this.shootBullet();
                }
            }
        }
        set canShoot(value) {
            this._canShoot = value;
        }
        shootBullet() {
            this._factory.newBullet(this.target.sprite.x + 50, this.target.sprite.y - 20, this.target);
            this._timer = Date.now();
        }
        get rangeOfProjectile() {
            const tankComponent = this.target.getComponent(GameConstants_1.ComponentType.TANK);
            const physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
            const velocityYi = tankComponent.bulletSpeed * Math.sin(tankComponent.angle);
            const rangeOfProjectile = (2 * ((velocityYi) * (velocityYi)) * Math.sin(tankComponent.angle) * Math.cos(tankComponent.angle)) / physicsComponent.gravity;
            return rangeOfProjectile;
        }
    }
    ActionComponents.ShootComponent = ShootComponent;
    class MovableComponent extends component_1.Component {
        constructor() {
            super(GameConstants_1.ComponentType.MOVABLE);
        }
        _correctRotation() {
            if (this.target.sprite.body.velocity.x > 0 && this.target.sprite.body.velocity.y < 0) {
                this.target.sprite.body.angle = Math.atan2(this.target.sprite.body.velocity.y, this.target.sprite.body.velocity.x) * 180 / Math.PI;
            }
            if (this.target.sprite.body.velocity.x < 0 && this.target.sprite.body.velocity.y < 0) {
                this.target.sprite.body.angle = Math.atan2(-this.target.sprite.body.velocity.y, -this.target.sprite.body.velocity.x) * 180 / Math.PI;
            }
        }
        moveRight() {
            this.target.sprite.body.velocity.x = (this.target.getComponent(GameConstants_1.ComponentType.TANK).speed);
        }
        moveLeft() {
            this.target.sprite.body.velocity.x = -(this.target.getComponent(GameConstants_1.ComponentType.TANK).speed);
        }
        update() {
            let physicsComponent = this.target.getComponent(GameConstants_1.ComponentType.PHYSICS);
            switch (this._direction) {
                case GameConstants_1.InputType.LEFT_INPUT:
                    this.moveLeft();
                    this._correctRotation();
                    this._direction = GameConstants_1.InputType.STOP;
                    break;
                case GameConstants_1.InputType.RIGHT_INPUT:
                    this.moveRight();
                    this._correctRotation();
                    this._direction = GameConstants_1.InputType.STOP;
                    break;
                default:
                    break;
            }
        }
        get direction() {
            return this._direction;
        }
        set direction(value) {
            this._direction = value;
        }
    }
    ActionComponents.MovableComponent = MovableComponent;
})(ActionComponents = exports.ActionComponents || (exports.ActionComponents = {}));


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const stateMachine_1 = __webpack_require__(75);
const GameConstants_1 = __webpack_require__(0);
const component_1 = __webpack_require__(4);
class StateComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.STATE);
        this._fsm = new stateMachine_1.default();
    }
    addState(name, state) {
        this._fsm.add(name, state);
        state.entity = this.target;
        return this;
    }
    setState(name) {
        try {
            this._fsm.enter(name);
            return this;
        }
        catch (e) {
            console.log(e);
        }
    }
    get currentState() {
        return this._fsm.current;
    }
    update() {
        this._fsm.update();
    }
}
exports.StateComponent = StateComponent;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class StateMachine {
    constructor() {
        this._states = new Map();
    }
    add(name, state) {
        this._states.set(name, state);
    }
    enter(name) {
        if (this._current) {
            this._current.leave();
        }
        this._current = this._states.get(name);
        this._current.enter();
    }
    update() {
        if (this._current) {
            this._current.update();
        }
    }
    hasState(name) {
        return this._states.has(name);
    }
    get current() {
        return this._current;
    }
}
exports.default = StateMachine;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = __webpack_require__(8);
class Input {
    constructor() {
        this._map = new Map();
        this._emitter = new Subject_1.Subject();
    }
    add(condition, action) {
        this._map.set(condition, action);
    }
    run() {
        this._map.forEach((value, key) => {
            if (key.isDown) {
                this._emitter.next(value);
            }
        });
    }
    get emitter() {
        return this._emitter;
    }
}
exports.default = Input;


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const math_util_1 = __webpack_require__(3);
const vector_1 = __webpack_require__(14);
var TankGameLevels;
(function (TankGameLevels) {
    class TankLevel {
        constructor(game) {
            this._game = game;
        }
        /**
         * @description
         * Gets total enemies that will ever exist on current level
         * @return {number} this._totalEnemies
         */
        get totalEnemies() {
            return this._totalEnemies;
        }
        /**
         * @description
         * Gets how many enemies currently are alive at a level
         * @return {number} this._enemiesCount
         */
        get enemiesCount() {
            return this._enemiesCount;
        }
        /**
         * @description
         * Sets how many enemies currently are alive at a level
         * @param {number} value
         */
        set enemiesCount(value) {
            this._enemiesCount = value;
        }
        get enemiesSpawnTime() {
            return this._enemiesSpawnTime;
        }
        get enemies() {
            return this._enemies;
        }
        get playerStartPos() {
            return this._playerStartPos;
        }
        get enemyStartPos() {
            return this._enemyStartPos;
        }
        get whenStageCleared() {
            return this._whenStageCleared;
        }
        /**
         * @description
         * Return the bodies of the ground layer
         * @return {Phaser.Physics.P2.Body[]} this._collisionLayer
         */
        get collisionLayer() {
            return this._collisionLayer;
        }
        /**
         * @description
         * Total of enemies a level can have at a time
         * @return {number} this._capEnemies
         *
         */
        get capEnemies() {
            return this._capEnemies;
        }
        get randomDisasterSpawnTime() {
            return this._randomDisasterSpawnTime;
        }
        getRandomEnemy() {
            let toReturn = this._enemyTankKind[math_util_1.MathUtil.randomIntFromInterval(0, 4)];
            this._enemiesCount++;
            return toReturn;
        }
    }
    TankGameLevels.TankLevel = TankLevel;
    class LevelOne extends TankLevel {
        constructor(game) {
            super(game);
            this._enemiesCount = 0;
            this._enemiesSpawnTime = 3;
            this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
            this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
            this._capEnemies = 3;
            this._totalEnemies = 30;
            this._randomDisasterSpawnTime = 5000;
            this._enemyTankKind = [GameConstants_1.TankLayout.DARK_RECON, GameConstants_1.TankLayout.DARK_ARTILLERY, GameConstants_1.TankLayout.DARK_FORTRESS, GameConstants_1.TankLayout.DARK_LIGHT, GameConstants_1.TankLayout.DARK_HUNTER];
        }
        init() {
            let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_ONE);
            map.addTilesetImage(GameConstants_1.TileLayers.GRASS_LAYER, GameConstants_1.TileLayers.GRASS_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkySecondary').resizeWorld();
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
            this._map = map;
            // Setup game winning condition
            if (this._totalEnemies === 0) {
                this._whenStageCleared.next();
            }
        }
        destroy() {
            this._map.destroy();
        }
    }
    TankGameLevels.LevelOne = LevelOne;
    class LevelTwo extends TankLevel {
        constructor(game) {
            super(game);
            this._enemiesCount = 0;
            this._enemiesSpawnTime = 3;
            this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
            this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
            this._capEnemies = 3;
            this._totalEnemies = 30;
            this._enemyTankKind = [GameConstants_1.TankLayout.GREY_LIGHT, GameConstants_1.TankLayout.GREY_RECON, GameConstants_1.TankLayout.GREY_HUNTER, GameConstants_1.TankLayout.GREY_FORTRESS, GameConstants_1.TankLayout.GREY_ARTILERY];
            this._randomDisasterSpawnTime = 5000;
            if (this._totalEnemies === 0) {
                this._whenStageCleared.next();
            }
        }
        init() {
            let map = this._game.add.tilemap(GameConstants_1.Levels.LEVEL_TWO);
            map.addTilesetImage(GameConstants_1.TileLayers.CANDY_LAYER, GameConstants_1.TileLayers.CANDY_LAYER);
            map.addTilesetImage(GameConstants_1.TileLayers.BACKGROUND, GameConstants_1.TileLayers.BACKGROUND);
            map.createLayer('SkySecondary').resizeWorld();
            map.createLayer('SkyPrimary').resizeWorld();
            map.createLayer('GroundSecondary').resizeWorld();
            map.createLayer('GroundPrimary').resizeWorld();
            this._collisionLayer = this._game.physics.p2.convertCollisionObjects(map, 'GroundPath', true);
            this._map = map;
        }
        destroy() {
            this._map.destroy();
        }
    }
    TankGameLevels.LevelTwo = LevelTwo;
})(TankGameLevels = exports.TankGameLevels || (exports.TankGameLevels = {}));


/***/ })
],[15]);
//# sourceMappingURL=main.js.map