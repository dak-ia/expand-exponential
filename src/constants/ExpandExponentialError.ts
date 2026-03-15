export const ExpandExponentialError = {
  ExpandExponentialError: "ExpandExponentialError",
  InvalidArgumentError: "InvalidArgumentError",
  InvalidInputError: "InvalidInputError",
  ResultOverflowError: "ResultOverflowError",
} as const;

export type ExpandExponentialError = (typeof ExpandExponentialError)[keyof typeof ExpandExponentialError];
