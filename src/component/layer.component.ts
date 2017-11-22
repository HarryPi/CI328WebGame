import {Component} from './component';
import {ComponentType} from '../constants/GameConstants';

export class LayerComponent extends Component {
  constructor() {
    super(ComponentType.LAYER);
  }

  addLayer(cachedName: string) {
    if (cachedName) {
      this.target.sprite.frameName = cachedName;
    }
  }
}

