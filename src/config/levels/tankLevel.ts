import {Entity} from '../../Entities/entity';

export default abstract class TankLevel {
  private enemies: Phaser.Group;

  public abstract init(): void;
  public abstract destroy(): void;

  protected spawnEnemy(): Entity {
    return null;
  }
}
