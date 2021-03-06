"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../../constants/GameConstants");
const data_config_1 = require("../../config/data.config");
const math_util_1 = require("../../util/math.util");
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
//# sourceMappingURL=fsm.states.js.map