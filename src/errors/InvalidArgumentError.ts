import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class InvalidArgumentError extends ExpandExponentialErrorBase {
  public override readonly name = "InvalidArgumentError";
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
