webpackJsonp([0],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var States;
(function (States) {
    States["BOOT_STATE"] = "boot_state";
    States["PRELOAD_STATE"] = "preload_state";
    States["GAME_STATE"] = "game_state";
})(States = exports.States || (exports.States = {}));
var Levels;
(function (Levels) {
    Levels["LEVEL_ONE"] = "level_one";
    Levels["LEVEL_TWO"] = "level_two";
})(Levels = exports.Levels || (exports.Levels = {}));
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
})(UIComponents = exports.UIComponents || (exports.UIComponents = {}));
var TileLayers;
(function (TileLayers) {
    TileLayers["GRASS_LAYER"] = "grassLayer";
    TileLayers["BACKGROUND"] = "background";
})(TileLayers = exports.TileLayers || (exports.TileLayers = {}));
var InputType;
(function (InputType) {
    InputType["STOP"] = "stop";
    InputType["RIGHT_INPUT"] = "right";
    InputType["LEFT_INPUT"] = "left";
    InputType["SHOOT"] = "shoot";
})(InputType = exports.InputType || (exports.InputType = {}));
var TankWorldEvents;
(function (TankWorldEvents) {
    TankWorldEvents["SPAWN_BULLET"] = "spawnBullet";
})(TankWorldEvents = exports.TankWorldEvents || (exports.TankWorldEvents = {}));
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
var FSMStates;
(function (FSMStates) {
    FSMStates[FSMStates["IDLE"] = 0] = "IDLE";
    FSMStates[FSMStates["SEEK"] = 1] = "SEEK";
    FSMStates[FSMStates["FIRING"] = 2] = "FIRING";
    FSMStates[FSMStates["FLEEING"] = 3] = "FLEEING";
})(FSMStates = exports.FSMStates || (exports.FSMStates = {}));


/***/ }),
/* 1 */
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
    update(params) { }
}
exports.Component = Component;


/***/ }),
/* 2 */,
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class State {
    set entity(entity) {
        this._entity = entity;
    }
}
exports.State = State;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
class State extends Phaser.State {
}
exports.default = State;


/***/ }),
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
class AssetLoader {
    constructor() {
        // Animations
        this._animations = new Map();
        // Images
        this._progressBarUrl = __webpack_require__(29);
        this._logoUrl = __webpack_require__(30);
        // Levels
        this._levelOneUrl = __webpack_require__(31);
        // Atlas
        this._tankSpritesheetUrlXLM = __webpack_require__(32);
        this._tankSpritesheetUrl = __webpack_require__(33);
        // Spritesheet
        this._grassLayerUrl = __webpack_require__(34);
        this._backgroundUrl = __webpack_require__(35);
    }
    /**
     * Run once during Boot state to pass reference to loader.
     * @param {Phaser.Loader} loader   The phaser loader
     * @return {void}
     **/
    init(loader) {
        this.loader = loader;
    }
    loadBoot() {
        try {
            this.loader.image(GameConstants_1.UIComponents.PROGRESS_BAR, this._progressBarUrl);
            this.loader.image(GameConstants_1.UIComponents.LOGO, this._logoUrl);
        }
        catch (e) {
            console.log(e);
            // todo: Exception handling class
        }
    }
    setLoadingScreen(state) {
        let logo = state.add.sprite(state.game.world.centerX, state.game.world.centerY, GameConstants_1.UIComponents.LOGO);
        let progressBar = state.add.sprite(state.game.world.centerX, state.game.world.centerY + 128, GameConstants_1.UIComponents.PROGRESS_BAR);
        logo.anchor.setTo(0.5);
        progressBar.anchor.setTo(0.5);
        state.load.setPreloadSprite(progressBar);
    }
    loadAll() {
        this.loader.tilemap(GameConstants_1.Levels.LEVEL_ONE, this._levelOneUrl, null, Phaser.Tilemap.TILED_JSON);
        this.loader.atlasXML(GameConstants_1.TankLayout.TANK_SPRITESHEET, this._tankSpritesheetUrl, this._tankSpritesheetUrlXLM);
        this.loader.image(GameConstants_1.TileLayers.GRASS_LAYER, this._grassLayerUrl);
        this.loader.image(GameConstants_1.TileLayers.BACKGROUND, this._backgroundUrl);
    }
    get loader() {
        if (this._loader === null) {
            throw new Error('Loader cannot be empty, ensure AssetsUtils.init() has run before');
        }
        return this._loader;
    }
    set loader(value) {
        this._loader = value;
    }
}
// noinspection TsLint
const AssetsUtils = new AssetLoader();
exports.default = AssetsUtils;


