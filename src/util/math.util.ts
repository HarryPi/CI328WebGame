export class MathUtil {

  public static normalize(val, max = 4941, min = -46) {
    return (val - min) / (max - min);
  }
  public static degToRad(degrees: number): number {
    return degrees * Math.PI / 180;
  }
  public static radToDeg(rad: number): number {
    return rad * 180 / Math.PI;
  }
  /**
   * @description
   * Will return a random number between the two values provided including the values
   * @param {number} min - The lowest number to return
   * @param {number} max - The maximum number to return
   * @return {number} randomNum - A number between min and max
   * */
  public static randomIntFromInterval(min: number, max: number): number
  {
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
  public static canHitCoordinate(x: number, y: number, velocity: number, gravity: number): boolean {
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
  public static  calculateAngle1ToHitCoordinate(x: number, y: number, velocity: number, gravity: number): number {
    if (x === 0) {
      return y > 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
    }
    let delta: number = MathUtil.calculateDelta(x, y, velocity, gravity);
    let sqrtDelta: number = Math.sqrt(delta);
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
  public static  calculateAngle2ToHitCoordinate(x: number, y: number, velocity: number, gravity: number): number {
    if (x === 0) { return -Math.PI * 0.5; }
    let delta: number = MathUtil.calculateDelta(x, y, velocity, gravity);
    let sqrtDelta: number = Math.sqrt(delta);
    return Math.atan((velocity * velocity + sqrtDelta) / (gravity * x));
  }

  private static  calculateDelta(x: number, y: number, velocity: number, gravity: number): number {
    return velocity * velocity * velocity * velocity - gravity * (gravity * x * x + 2 * y * velocity * velocity);
  }
}
