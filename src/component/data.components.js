"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
const tank_util_1 = require("../UI/tank.util");
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
//# sourceMappingURL=data.components.js.map