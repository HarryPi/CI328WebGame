"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class World extends Phaser.World {
    constructor(game) {
        super(game);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 1400;
    }
    get player() {
        return this._player;
    }
}
exports.default = World;
//# sourceMappingURL=world.js.map