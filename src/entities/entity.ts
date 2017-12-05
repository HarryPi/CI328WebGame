import { Component } from '../component/component';
import { ComponentType, FSMStates, TankLayout } from '../constants/GameConstants';
import { Notification } from 'rxjs/Notification';
import { Subject } from 'rxjs/Subject';

/**
 * @class Entity
 * @description
 * Represents any object that can be added to the game world
 * Exposes functions to load components in order to modify the actions and the abilities of the entity see {@link Entity#addComponent}
 * Exposes a function to retrieve any component that is loaded to an entity see {@link  Entity#getComponent}
 * */
export class Entity {
  private _components: Map<string, Component> = new Map();
  private _sprite: Phaser.Sprite;
  private _whenDestroyed: Subject<void> = new Subject();

  constructor(game: Phaser.Game, x: number, y: number, components?: Array<Component>) {
    if (components) {
        components.forEach((component: Component) => {
          this.addComponent(component);
        });
    }
    this._sprite = game.add.sprite(x, y, TankLayout.TANK_SPRITESHEET);
    this._components.forEach((comp: Component) => {
      comp.validateComponentRequirments();
    });

  }


  private addComponent(component: Component): Component {
    this._components.set(component.name, component);
    this._components.get(component.name).target = this;
    return component;
  }

  /**
   * Retrieves a component by Component type see {@Link ComponentType}
   * and casts it to any parameter that extends Component see {@Link Component}
   * @param {string} componentName
   * @return {Component} component
   * */
  public getComponent<T extends Component>(componentName: string): T {
    return this._components.get(componentName) as T;
  }

  public update(): void {
    this._components.forEach((componentType) => {
      this._components.get(componentType.name).update();
    });
  }
  /**
   * Loads an array of components {@Link Component} to an entity
   * and then returns the entity
   * @param {Array<Component>} components
   * @return {Entity} this
   * */
  withComponent(components: Array<Component>): this {
    if (components) {
      components.forEach((component: Component) => {
        this.addComponent(component);
      });
      return this;
    }
  }
  public destroy(): void {
    try {
      this._components.clear();
      this._sprite.destroy();
      this._whenDestroyed.next();
    } catch (e) {
      this._whenDestroyed.error(e);
    }
  }
  public get whenDestroyed(): Subject<void> {
    return this._whenDestroyed;
  }
  get sprite(): Phaser.Sprite {
    return this._sprite;
  }
}
