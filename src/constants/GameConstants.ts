export enum States {
  BOOT_STATE = 'bootState',
  PRELOAD_STATE = 'preloadState',
  GAME_STATE = 'gameState'
}

export enum Levels {
  LEVEL_ONE = 'levelOne',
  LEVEL_TWO = 'levelTwo'
}

export enum TankLayout {
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
  TANK_SPRITESHEET = 'tankSpritesheet'
}

export enum ComponentType {
  LAYER = 'layer',
  SHOOT = 'shoot',
  PHYSICS = 'physics',
  CAMERA = 'camera',
  MOVABLE = 'movable'
}

export enum UIComponents {
  PROGRESS_BAR = 'progresBar',
  LOGO = 'logo'
}

export enum TileLayers {
  GRASS_LAYER = 'grassLayer',
  BACKGROUND = 'background'
}

export enum InputType {
  STOP = 'stop',
  RIGHT_INPUT = 'right',
  LEFT_INPUT = 'left',
  SHOOT = 'shoot'
}
export enum TankWorldEvents {
  SPAWN_BULLET = 'spawnBullet',
}