/***/ }),
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {
Object.defineProperty(exports, "__esModule", { value: true });
/** Imports */
__webpack_require__(15);
__webpack_require__(17);
__webpack_require__(19);
__webpack_require__(22);
const GameConstants_1 = __webpack_require__(0);
const boot_state_1 = __webpack_require__(28);
const preload_state_1 = __webpack_require__(36);
const game_state_1 = __webpack_require__(37);
const ScreenMetrics_1 = __webpack_require__(73);
// The main class of our application
class App extends Phaser.Game {
    constructor(config) {
        super(config);
        this.state.add(GameConstants_1.States.BOOT_STATE, boot_state_1.BootState);
        this.state.add(GameConstants_1.States.PRELOAD_STATE, preload_state_1.PreloadState);
        this.state.add(GameConstants_1.States.GAME_STATE, game_state_1.GameState);
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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(14)(module)))

/***/ }),
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(4);
const GameConstants_1 = __webpack_require__(0);
const Assets_1 = __webpack_require__(8);
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


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/progressBar.png";

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/images/logo.png";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/levels/level1.json";

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/tanks_xml.xml";

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/tanks.png";

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/grassLayer.png";

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "assets/spritesheet/backgroundElements.png";

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(4);
const Assets_1 = __webpack_require__(8);
const GameConstants_1 = __webpack_require__(0);
class PreloadState extends state_1.default {
    constructor() {
        super();
        console.log(this.load);
    }
    preload() {
        Assets_1.default.setLoadingScreen(this);
        // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
        Assets_1.default.loadAll();
        // Set World variables
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.gravity.y = 1400;
        this.game.physics.p2.setImpactEvents(true);
        this.game.physics.p2.setBoundsToWorld(true, true, true, true);
    }
    create() {
        // todo: Set main menu instead of level one
        this.game.state.start(GameConstants_1.States.GAME_STATE);
    }
    update() {
    }
}
exports.PreloadState = PreloadState;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(4);
const input_1 = __webpack_require__(38);
const TankWorldFactory_1 = __webpack_require__(51);
const GameConstants_1 = __webpack_require__(0);
class GameState extends state_1.default {
    constructor() {
        super();
        this._input = new input_1.default();
    }
    preload() {
        // As we have generated our own world bounds we need to reset them and tell phaser we have them in a group, which rests in factort
        this._factory = new TankWorldFactory_1.default(this.game);
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
        this._factory.newEnemy();
    }
    update() {
        this._input.run();
        this._factory.entities.forEach((e) => {
            e.update();
        });
    }
    shutdown() {
        // Ensure no memory leaks
        this._inputSubscription.unsubscribe();
    }
}
exports.GameState = GameState;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = __webpack_require__(39);
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
            if (key.isDown === true) {
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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const camera_component_1 = __webpack_require__(52);
const movable_component_1 = __webpack_require__(53);
const entity_1 = __webpack_require__(54);
const GameConstants_1 = __webpack_require__(0);
const physics_component_1 = __webpack_require__(55);
const levelOne_1 = __webpack_require__(56);
const shoot_component_1 = __webpack_require__(59);
const layer_component_1 = __webpack_require__(60);
const bullet_component_1 = __webpack_require__(61);
const collisions_component_1 = __webpack_require__(62);
const ai_component_1 = __webpack_require__(63);
const state_component_1 = __webpack_require__(65);
const idle_state_1 = __webpack_require__(67);
const seek_state_1 = __webpack_require__(68);
const firing_state_1 = __webpack_require__(69);
const owner_component_1 = __webpack_require__(70);
const guid_1 = __webpack_require__(71);
const flee_state_1 = __webpack_require__(72);
class TankWorldFactory {
    constructor(game) {
        // Arrays
        this._levels = [];
        this._entities = [];
        this._levels.push(new levelOne_1.LevelOne(game));
        this._levels.forEach((level) => {
            level.init();
        });
        this._currentLevel = this._levels[0];
        this._game = game;
        // init collision groups
        this._tankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._bulletCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._groundCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyTankCollisionGroup = this._game.physics.p2.createCollisionGroup();
        this._enemyBulletsCollisionGroup = this._game.physics.p2.createCollisionGroup();
        // Have to do this here as we cannot enforce layer to be Entity to attach component
        this._currentLevel.collisionLayer.forEach((layer) => {
            layer.setCollisionGroup(this._groundCollisionGroup);
            layer.collides([
                this._tankCollisionGroup, this._bulletCollisionGroup,
                this._enemyBulletsCollisionGroup, this._enemyTankCollisionGroup
            ]);
        });
        // Force all groups to collide with world bounds
        this._game.physics.p2.updateBoundsCollisionGroup();
    }
    newPlayer() {
        let player = new entity_1.Entity(this._game, this._currentLevel.playerStartPos.x, this._currentLevel.playerStartPos.y)
            .withComponent([new movable_component_1.MovableComponent(),
            new camera_component_1.CameraComponent(this._game),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent()]);
        player.getComponent(GameConstants_1.ComponentType.CAMERA).setFocus(player.sprite);
        player.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .delayGravity(false);
        player.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.CANDY_HUNTER);
        player.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._tankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyTankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._enemyBulletsCollisionGroup, [GameConstants_1.Action.NOTHING]);
        this._entities.push(player);
        this._player = player;
        this._player.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        return player;
    }
    newEnemy() {
        let enemy = new entity_1.Entity(this._game, this._currentLevel.enemyStartPos.x, this._currentLevel.enemyStartPos.y, null)
            .withComponent([
            new movable_component_1.MovableComponent(),
            new physics_component_1.PhysicsComponent(this._game),
            new shoot_component_1.ShootComponent(this._game, this),
            new layer_component_1.LayerComponent(),
            new collisions_component_1.CollisionsComponent(),
            new state_component_1.StateComponent(),
            new ai_component_1.AiComponent(this._player)
        ]);
        enemy.getComponent(GameConstants_1.ComponentType.STATE)
            .addState(GameConstants_1.FSMStates.SEEK, new seek_state_1.SeekState())
            .addState(GameConstants_1.FSMStates.IDLE, new idle_state_1.IdleState())
            .addState(GameConstants_1.FSMStates.FIRING, new firing_state_1.FiringState())
            .addState(GameConstants_1.FSMStates.FLEEING, new flee_state_1.FleeState())
            .setState(GameConstants_1.FSMStates.IDLE);
        enemy.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics()
            .flipSprite();
        enemy.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.DARK_ARTILLERY);
        enemy.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this._enemyTankCollisionGroup)
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.NOTHING])
            .collidesWith(this._bulletCollisionGroup, [GameConstants_1.Action.NOTHING]);
        this._entities.push(enemy);
        enemy.sprite.data = {
            tag: guid_1.Guid.newGuid()
        };
        return enemy;
    }
    newBullet(x, y, owner) {
        let bullet = new entity_1.Entity(this._game, x, y)
            .withComponent([new physics_component_1.PhysicsComponent(this._game), new layer_component_1.LayerComponent(),
            new bullet_component_1.BulletComponent(this._game), new collisions_component_1.CollisionsComponent(),
            new owner_component_1.OwnerComponent()]);
        bullet.getComponent(GameConstants_1.ComponentType.OWNER).owner = owner;
        bullet.getComponent(GameConstants_1.ComponentType.PHYSICS)
            .addPhysics(false);
        bullet.getComponent(GameConstants_1.ComponentType.LAYER).addLayer(GameConstants_1.TankLayout.BULLET_FIVE);
        bullet.getComponent(GameConstants_1.ComponentType.BULLET)
            .bulletInit();
        bullet.getComponent(GameConstants_1.ComponentType.COLLISION)
            .setCollisionGroup(this.setBulletColisionGroup(owner))
            .collidesWith(this._tankCollisionGroup, [GameConstants_1.Action.EXPLODE, GameConstants_1.Action.DAMAGE])
            .collidesWith(this._groundCollisionGroup, [GameConstants_1.Action.EXPLODE]);
        this._entities.push(bullet);
        return bullet;
    }
    get entities() {
        return this._entities;
    }
    setBulletColisionGroup(owner) {
        if (owner.sprite.data.tag === this._player.sprite.data.tag) {
            return this._bulletCollisionGroup;
        }
        return this._enemyBulletsCollisionGroup;
    }
}
exports.default = TankWorldFactory;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const component_1 = __webpack_require__(1);
class CameraComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.CAMERA);
        this._game = game;
    }
    setFocus(entity) {
        this._game.camera.follow(entity);
    }
}
exports.CameraComponent = CameraComponent;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
class MovableComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.MOVABLE);
        this._speed = 300;
        this._isMoving = false;
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
        this.target.sprite.body.moveRight(this._speed);
    }
    moveLeft() {
        this.target.sprite.body.moveLeft(this._speed);
    }
    update() {
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
exports.MovableComponent = MovableComponent;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
class Entity {
    constructor(game, x, y, components) {
        this._components = new Map();
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
        }
        this._sprite = game.add.sprite(x, y, GameConstants_1.TankLayout.TANK_SPRITESHEET);
    }
    addComponent(component) {
        this._components.set(component.name, component);
        this._components.get(component.name).target = this;
        return component;
    }
    getComponent(componentName) {
        return this._components.get(componentName);
    }
    update() {
        this._components.forEach((componentType) => {
            this._components.get(componentType.name).update();
        });
    }
    withComponent(components) {
        if (components) {
            components.forEach((component) => {
                this.addComponent(component);
            });
            return this;
        }
    }
    get components() {
        return this._components;
    }
    get sprite() {
        return this._sprite;
    }
}
exports.Entity = Entity;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
class PhysicsComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.PHYSICS);
        this._game = game;
    }
    addPhysics(gravity = true) {
        this._game.physics.p2.enable(this.target.sprite);
        this.target.sprite.anchor.setTo(0.5, 0.5);
        gravity ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0.0;
        return this;
    }
    delayGravity(bool = true, delay = 2000) {
        this.target.sprite.body.enableGravity = false;
        if (bool) {
            setInterval(() => {
                this.target.sprite.body.enableGravity = true;
            }, delay);
        }
    }
    flipSprite() {
        this.target.sprite.scale.x = -1;
        return this;
    }
    stopSprite() {
        this.target.sprite.body.motionState = Phaser.Physics.P2.Body.STATIC;
        this.target.sprite.body.restitution = 0.0;
        this.target.sprite.body.velocity.x = 0;
        this.target.sprite.body.velocity.y = 0;
        this.target.sprite.body.allowGravity = false;
        this.target.sprite.body.angularDumping = 1;
    }
}
exports.PhysicsComponent = PhysicsComponent;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const tankLevel_1 = __webpack_require__(57);
const GameConstants_1 = __webpack_require__(0);
const vector_1 = __webpack_require__(58);
class LevelOne extends tankLevel_1.default {
    constructor(game) {
        super(game);
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
        this._playerStartPos = new vector_1.default(this._game.world.bounds.left, this._game.world.centerY + 100);
        this._enemyStartPos = new vector_1.default(this._game.world.bounds.right, this._game.world.centerY);
    }
    destroy() {
    }
}
exports.LevelOne = LevelOne;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class TankLevel {
    constructor(game) {
        this._game = game;
    }
    spawnEnemy() {
        return null;
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
    get collisionLayer() {
        return this._collisionLayer;
    }
}
exports.default = TankLevel;


/***/ }),
/* 58 */
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
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const component_1 = __webpack_require__(1);
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
}
exports.ShootComponent = ShootComponent;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
class LayerComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.LAYER);
    }
    addLayer(cachedName) {
        if (cachedName) {
            this.target.sprite.frameName = cachedName;
        }
    }
}
exports.LayerComponent = LayerComponent;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
class BulletComponent extends component_1.Component {
    // todo: Should this be on the PhysicsComponent?
    constructor(game) {
        super(GameConstants_1.ComponentType.BULLET);
        this._game = game;
        this._requiredComponents.push(GameConstants_1.ComponentType.OWNER);
    }
    bulletInit() {
        let cOwner = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        if (!cOwner) {
            return;
        }
        let seekObject = {
            x: this._game.input.activePointer.x,
            y: this._game.input.activePointer.y
        };
        // Check if there is an AIComponent if yes this is not our player
        let ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        let aiComponent = ownerComponent ? ownerComponent.owner.getComponent(GameConstants_1.ComponentType.AI) : null;
        if (aiComponent) {
            // If yes do not fire bulet according to mouse but to player; AIComponent knows where the player is
            seekObject.x = aiComponent.player.sprite.x;
            seekObject.y = aiComponent.player.sprite.y;
        }
        this.accelerateToObject(this.target.sprite, seekObject);
    }
    degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    accelerateToObject(obj1, obj2, speed = 1400) {
        let angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
        obj1.body.velocity.x = Math.cos(angle) * speed; // accelerateToObject
        obj1.body.velocity.y = Math.sin(angle) * speed;
    }
}
exports.BulletComponent = BulletComponent;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
class CollisionsComponent extends component_1.Component {
    constructor() {
        super(GameConstants_1.ComponentType.COLLISION);
        this._ignoreCollision = true;
        this._requiredComponents = [GameConstants_1.ComponentType.PHYSICS];
    }
    setCollisionGroup(ownerCollisionGroup) {
        this.target.sprite.body.setCollisionGroup(ownerCollisionGroup);
        return this;
    }
    collidesWith(collidesWith, actions) {
        let body = this.target.sprite.body;
        if (body.collidesWith.includes(collidesWith)) {
            return; // In case we attempt to set the same collision group twice
        }
        actions.forEach((action) => {
            switch (action) {
                case GameConstants_1.Action.NOTHING:
                    body.collides(collidesWith);
                    break;
                case GameConstants_1.Action.EXPLODE:
                    body.collides(collidesWith, this.explode, this);
                    break;
                case GameConstants_1.Action.DAMAGE:
                    break;
                default:
                    break;
            }
        });
        return this;
    }
    explode(ownerBody, impacted) {
        // If layout is imported with tiled, which we do the body doesn't have a sprite therefor would throw an exception
        let impactedSprite = impacted.sprite;
        let ownerComponent = this.target.getComponent(GameConstants_1.ComponentType.OWNER);
        if (impactedSprite) {
            // not all entities have an owner
            if (ownerComponent) {
                if (ownerComponent.owner.sprite.data.tag === impactedSprite.data.tag) {
                    return; // do nothing
                }
            }
        }
        this.target.getComponent(GameConstants_1.ComponentType.PHYSICS).stopSprite();
        ownerBody.sprite.animations.add(GameConstants_1.Action.EXPLODE, Phaser.Animation.generateFrameNames('tank_explosion', 1, 8, '.png'), 15, false);
        ownerBody.sprite.animations.play(GameConstants_1.Action.EXPLODE).onComplete.add(() => {
            ownerBody.sprite.kill();
            ownerBody.sprite.destroy();
        });
    }
}
exports.CollisionsComponent = CollisionsComponent;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
const math_util_1 = __webpack_require__(64);
class AiComponent extends component_1.Component {
    constructor(player) {
        super(GameConstants_1.ComponentType.AI);
        this._requiredComponents = [GameConstants_1.ComponentType.MOVABLE, GameConstants_1.ComponentType.PHYSICS, GameConstants_1.ComponentType.SHOOT];
        this._player = player;
    }
    update() {
        this.decide();
    }
    decide() {
        let distance = math_util_1.MathUtil.normalize(this._player.sprite.x - this.target.sprite.x);
        // Justify this in the report say tanks can only spawn on the right of the player
        let sComp = this._target.getComponent(GameConstants_1.ComponentType.STATE);
        console.log(Math.abs(distance));
        if (sComp) {
            if (Math.abs(distance) >= 0.15) {
                sComp.setState(GameConstants_1.FSMStates.SEEK);
            }
            else if (Math.abs(distance) <= 0.08) {
                sComp.setState(GameConstants_1.FSMStates.FLEEING);
            }
            else {
                sComp.setState(GameConstants_1.FSMStates.FIRING);
            }
        }
    }
    get player() {
        return this._player;
    }
}
exports.AiComponent = AiComponent;


