import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";
import { InvalidArgumentError } from "./InvalidArgumentError";

describe("InvalidArgumentError", () => {
  test("nameはInvalidArgumentErrorになる", () => {
    expect(new InvalidArgumentError().name).toBe("InvalidArgumentError");
  });

  test("messageを省略するとデフォルトメッセージになる", () => {
    expect(new InvalidArgumentError().message).toBe("Expected a number or string.");
  });

  test("指定したmessageがそのまま入る", () => {
    expect(new InvalidArgumentError("custom").message).toBe("custom");
  });

  test("ExpandExponentialErrorBaseとErrorを継承している", () => {
    const error = new InvalidArgumentError();
    expect(error).toBeInstanceOf(ExpandExponentialErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
