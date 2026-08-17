import { ExpandExponentialError } from "./ExpandExponentialError";

export class ResultOverflowError extends ExpandExponentialError {
  public override readonly name = "ResultOverflowError";
  constructor(message = "Result string exceeds maximum string length.") {
    super(message);
  }
}
