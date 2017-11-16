"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var state_1 = require("./state");
var Constants_1 = require("../constants/Constants");
var Assets_1 = require("../util/Assets");
var BootState = /** @class */ (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super.call(this) || this;
    }
    BootState.prototype.preload = function () {
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignVertically = true;
        this.scale.pageAlignHorizontally = true;
        this.load.image('logo', Assets_1.default.getLogo());
        this.load.image('progressBar', Assets_1.default.getProgressBar());
    };
    BootState.prototype.create = function () {
        this.game.stage.backgroundColor = '#000';
        this.game.state.start(Constants_1.States.PRELOAD_STATE);
    };
    return BootState;
}(state_1.default));
exports.BootState = BootState;
//# sourceMappingURL=boot.state.js.map