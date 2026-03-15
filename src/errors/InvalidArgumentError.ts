import { ExpandExponentialError } from "../constants";
import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class InvalidArgumentError extends ExpandExponentialErrorBase {
  public override name: ExpandExponentialError = ExpandExponentialError.InvalidArgumentError;
  constructor(message = "Expected a number or string.") {
    super(message);
  }
}
