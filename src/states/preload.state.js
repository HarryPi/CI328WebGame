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
var Assets_1 = require("../util/Assets");
var PreloadState = /** @class */ (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        var _this = _super.call(this) || this;
        console.log(_this.load);
        return _this;
    }
    PreloadState.prototype.preload = function () {
        Assets_1.default.setLoadingScreen(this);
        // Reminder to me: When loading phaser assets, it must be done on a state prior to the state of usage!
        Assets_1.default.loadAll();
    };
    PreloadState.prototype.create = function () {
        // todo: Set main menu instead of level one
    };
    PreloadState.prototype.update = function () {
    };
    return PreloadState;
}(state_1.default));
exports.PreloadState = PreloadState;
//# sourceMappingURL=preload.state.js.map