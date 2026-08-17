import { ExpandExponentialError } from "./ExpandExponentialError";
import { ResultOverflowError } from "./ResultOverflowError";

describe("ResultOverflowError", () => {
  test("nameはResultOverflowErrorになる", () => {
    expect(new ResultOverflowError().name).toBe("ResultOverflowError");
  });

  test("messageを省略するとデフォルトメッセージになる", () => {
    expect(new ResultOverflowError().message).toBe("Result string exceeds maximum string length.");
  });

  test("指定したmessageがそのまま入る", () => {
    expect(new ResultOverflowError("custom").message).toBe("custom");
  });

  test("ExpandExponentialErrorとErrorを継承している", () => {
    const error = new ResultOverflowError();
    expect(error).toBeInstanceOf(ExpandExponentialError);
    expect(error).toBeInstanceOf(Error);
  });
});
