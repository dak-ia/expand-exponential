import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class InvalidInputError extends ExpandExponentialErrorBase {
  public override readonly name = "InvalidInputError";
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
