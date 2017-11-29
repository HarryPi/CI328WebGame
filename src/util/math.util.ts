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
}
