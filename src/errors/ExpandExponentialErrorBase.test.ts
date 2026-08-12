import { ExpandExponentialErrorBase } from "./ExpandExponentialErrorBase";

describe("ExpandExponentialErrorBase", () => {
  test("nameはクラス名ではなくExpandExponentialErrorになる", () => {
    expect(new ExpandExponentialErrorBase("boom").name).toBe("ExpandExponentialError");
  });

  test("指定したmessageがそのまま入る", () => {
    expect(new ExpandExponentialErrorBase("boom").message).toBe("boom");
  });

  test("Errorを継承している", () => {
    const error = new ExpandExponentialErrorBase("boom");
    expect(error).toBeInstanceOf(ExpandExponentialErrorBase);
    expect(error).toBeInstanceOf(Error);
  });
});
