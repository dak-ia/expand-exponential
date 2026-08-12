import {
  ExpandExponentialErrorBase,
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
    expect(ExpandExponentialErrorBase).toBeDefined();
    expect(new InvalidArgumentError()).toBeInstanceOf(ExpandExponentialErrorBase);
    expect(new InvalidInputError()).toBeInstanceOf(ExpandExponentialErrorBase);
    expect(new ResultOverflowError()).toBeInstanceOf(ExpandExponentialErrorBase);
  });
});
