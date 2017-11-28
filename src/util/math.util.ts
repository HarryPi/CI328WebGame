export class MathUtil {
  public static normalize(val, max = 4941, min = -46) {
    return (val - min) / (max - min);
  }
}
