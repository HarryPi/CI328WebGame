import { Entity } from './entities/entity';

export default class World extends Phaser.World {
  private _player: Entity;

  constructor(game: Phaser.Game){
    super(game);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1400;
  }

  get player(): Entity {
    return this._player;
  }

}
