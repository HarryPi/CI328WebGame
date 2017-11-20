"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
    The Screen[...] classes are modified versions of the classes in an article I found.
    Author: Tomáš Rychnovský
    Article: http://sbcgamesdev.blogspot.ca/2015/04/phaser-tutorial-manage-different-screen.html
    Date: Thursday, April 9, 2015
    Big thanks to Tomáš!

 */
var ScreenOrientation;
(function (ScreenOrientation) {
    ScreenOrientation[ScreenOrientation["PORTRAIT"] = 0] = "PORTRAIT";
    ScreenOrientation[ScreenOrientation["LANDSCAPE"] = 1] = "LANDSCAPE";
})(ScreenOrientation = exports.ScreenOrientation || (exports.ScreenOrientation = {}));
var ScreenMetrics = /** @class */ (function () {
    function ScreenMetrics() {
    }
    return ScreenMetrics;
}());
exports.ScreenMetrics = ScreenMetrics;
var ScreenUtils = /** @class */ (function () {
    function ScreenUtils() {
    }
    ScreenUtils.calculateScreenMetrics = function (defaultWidth, defaultHeight, orientation, maxGameWidth, maxGameHeight) {
        if (orientation === void 0) { orientation = ScreenOrientation.LANDSCAPE; }
        // Just to give some explanation as to the numbers and colors in the included background;
        // The GREEN is the safe area and will be displayed fully on any device and is based on 16:10 aspect ratio, build your actual gameplay here
        // The YELLOW is the extra area that will be visible on devices with a 3:2 aspect ratio (iPhone 4S and below)
        // The BLUE is the extra area that will be visible on devices with a 4:3 aspect ratio (iPads)
        // The RED is the extra area that will be visible on devices with a 16:9 aspect ratio (iPhone 5 and above) (this is probably the most common ratio overall...)
        // The GREY area will most likely never be seen, unless some device has a really odd aspect ratio (and with Android, I wouldn't be surprised if there is a few out there)
        this.screenMetrics = new ScreenMetrics();
        this.screenMetrics.windowWidth = window.innerWidth;
        this.screenMetrics.windowHeight = window.innerHeight;
        this.screenMetrics.defaultGameWidth = defaultWidth;
        this.screenMetrics.defaultGameHeight = defaultHeight;
        // Swap width and height if necessary to match the specified orientation
        var dimensionsOppositeForLandscape = ((this.screenMetrics.windowWidth < this.screenMetrics.windowHeight) && orientation === ScreenOrientation.LANDSCAPE);
        var dimensionsOppositeForPortrait = ((this.screenMetrics.windowHeight < this.screenMetrics.windowWidth) && orientation === ScreenOrientation.PORTRAIT);
        if (dimensionsOppositeForLandscape || dimensionsOppositeForPortrait) {
            _a = [this.screenMetrics.windowHeight, this.screenMetrics.windowWidth], this.screenMetrics.windowWidth = _a[0], this.screenMetrics.windowHeight = _a[1];
        }
        // Calculate the max width and max height if not provided; ratios are based off iPad (4:3) and iPhone 5+ (16:9) as the extremes in both width and height
        if (!maxGameWidth || !maxGameHeight) {
            if (orientation === ScreenOrientation.LANDSCAPE) {
                this.screenMetrics.maxGameWidth = Math.round(this.screenMetrics.defaultGameWidth * (exports.MAX_GAME_WIDTH / exports.DEFAULT_GAME_WIDTH));
                this.screenMetrics.maxGameHeight = Math.round(this.screenMetrics.defaultGameHeight * (exports.MAX_GAME_HEIGHT / exports.DEFAULT_GAME_HEIGHT));
            }
            else {
                this.screenMetrics.maxGameWidth = Math.round(this.screenMetrics.defaultGameWidth * (exports.MAX_GAME_HEIGHT / exports.DEFAULT_GAME_HEIGHT));
                this.screenMetrics.maxGameHeight = Math.round(this.screenMetrics.defaultGameHeight * (exports.MAX_GAME_WIDTH / exports.DEFAULT_GAME_WIDTH));
            }
        }
        else {
            this.screenMetrics.maxGameWidth = maxGameWidth;
            this.screenMetrics.maxGameHeight = maxGameHeight;
        }
        var defaultAspectRatio = ((orientation === ScreenOrientation.LANDSCAPE) ? (exports.DEFAULT_GAME_WIDTH / exports.DEFAULT_GAME_HEIGHT) : (exports.DEFAULT_GAME_HEIGHT / exports.DEFAULT_GAME_WIDTH));
        var windowAspectRatio = (this.screenMetrics.windowWidth / this.screenMetrics.windowHeight);
        if (windowAspectRatio > defaultAspectRatio) {
            this.screenMetrics.gameHeight = this.screenMetrics.defaultGameHeight;
            this.screenMetrics.gameWidth = (Math.ceil((this.screenMetrics.gameHeight * windowAspectRatio) * 0.5) * 2);
            this.screenMetrics.gameWidth = Math.min(this.screenMetrics.gameWidth, this.screenMetrics.maxGameWidth);
            this.screenMetrics.offsetX = ((this.screenMetrics.gameWidth - this.screenMetrics.defaultGameWidth) * 0.5);
            this.screenMetrics.offsetY = 0;
        }
        else {
            this.screenMetrics.gameWidth = this.screenMetrics.defaultGameWidth;
            this.screenMetrics.gameHeight = (Math.ceil((this.screenMetrics.gameWidth / windowAspectRatio) * 0.5) * 2);
            this.screenMetrics.gameHeight = Math.min(this.screenMetrics.gameHeight, this.screenMetrics.maxGameHeight);
            this.screenMetrics.offsetX = 0;
            this.screenMetrics.offsetY = ((this.screenMetrics.gameHeight - this.screenMetrics.defaultGameHeight) * 0.5);
        }
        // Calculate scaling
        this.screenMetrics.scaleX = (this.screenMetrics.windowWidth / this.screenMetrics.gameWidth);
        this.screenMetrics.scaleY = (this.screenMetrics.windowHeight / this.screenMetrics.gameHeight);
        return this.screenMetrics;
        var _a;
    };
    return ScreenUtils;
}());
exports.ScreenUtils = ScreenUtils;
//# sourceMappingURL=ScreenMetrics.js.map