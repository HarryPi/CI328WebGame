import game from './index';
import {Entity} from './Entities/entity';
import TankLevel from './config/levels/tankLevel';

export default class World extends Phaser.World {
  private _player: Entity;

  get player(): Entity {
    return this._player;
  }

  constructor(level: TankLevel){
    super(game);
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 1400;
  }
}
