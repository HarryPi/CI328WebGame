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
// Get URL to images
var level1 = require('assets/levels/level1.json');
var PreloadState = /** @class */ (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super.call(this) || this;
    }
    PreloadState.prototype.preload = function () {
        var logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        var progressBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY + 128, 'progressBar');
        logo.anchor.setTo(0.5);
        progressBar.anchor.setTo(0.5);
        this.load.setPreloadSprite(progressBar);
    };
    PreloadState.prototype.create = function () {
    };
    PreloadState.prototype.update = function () {
    };
    return PreloadState;
}(state_1.default));
exports.PreloadState = PreloadState;
//# sourceMappingURL=preload.state.js.map