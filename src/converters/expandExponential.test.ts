import { ExpandExponentialErrorBase, InvalidArgumentError, InvalidInputError, ResultOverflowError } from "../errors";
import { expandExponential } from "./expandExponential";

describe("expandExponential", () => {
  describe("正の指数（string入力）", () => {
    test("基本的な正の指数", () => {
      expect(expandExponential("1.23e5")).toBe("123000");
      expect(expandExponential("5e3")).toBe("5000");
      expect(expandExponential("1e0")).toBe("1");
      expect(expandExponential("9.87654e6")).toBe("9876540");
      expect(expandExponential("1e20")).toBe("100000000000000000000");
    });

    test("大文字E", () => {
      expect(expandExponential("2.5E10")).toBe("25000000000");
      expect(expandExponential("1.5E3")).toBe("1500");
    });

    test("明示的な+記号", () => {
      expect(expandExponential("1.23e+5")).toBe("123000");
      expect(expandExponential("+1.23e5")).toBe("123000");
      expect(expandExponential("+5e3")).toBe("5000");
    });

    test("仮数部が0始まり", () => {
      expect(expandExponential("0.1e3")).toBe("100");
      expect(expandExponential("0.123e3")).toBe("123");
      expect(expandExponential("0.05e4")).toBe("500");
      expect(expandExponential("0.001e5")).toBe("100");
      expect(expandExponential("0.00456e3")).toBe("4.56");
    });

    test("仮数部が複数桁の整数", () => {
      expect(expandExponential("12.34e3")).toBe("12340");
      expect(expandExponential("123.45e2")).toBe("12345");
      expect(expandExponential("12e5")).toBe("1200000");
      expect(expandExponential("100.5e3")).toBe("100500");
      expect(expandExponential("99.99e4")).toBe("999900");
    });

    test("小数点が結果の途中に来る", () => {
      expect(expandExponential("1.23e1")).toBe("12.3");
      expect(expandExponential("12.34e1")).toBe("123.4");
      expect(expandExponential("9.876e2")).toBe("987.6");
      expect(expandExponential("1.0e5")).toBe("100000");
    });
  });

  describe("負の指数（string入力）", () => {
    test("基本的な負の指数", () => {
      expect(expandExponential("1.23e-2")).toBe("0.0123");
      expect(expandExponential("5e-3")).toBe("0.005");
      expect(expandExponential("1.5e-1")).toBe("0.15");
      expect(expandExponential("3.14159e-5")).toBe("0.0000314159");
      expect(expandExponential("1.5E-2")).toBe("0.015");
    });

    test("仮数部が複数桁で負の指数", () => {
      expect(expandExponential("12.34e-1")).toBe("1.234");
      expect(expandExponential("123.456e-2")).toBe("1.23456");
      expect(expandExponential("12e-1")).toBe("1.2");
      expect(expandExponential("100.5e-2")).toBe("1.005");
      expect(expandExponential("123.45e-1")).toBe("12.345");
      expect(expandExponential("456.789e-2")).toBe("4.56789");
    });

    test("指数0でゼロが展開される", () => {
      expect(expandExponential("0.000e1")).toBe("0.00");
      expect(expandExponential("0e5")).toBe("0");
      expect(expandExponential("0.0e3")).toBe("0");
      expect(expandExponential("0.00e2")).toBe("0");
    });
  });

  describe("負の数", () => {
    test("負の数 × 正の指数", () => {
      expect(expandExponential("-1.5e4")).toBe("-15000");
      expect(expandExponential("-1e10")).toBe("-10000000000");
      expect(expandExponential("-0.5e2")).toBe("-50");
      expect(expandExponential("-0.123e4")).toBe("-1230");
      expect(expandExponential("-12.34e3")).toBe("-12340");
    });

    test("負の数 × 負の指数", () => {
      expect(expandExponential("-2.5e-3")).toBe("-0.0025");
      expect(expandExponential("-12.34e-1")).toBe("-1.234");
      expect(expandExponential("-1.23e1")).toBe("-12.3");
    });
  });

  describe("number型入力", () => {
    test("通常の数値", () => {
      expect(expandExponential(123)).toBe("123");
      expect(expandExponential(123.456)).toBe("123.456");
      expect(expandExponential(-999)).toBe("-999");
      expect(expandExponential(0)).toBe("0");
      expect(expandExponential(-0)).toBe("0");
    });

    test("number型の指数表記", () => {
      expect(expandExponential(1e5)).toBe("100000");
      expect(expandExponential(1.23e-2)).toBe("0.0123");
      expect(expandExponential(1e20)).toBe("100000000000000000000");
      expect(expandExponential(-1.5e4)).toBe("-15000");
      expect(expandExponential(5e-7)).toBe("0.0000005");
    });

    test("JSが自動的に指数表記にする大きな数", () => {
      expect(expandExponential(1e21)).toBe("1000000000000000000000");
      expect(expandExponential(1.5e21)).toBe("1500000000000000000000");
      expect(expandExponential(Number.MAX_SAFE_INTEGER)).toBe("9007199254740991");
    });

    test("JSが自動的に指数表記にする小さな数", () => {
      expect(expandExponential(1e-7)).toBe("0.0000001");
      expect(expandExponential(1.23e-10)).toBe("0.000000000123");
    });
  });

  describe("指数表記でない入力", () => {
    test("整数", () => {
      expect(expandExponential("123")).toBe("123");
      expect(expandExponential("0")).toBe("0");
      expect(expandExponential("-456")).toBe("-456");
    });

    test("小数", () => {
      expect(expandExponential("123.456")).toBe("123.456");
      expect(expandExponential("-123.456")).toBe("-123.456");
      expect(expandExponential("0.00123")).toBe("0.00123");
    });
  });

  describe("InvalidArgumentError", () => {
    test("null / undefined / 空文字 / 引数なし", () => {
      // @ts-expect-error - Testing invalid input
      expect(() => expandExponential(null)).toThrow(InvalidArgumentError);
      // @ts-expect-error - Testing invalid input
      expect(() => expandExponential(undefined)).toThrow(InvalidArgumentError);
      expect(() => expandExponential("")).toThrow(InvalidArgumentError);
      // @ts-expect-error - Testing invalid input
      expect(() => expandExponential()).toThrow(InvalidArgumentError);
    });
  });

  describe("InvalidInputError - NaN / Infinity", () => {
    test("number型のNaN / Infinity", () => {
      expect(() => expandExponential(NaN)).toThrow(InvalidInputError);
      expect(() => expandExponential(Infinity)).toThrow(InvalidInputError);
      expect(() => expandExponential(-Infinity)).toThrow(InvalidInputError);
    });

    test("string型のNaN / Infinity", () => {
      expect(() => expandExponential("NaN")).toThrow(InvalidInputError);
      expect(() => expandExponential("Infinity")).toThrow(InvalidInputError);
      expect(() => expandExponential("-Infinity")).toThrow(InvalidInputError);
      expect(() => expandExponential("+Infinity")).toThrow(InvalidInputError);
    });

    test("大文字小文字混在", () => {
      expect(() => expandExponential("nan")).toThrow(InvalidInputError);
      expect(() => expandExponential("NAN")).toThrow(InvalidInputError);
      expect(() => expandExponential("infinity")).toThrow(InvalidInputError);
      expect(() => expandExponential("INFINITY")).toThrow(InvalidInputError);
    });

    test("指数部にNaN/Infinityを含む", () => {
      expect(() => expandExponential("1e+Infinity")).toThrow(InvalidInputError);
      expect(() => expandExponential("1eNaN")).toThrow(InvalidInputError);
    });

    test("number型でInfinityになる巨大数", () => {
      // eslint-disable-next-line no-loss-of-precision
      expect(() => expandExponential(1e309)).toThrow(InvalidInputError);
      // eslint-disable-next-line no-loss-of-precision
      expect(() => expandExponential(-1e309)).toThrow(InvalidInputError);
    });
  });

  describe("InvalidInputError - 不正な指数表記", () => {
    test("仮数部が不正", () => {
      expect(() => expandExponential("e5")).toThrow(InvalidInputError);
      expect(() => expandExponential(".e5")).toThrow(InvalidInputError);
      expect(() => expandExponential("...e5")).toThrow(InvalidInputError);
      expect(() => expandExponential("1.2.3e5")).toThrow(InvalidInputError);
    });

    test("指数部が不正", () => {
      expect(() => expandExponential("1.23ee5")).toThrow(InvalidInputError);
      expect(() => expandExponential("1.23e+")).toThrow(InvalidInputError);
      expect(() => expandExponential("1.23e-")).toThrow(InvalidInputError);
    });

    test("数値でない文字列", () => {
      expect(() => expandExponential("abc")).toThrow(InvalidInputError);
      expect(() => expandExponential("1.23eabc")).toThrow(InvalidInputError);
      expect(() => expandExponential("hello")).toThrow(InvalidInputError);
    });
  });

  describe("ResultOverflowError - 結果文字列の最大長超過", () => {
    test("指数が巨大すぎてstring最大長を超える", () => {
      expect(() => expandExponential("1e999999999")).toThrow(ResultOverflowError);
      expect(() => expandExponential("1e-999999999")).toThrow(ResultOverflowError);
    });
  });

  describe("エラー階層", () => {
    test("すべてのエラーがExpandExponentialErrorBaseを継承している", () => {
      expect(() => expandExponential("abc")).toThrow(ExpandExponentialErrorBase);
      // @ts-expect-error - Testing invalid input
      expect(() => expandExponential(null)).toThrow(ExpandExponentialErrorBase);
      expect(() => expandExponential("1e999999999")).toThrow(ExpandExponentialErrorBase);
    });
  });
});
