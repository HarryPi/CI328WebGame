export interface IStateMessanger {
  message: string;
}
export class Extras implements IStateMessanger {
  message: string;
  constructor(m: string) {
    this.message = m;
  }
}