/***/ }),
/* 64 */
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
}
exports.MathUtil = MathUtil;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const component_1 = __webpack_require__(1);
const stateMachine_1 = __webpack_require__(66);
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
        this._fsm.enter(name);
        return this;
    }
    update() {
        this._fsm.update();
    }
}
exports.StateComponent = StateComponent;


/***/ }),
/* 66 */
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
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(3);
class IdleState extends state_1.State {
    enter() {
        console.log('Idle state enter function');
    }
    leave() {
        console.log('Idle state leave function');
    }
    update() {
    }
}
exports.IdleState = IdleState;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(3);
const GameConstants_1 = __webpack_require__(0);
class SeekState extends state_1.State {
    enter() {
        // We know any component implementing SeekState will have an AI component
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.LEFT_INPUT;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
    }
    update() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
    }
}
exports.SeekState = SeekState;


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = __webpack_require__(3);
const GameConstants_1 = __webpack_require__(0);
class FiringState extends state_1.State {
    enter() {
        this._entity.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = true;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.SHOOT).canShoot = false;
    }
    update() {
    }
}
exports.FiringState = FiringState;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = __webpack_require__(1);
const GameConstants_1 = __webpack_require__(0);
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
exports.OwnerComponent = OwnerComponent;


/***/ }),
/* 71 */
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
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = __webpack_require__(0);
const state_1 = __webpack_require__(3);
class FleeState extends state_1.State {
    enter() {
        // We know any component implementing SeekState will have an AI component
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.RIGHT_INPUT;
    }
    leave() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).direction = GameConstants_1.InputType.STOP;
    }
    update() {
        this._entity.getComponent(GameConstants_1.ComponentType.MOVABLE).update();
    }
}
exports.FleeState = FleeState;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/*
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


/***/ })
],[13]);
//# sourceMappingURL=main.js.map