"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MathUtil {
    static normalize(val, max = 4941, min = -46) {
        return (val - min) / (max - min);
    }
}
exports.MathUtil = MathUtil;
//# sourceMappingURL=math.util.js.map