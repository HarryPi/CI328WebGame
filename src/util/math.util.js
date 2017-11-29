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
}
exports.MathUtil = MathUtil;
//# sourceMappingURL=math.util.js.map