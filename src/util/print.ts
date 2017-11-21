export default class Print {
  public static log(...args) {
    let toPrint: string = '';
    args.forEach((s) => {
      toPrint += s + ' ';
    });
    console.log(toPrint);
  }
}
