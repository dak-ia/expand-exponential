import { ExpandExponentialError } from "./ExpandExponentialError";
import { InvalidInputError } from "./InvalidInputError";

describe("InvalidInputError", () => {
  test("nameはInvalidInputErrorになる", () => {
    expect(new InvalidInputError().name).toBe("InvalidInputError");
  });

  test("messageを省略するとデフォルトメッセージになる", () => {
    expect(new InvalidInputError().message).toBe("Expected a valid number format.");
  });

  test("指定したmessageがそのまま入る", () => {
    expect(new InvalidInputError("custom").message).toBe("custom");
  });

  test("ExpandExponentialErrorとErrorを継承している", () => {
    const error = new InvalidInputError();
    expect(error).toBeInstanceOf(ExpandExponentialError);
    expect(error).toBeInstanceOf(Error);
  });
});
