"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Print {
    static log(...args) {
        let toPrint = '';
        args.forEach((s) => {
            toPrint += s + ' ';
        });
        console.log(toPrint);
    }
}
exports.default = Print;
//# sourceMappingURL=print.js.map