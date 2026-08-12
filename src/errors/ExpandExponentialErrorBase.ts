export class ExpandExponentialErrorBase extends Error {
  public override readonly name: string = "ExpandExponentialError";
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
