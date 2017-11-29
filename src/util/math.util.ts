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
}
