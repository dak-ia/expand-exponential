import {
  ExpandExponentialError,
  InvalidArgumentError,
  InvalidInputError,
  ResultOverflowError,
  expandExponential,
} from "./index";

describe("index", () => {
  test("expandExponentialをexportしている", () => {
    expect(typeof expandExponential).toBe("function");
    expect(expandExponential("1.23e5")).toBe("123000");
  });

  test("エラークラスをexportしている", () => {
    expect(ExpandExponentialError).toBeDefined();
    expect(new InvalidArgumentError()).toBeInstanceOf(ExpandExponentialError);
    expect(new InvalidInputError()).toBeInstanceOf(ExpandExponentialError);
    expect(new ResultOverflowError()).toBeInstanceOf(ExpandExponentialError);
  });
});
