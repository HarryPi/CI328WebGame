"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants_1 = require("../constants/Constants");
var Assets = /** @class */ (function () {
    function Assets() {
        this.LOGO = require('assets/images/logo.png');
        this.PROGRESS_BAR = require('assets/images/progressBar.png');
        this.LEVEL_ONE = require('assets/images/progressBar.png');
    }
    Assets.prototype.getLogo = function () {
        return this.LOGO;
    };
    Assets.prototype.getProgressBar = function () {
        return this.PROGRESS_BAR;
    };
    Assets.prototype.getLevel = function (level) {
        switch (level) {
            case Constants_1.Levels.LEVEL_ONE:
                return this.LEVEL_ONE;
            default:
                break;
        }
    };
    return Assets;
}());
// noinspection TsLint
var GameAssets = new Assets();
exports.default = GameAssets;
//# sourceMappingURL=Assets.js.map