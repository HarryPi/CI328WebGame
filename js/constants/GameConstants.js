"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var States;
(function (States) {
    States["STAGE_CLEAR_STATE"] = "stage_clear_state";
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
    TankLayout["GREEN_ARTILLERY"] = "tanks_tankGreen1.png";
    TankLayout["GREEN_HUNTER"] = "tanks_tankGreen2.png";
    TankLayout["GREEN_FORTRESS"] = "tanks_tankGreen3.png";
    TankLayout["GREEN_RECON"] = "tanks_tankGreen4.png";
    TankLayout["GREEN_LIGHT"] = "tanks_tankGreen5.png";
    TankLayout["GREY_ARTILLERY"] = "tanks_tankGrey1.png";
    TankLayout["GREY_HUNTER"] = "tanks_tankGrey2.png";
    TankLayout["GREY_FORTRESS"] = "tanks_tankGrey3.png";
    TankLayout["GREY_RECON"] = "tanks_tankGrey4.png";
    TankLayout["GREY_LIGHT"] = "tanks_tankGrey5.png";
    TankLayout["CANDY_ARTILLERY"] = "tanks_tankDesert1.png";
    TankLayout["CANDY_HUNTER"] = "tanks_tankDesert2.png";
    TankLayout["CANDY_FORTRESS"] = "tanks_tankDesert3.png";
    TankLayout["CANDY_RECON"] = "tanks_tankDesert4.png";
    TankLayout["CANDY_LIGHT"] = "tanks_tankDesert5.png";
    TankLayout["DARK_ARTILLERY"] = "tanks_tankNavy1.png";
    TankLayout["DARK_HUNTER"] = "tanks_tankNavy2.png";
    TankLayout["DARK_FORTRESS"] = "tanks_tankNavy3.png";
    TankLayout["DARK_RECON"] = "tanks_tankNavy4.png";
    TankLayout["DARK_LIGHT"] = "tanks_tankNavy5.png";
    TankLayout["BULLET_ONE"] = "tank_bullet1.png";
    TankLayout["BULLET_TWO"] = "tank_bullet2.png";
    TankLayout["BULLET_THREE"] = "tank_bullet3.png";
    TankLayout["BULLET_FOUR"] = "tank_bullet4.png";
    TankLayout["BULLET_FIVE"] = "tank_bullet5.png";
    TankLayout["BULLET_SIX"] = "tank_bullet6.png";
    TankLayout["CRATE_REPAIR"] = "tanks_crateRepair.png";
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
    ComponentType["POWER_UP"] = "power_up_component";
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
var Sounds;
(function (Sounds) {
    Sounds["EXPLOSION"] = "explosion";
    Sounds["GAME_MUSIC"] = "game_music";
    Sounds["MISSILE_FIRE"] = "missile_fire";
    Sounds["MAIN_MENU"] = "main_menu";
})(Sounds = exports.Sounds || (exports.Sounds = {}));
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
    Action["POWER_UP"] = "power_up";
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
var CrateName;
(function (CrateName) {
    CrateName[CrateName["REPAIR_CRATE"] = 0] = "REPAIR_CRATE";
})(CrateName = exports.CrateName || (exports.CrateName = {}));
//# sourceMappingURL=GameConstants.js.map