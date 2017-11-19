import { Component } from '../component/component';
import { MovableComponent } from '../component/movable.component';

export abstract class Entity {

  protected _components: Array<Component>;

  constructor(){}

  protected addComponent(component: Component): Component {
    this._components[component.name] = component;
    this._components[component.name].target(this);
    return component;
  }
/*
  protected create(){
    this.addComponent();
  }
*/
  protected update(){
    Object.keys(this._components).forEach((componentType) => {
      this._components[componentType.toString()].update();
    });
  }
  get components(): Array<Component> {
    return this._components;
  }

  set components(value: Array<Component>) {
    this._components = value;
  }
}
