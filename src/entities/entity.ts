import { Component } from '../component/component';
import { ComponentType, TankLayout } from '../constants/GameConstants';

export class Entity {

  private _components: Map<string, Component> = new Map();
  private _sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number, components?: Array<Component>) {
    if (components) {
        components.forEach((component: Component) => {
          this.addComponent(component);
        });
      debugger;
    }
    this._sprite = game.add.sprite(x, y, TankLayout.TANK_SPRITESHEET);
  }

  private addComponent(component: Component): Component {
    this._components.set(component.name, component);
    this._components.get(component.name).target = this;
    return component;
  }

  public getComponent<T extends Component>(componentName: string): T {
    return this._components.get(componentName) as T;
  }

  public update(): void {
    this._components.forEach((componentType) => {
      this._components.get(componentType.name).update();
    });
  }
  withComponent(components: Array<Component>): this {
    if (components) {
      components.forEach((component: Component) => {
        this.addComponent(component);
      });
      return this;
    }
  }
  get sprite(): Phaser.Sprite {
    return this._sprite;
  }
}
