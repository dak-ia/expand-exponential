import { ExpandExponentialError } from "../constants";

export class ExpandExponentialErrorBase extends Error {
  public override name: ExpandExponentialError = ExpandExponentialError.ExpandExponentialError;
  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
