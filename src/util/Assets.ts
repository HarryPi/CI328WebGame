import { Levels } from '../constants/Constants';

class Assets {
  private readonly LOGO = require('assets/images/logo.png');
  private readonly PROGRESS_BAR = require('assets/images/progressBar.png');
  private readonly LEVEL_ONE = require('assets/images/progressBar.png');

  getLogo(): string {
    return this.LOGO;
  }

  getProgressBar(): string {
    return this.PROGRESS_BAR;
  }

  getLevel(level: Levels): string {
    switch (level) {
      case Levels.LEVEL_ONE:
        return this.LEVEL_ONE;
      default:
        break;
    }
  }
}

// noinspection TsLint
const GameAssets = new Assets();
export default GameAssets;
