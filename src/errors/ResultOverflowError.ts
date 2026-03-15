import { ExpandExponentialError } from "../constants";
import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class ResultOverflowError extends ExpandExponentialErrorBase {
  public override name: ExpandExponentialError = ExpandExponentialError.ResultOverflowError;
  constructor(message = "Result string exceeds maximum string length.") {
    super(message);
  }
}
