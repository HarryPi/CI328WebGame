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
    /**
     * Checks if projectile can hit (x, y) coordinate with initial velocity length under given gravity.
     * @param x
     * @param y
     * @param velocity initial velocity
     * @param gravity gravity value; should be greater than 0
     * @return
     */
    static canHitCoordinate(x, y, velocity, gravity) {
        return MathUtil.calculateDelta(x, y, velocity, gravity) >= 0;
    }
    /**
     * Calculates angle to hit given (x, y) coordinate with given velocity and gravity.
     * @param x
     * @param y
     * @param velocity initial velocity
     * @param gravity gravity value; should be greater than 0
     * @return angle in radians
     */
    static calculateAngle1ToHitCoordinate(x, y, velocity, gravity) {
        if (x === 0) {
            return y > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
        }
        let delta = MathUtil.calculateDelta(x, y, velocity, gravity);
        let sqrtDelta = Math.sqrt(delta);
        return Math.atan((velocity * velocity - sqrtDelta) / (gravity * x));
    }
    /**
     * Calculates angle to hit given (x, y) coordinate with given velocity and gravity.
     * @param x
     * @param y
     * @param velocity initial velocity
     * @param gravity gravity value; should be greater than 0
     * @return angle in radians
     */
    static calculateAngle2ToHitCoordinate(x, y, velocity, gravity) {
        if (x === 0) {
            return -Math.PI * 0.5;
        }
        let delta = MathUtil.calculateDelta(x, y, velocity, gravity);
        let sqrtDelta = Math.sqrt(delta);
        return Math.atan((velocity * velocity + sqrtDelta) / (gravity * x));
    }
    static calculateDelta(x, y, velocity, gravity) {
        return velocity * velocity * velocity * velocity - gravity * (gravity * x * x + 2 * y * velocity * velocity);
    }
}
exports.MathUtil = MathUtil;
//# sourceMappingURL=math.util.js.map