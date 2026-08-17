import { ExpandExponentialError } from "./ExpandExponentialError";

describe("ExpandExponentialError", () => {
  test("nameはExpandExponentialErrorになる", () => {
    expect(new ExpandExponentialError("boom").name).toBe("ExpandExponentialError");
  });

  test("指定したmessageがそのまま入る", () => {
    expect(new ExpandExponentialError("boom").message).toBe("boom");
  });

  test("Errorを継承している", () => {
    const error = new ExpandExponentialError("boom");
    expect(error).toBeInstanceOf(ExpandExponentialError);
    expect(error).toBeInstanceOf(Error);
  });
});
