import { ExpandExponentialError } from "./ExpandExponentialError";

export class InvalidArgumentError extends ExpandExponentialError {
  public override readonly name = "InvalidArgumentError";
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
