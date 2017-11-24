"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var States;
(function (States) {
    States["BOOT_STATE"] = "bootState";
    States["PRELOAD_STATE"] = "preloadState";
    States["GAME_STATE"] = "gameState";
})(States = exports.States || (exports.States = {}));
var Levels;
(function (Levels) {
    Levels["LEVEL_ONE"] = "levelOne";
    Levels["LEVEL_TWO"] = "levelTwo";
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
    ComponentType["COLLISION"] = "collision";
    ComponentType["BULLET"] = "bullet";
    ComponentType["LAYER"] = "layer";
    ComponentType["SHOOT"] = "shoot";
    ComponentType["PHYSICS"] = "physics";
    ComponentType["CAMERA"] = "camera";
    ComponentType["MOVABLE"] = "movable";
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
//# sourceMappingURL=GameConstants.js.map