"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const tank_util_1 = require("../UI/tank.util");
const data_config_1 = require("../config/data.config");
const uimanagers_1 = require("../UI/uimanagers");
var DataComponents;
(function (DataComponents) {
    class HealthComponent extends component_1.Component {
        constructor(game, state) {
            super(GameConstants_1.ComponentType.HEALTH);
            this._requiredComponents.push(GameConstants_1.ComponentType.LAYER);
            this._requiredComponents.push(GameConstants_1.ComponentType.PHYSICS);
            this._game = game;
            this._state = state;
        }
        /**
         * @description
         * Deals damage to target returns true if target is still alive after damage
         *
         */
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
        pendingHeal() {
            return !!this._healingTimeout;
        }
        restoreHealth() {
            const playerUi = new uimanagers_1.UiManagers.PlayerVisualsManager(this._state);
            playerUi.addPowerUpIcon(GameConstants_1.TankLayout.CRATE_REPAIR);
            const healingDone = () => {
                if (data_config_1.DataConfig.difficulty === GameConstants_1.Difficulty.EASY || data_config_1.DataConfig.difficulty === GameConstants_1.Difficulty.NORMAL) {
                    return 4;
                }
                else if (data_config_1.DataConfig.difficulty === GameConstants_1.Difficulty.HARD) {
                    return 2;
                }
                else if (data_config_1.DataConfig.difficulty === GameConstants_1.Difficulty.INSANE) {
                    return 1;
                }
                else {
                    return 1;
                }
            };
            let heal = () => {
                let toRestore = healingDone();
                if (this.getCurrentHealth() + toRestore > this._maxHealth) {
                    toRestore = this._maxHealth - this.getCurrentHealth();
                }
                playerUi.addHeartByHealingReceived(toRestore);
                playerUi.removePowerUpIcon(GameConstants_1.TankLayout.CRATE_REPAIR);
                this.target.sprite.heal(toRestore);
                clearTimeout(this._healingTimeout);
                this._healingTimeout = null;
            };
            this._healingTimeout = setTimeout(heal, 5000);
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
        get bulletDmg() {
            const bulletKind = this.bulletKind;
            if (bulletKind === GameConstants_1.TankLayout.BULLET_ONE) {
                return 1;
            }
            else if (bulletKind === GameConstants_1.TankLayout.BULLET_TWO) {
                return 1;
            }
            else if (bulletKind === GameConstants_1.TankLayout.BULLET_THREE) {
                return 1;
            }
            else if (bulletKind === GameConstants_1.TankLayout.BULLET_FOUR) {
                return 2;
            }
            else if (bulletKind === GameConstants_1.TankLayout.BULLET_FIVE) {
                return 2;
            }
            else if (bulletKind === GameConstants_1.TankLayout.BULLET_SIX) {
                return 2;
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
        get tankKindName() {
            if (tank_util_1.TankUtil.isFortressTank(this.tankKind)) {
                return 'Fortress Tank';
            }
            if (tank_util_1.TankUtil.isArtilleryTank(this.tankKind)) {
                return 'Artillery Tank';
            }
            if (tank_util_1.TankUtil.isHunterTank(this.tankKind)) {
                return 'Hunter Tank';
            }
            if (tank_util_1.TankUtil.isLightTank(this.tankKind)) {
                return 'Light Tank';
            }
            if (tank_util_1.TankUtil.isReconTank(this.tankKind)) {
                return 'Recon Tank';
            }
        }
        get angle() {
            return 180;
        }
        get tankKind() {
            return this._tankKind;
        }
        set tankKind(value) {
            this._tankKind = value;
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
//# sourceMappingURL=data.components.js.map