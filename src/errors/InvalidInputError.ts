import { ExpandExponentialError } from "./ExpandExponentialError";

export class InvalidInputError extends ExpandExponentialError {
  public override readonly name = "InvalidInputError";
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
