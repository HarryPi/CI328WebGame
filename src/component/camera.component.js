"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GameConstants_1 = require("../constants/GameConstants");
const component_1 = require("./component");
class CameraComponent extends component_1.Component {
    constructor(game) {
        super(GameConstants_1.ComponentType.CAMERA);
        this._game = game;
    }
    setFocus(entity) {
        this._game.camera.focusOn(entity);
    }
}
exports.CameraComponent = CameraComponent;
//# sourceMappingURL=camera.component.js.map