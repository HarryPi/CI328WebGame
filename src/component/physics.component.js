"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const component_1 = require("./component");
const GameConstants_1 = require("../constants/GameConstants");
class PhysicsComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.PHYSICS);
        this._game = game;
    }
    addPhysics(gravity = true) {
        this._game.physics.p2.enable(this.target.sprite);
        gravity ? this.target.sprite.body.angularDamping = 0.7 : this.target.sprite.body.angularDamping = 0;
        return this;
    }
    setAngle(angle) {
        this.target.sprite.body.motionState = Phaser.Physics.P2.Body.KINEMATIC;
        this.target.sprite.body.angle = angle;
        return this;
    }
    delayGravity(bool, delay = 2000) {
        this.target.sprite.body.enableGravity = false;
        if (bool) {
            setInterval(() => {
                this.target.sprite.body.enableGravity = true;
            }, delay);
        }
    }
}
exports.PhysicsComponent = PhysicsComponent;
/*  public setVelocity(vec: Vector): PhysicsComponent {
      this.target.sprite.body.velocity.x = vec.x;
      this.target.sprite.body.velocity.y = vec.y;
      return this;
  }


  }*/
//# sourceMappingURL=physics.component.js.map