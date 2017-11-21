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
    TankLayout["TANK_SPRITESHEET"] = "tankSpritesheet";
})(TankLayout = exports.TankLayout || (exports.TankLayout = {}));
var ComponentType;
(function (ComponentType) {
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
var Direction;
(function (Direction) {
    Direction["RIGHT_INPUT"] = "right";
    Direction["LEFT_INPUT"] = "left";
})(Direction = exports.Direction || (exports.Direction = {}));
//# sourceMappingURL=GameConstants.js.map