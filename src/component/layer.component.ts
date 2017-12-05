import { Component } from './component';
import { ComponentType } from '../constants/GameConstants';

export class LayerComponent extends Component {
  constructor() {
    super(ComponentType.LAYER);
  }

  addLayer(cachedName: string) {
    if (cachedName) {
      this.target.sprite.frameName = cachedName;
    }
  }
  public addAnimation(name: string, frames?: number[] | string[], frameRate?: number, loop?: boolean, useNumericIndex?: boolean ) {
    this.target.sprite.animations.add(name, frames, frameRate, loop, useNumericIndex);
  }
  public getAnimation(name: string): Phaser.Animation {
    return this.target.sprite.animations.getAnimation(name);
  }
  public playAnimation(name: string, frameRate?: number, loop?: boolean, killOnComplete?: boolean): Promise<void> {
    return new Promise(((resolve, reject) => {
      this.target.sprite.animations.play(name, frameRate, loop).onComplete.add( () => {
        resolve();
      });
    }));
  }
}

