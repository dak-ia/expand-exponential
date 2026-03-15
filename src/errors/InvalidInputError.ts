import { ExpandExponentialError } from "../constants";
import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

export class InvalidInputError extends ExpandExponentialErrorBase {
  public override name: ExpandExponentialError = ExpandExponentialError.InvalidInputError;
  constructor(message = "Expected a valid number format.") {
    super(message);
  }
}
