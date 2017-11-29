"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil {
    static normalize(val, max = 4941, min = -46) {
        return (val - min) / (max - min);
    }
    static degToRad(degrees) {
        return degrees * Math.PI / 180;
    }
    static radToDeg(rad) {
        return rad * 180 / Math.PI;
    }
    /**
     * @description
     * Will return a random number between the two values provided including the values
     * @param {number} min - The lowest number to return
     * @param {number} max - The maximum number to return
     * @return {number} randomNum - A number between min and max
     * */
    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
exports.MathUtil = MathUtil;
//# sourceMappingURL=math.util.js.map