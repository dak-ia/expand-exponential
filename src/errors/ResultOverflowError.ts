import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class ResultOverflowError extends ExpandExponentialErrorBase {
  public override readonly name = "ResultOverflowError";
  constructor(message = "Result string exceeds maximum string length.") {
    super(message);
  }
}
