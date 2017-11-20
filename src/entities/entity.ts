import { Component } from '../component/component';
import { TankLayout } from '../constants/GameConstants';

export class Entity {

  private _components: Array<Component> = [];
  private _sprite: Phaser.Sprite;

  constructor(game: Phaser.Game, x: number, y: number, components?: Array<Component>) {
    debugger;
    if (components) {
        components.forEach((component: Component) => {
          this.addComponent(component);
        });
      debugger;
      this._sprite = game.add.sprite(x, y, TankLayout.TANK_SPRITESHEET, TankLayout.CANDY_HUNTER);
    }
  }

  private addComponent(component: Component): Component {
    debugger;
    this._components[component.name] = component;
    this._components[component.name].target = this;
    return component;
  }

  public getComponent(componentName: string): Component {
    return this._components[componentName];
  }

  public update() {
    this._components.forEach((componentType) => {
      this._components[componentType.name].update();
    });
  }
  withComponent(components: Array<Component>): this {
    debugger;
    if (components) {
      components.forEach((component: Component) => {
        this.addComponent(component);
      });
      return this;
    }
  }
  get sprite() {
    return this._sprite;
  }
}
