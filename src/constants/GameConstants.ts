export enum States {
  MAIN_MENU_STATE = 'main_menu_state',
  BOOT_STATE = 'boot_state',
  PRELOAD_STATE = 'preload_state',
  GAME_STATE = 'game_state'
}

export enum Levels {
  LEVEL_ONE = 'level_one',
  LEVEL_TWO = 'level_two'
}

export enum   TankLayout {
  GREEN_FORTRESS = 'tanks_tankGreen1.png', GREEN_ARTILERY = 'tanks_tankGreen2.png',
  GREEN_HUNTER = 'tanks_tankGreen3.png', GREEN_RECON = 'tanks_tankGreen4.png',
  GREEN_LIGHT = 'tanks_tankGreen5.png',
  GREY_FORTRESS = 'tanks_tankGrey1.png', GREY_ARTILERY = 'tanks_tankGrey2.png',
  GREY_HUNTER = 'tanks_tankGrey3.png', GREY_RECON = 'tanks_tankGrey4.png',
  GREY_LIGHT = 'tanks_tankGrey5.png',
  CANDY_FORTRESS = 'tanks_tankDesert1.png', CANDY_ARTILLERY = 'tanks_tankDesert2.png',
  CANDY_HUNTER = 'tanks_tankDesert3.png', CANDY_RECON = 'tanks_tankDesert4.png',
  CANDY_LIGHT = 'tanks_tankDesert5.png',
  DARK_FORTRESS = 'tanks_tankNavy1.png', DARK_ARTILLERY = 'tanks_tankNavy2.png',
  DARK_HUNTER = 'tanks_tankNavy3.png', DARK_RECON = 'tanks_tankNavy4.png',
  DARK_LIGHT = 'tanks_tankNavy5.png',
  BULLET_ONE = 'tank_bullet1.png', BULLET_TWO = 'tank_bullet2.png',
  BULLET_THREE = 'tank_bullet3.png', BULLET_FOUR = 'tank_bullet4.png',
  BULLET_FIVE = 'tank_bullet5.png', BULLET_SIX = 'tank_bullet6.png',
  EXPLOSION_ONE = 'tank_explosion1.png',
  EXPLOSION_TWO = 'tank_explosion2.png',
  EXPLOSION_THREE = 'tank_explosion3.png',
  EXPLOSION_FOUR = 'tank_explosion4.png',
  EXPLOSION_FIVE = 'tank_explosion5.png',
  EXPLOSION_SIX = 'tank_explosion6.png',
  EXPLOSION_SEVEN = 'tank_explosion7.png',
  EXPLOSION_EIGHT = 'tank_explosion8.png',
  EXPLOSION_NINE = 'tank_explosion9.png',
  EXPLOSION_TEN = 'tank_explosion10.png',
  EXPLOSION_ELEVEN = 'tank_explosion11.png',
  EXPLOSION_TWELVE = 'tank_explosion12.png',
  TANK_SPRITESHEET  = 'tankSpritesheet'
}
export enum ComponentType {
  TANK = 'tank_component',
  OWNER = 'owner_component',
  STATE = 'state_component',
  AI = 'ai_component',
  COLLISION = 'collision_component',
  BULLET = 'bullet_component',
  LAYER = 'layer_component',
  SHOOT = 'shoot_component',
  PHYSICS = 'physics_component',
  CAMERA = 'camera_component',
  MOVABLE = 'movable_component'
}

export enum UIComponents {
  PROGRESS_BAR = 'progresBar',
  LOGO = 'logo',
  PANEL = 'green_panel.png',
  FULL_BUTTON = 'green_button00.png',
  YES_BUTTON = 'green_boxCheckmark.png',
  NO_BUTTON = 'green_boxCross.png',
  UI_SPRITESHEET = 'uiSpritesheet',
  LEVEL_ONE_IMAGE = 'level_one_image',
  LEVEL_TWO_IMAGE = 'level_two_image',
  CANDY_FORTRESS_IMG = 'candy_fortress_img', CANDY_ARTILLERY_IMG = 'candy_artillery_img',
  CANDY_HUNTER_IMG = 'candy_hunter_img', CANDY_RECON_IMG = 'candy_recon_img',
  CANDY_LIGHT_IMG = 'candy_light_img'
}

export enum TileLayers {
  GRASS_LAYER = 'grassLayer',
  BACKGROUND = 'background',
  CANDY_LAYER = 'candyLayer'
}

export enum InputType {
  STOP = 'stop',
  RIGHT_INPUT = 'right',
  LEFT_INPUT = 'left',
  SHOOT = 'shoot'
}

export enum Action {
  EXPLODE = 'explode_action',
  DAMAGE = 'damage_action',
  NOTHING = 'no_action'
}

export enum AnimationTypes {
  EXPLOSION = 'explosion_animation'
}
export enum FSMStates {
  IDLE,
  SEEK,
  FIRING,
  FLEEING
}
export enum MainMenuButtons {
  NEW_GAME = 'new_game',
  HIGH_SCORE = 'high_score',
  PREFERENCES = 'preferences',
  SELECT_LEVEL = 'select_level',
  SELECT_PLAYER = 'select_player',
  SELECT_DIFFICULTY = 'select_difficulty',
  BACK = 'back'
}
