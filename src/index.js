'use strict';
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
/** Imports */
require('pixi');
require('p2');
require('phaser');
require("styles/style.styl");
var Constants_1 = require("./constants/Constants");
var boot_state_1 = require("./states/boot.state");
var preload_state_1 = require("./states/preload.state");
var game; // capture game object // todo: Is there a better way?
exports.default = game;
// The main class of our application
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App(config) {
        var _this = _super.call(this, config) || this;
        _this.state.add(Constants_1.States.BOOT_STATE, boot_state_1.BootState);
        _this.state.add(Constants_1.States.PRELOAD_STATE, preload_state_1.PreloadState);
        _this.state.start(Constants_1.States.BOOT_STATE);
        return _this;
    }
    return App;
}(Phaser.Game));
exports.App = App;
// Like python's `__name__ == "__main__"` checks whether the module is part
// of another program or it is executable.
if (!module.parent) {
    window.onload = function () {
        var config = {
            width: 800,
            height: 600,
            renderer: Phaser.AUTO,
            parent: '',
            resolution: 1,
            forceSetTimeOut: false // tell Phaser to use `setTimeOut` even if `requestAnimationFrame` is available.
        };
        game = new App(config); // Initialize the application. It will automatically inject <canvas /> into <body />
    };
}
//# sourceMappingURL=index.js.map