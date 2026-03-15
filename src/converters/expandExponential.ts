import { InvalidArgumentError, InvalidInputError, ResultOverflowError } from "../errors";

/**
 * Expands exponential notation to a full decimal string.
 * Examples:
 * - "1.23e5" → "123000"
 * - "1.23e-2" → "0.0123"
 * - "-1.5e4" → "-15000"
 * @param number - The number or string to expand (e.g., 1.23e5, "1.23e5")
 * @returns Expanded decimal string without exponential notation
 * @throws {InvalidArgumentError} If null, undefined, or not a number/string
 * @throws {InvalidInputError} If NaN, Infinity, or invalid exponential notation
 * @throws {ResultOverflowError} If the result string exceeds maximum string length
 */
export function expandExponential(number: string | number): string {
  // null / undefined / 引数なし
  if (number === null || number === undefined) {
    throw new InvalidArgumentError();
  }

  // number型の特殊値チェック
  if (typeof number === "number") {
    if (Number.isNaN(number)) {
      throw new InvalidInputError("NaN is not a valid number.");
    }
    if (!Number.isFinite(number)) {
      throw new InvalidInputError("Infinity is not a valid number.");
    }
  }

  const normalizedInput = typeof number === "number" ? number.toString() : number;

  // 空文字チェック
  if (normalizedInput === "") {
    throw new InvalidArgumentError();
  }

  // string型の NaN / Infinity チェック
  if (/^[+-]?(Infinity|NaN)$/i.test(normalizedInput)) {
    throw new InvalidInputError("NaN and Infinity are not valid numbers.");
  }

  // 指数表記でなければそのまま返す
  if (!/[eE]/.test(normalizedInput)) {
    // 数値として妥当かチェック
    if (!/^[+-]?([0-9]+\.?[0-9]*|[0-9]*\.[0-9]+)$/.test(normalizedInput)) {
      throw new InvalidInputError();
    }
    return normalizedInput;
  }

  const isNegative = normalizedInput.startsWith("-");
  const absNumber = isNegative ? normalizedInput.slice(1) : normalizedInput.replace(/^\+/, "");

  const match = absNumber.match(/^([0-9]+\.?[0-9]*|[0-9]*\.[0-9]+)[eE]([+-]?[0-9]+)$/);
  if (!match) {
    throw new InvalidInputError("Expected a valid exponential notation.");
  }

  const mantissa = match[1];
  const exponent = Number(match[2]);

  const decimalPos = mantissa.indexOf(".");
  const hasDecimal = decimalPos !== -1;

  const digits = mantissa.replace(".", "");

  const originalDecimalPos = hasDecimal ? decimalPos : digits.length;

  const newDecimalPos = originalDecimalPos + exponent;

  let result: string;
  try {
    if (newDecimalPos <= 0) {
      result = "0." + "0".repeat(-newDecimalPos) + digits;
    } else if (newDecimalPos >= digits.length) {
      const integerPart = (digits + "0".repeat(newDecimalPos - digits.length)).replace(/^0+/, "") || "0";
      result = integerPart;
    } else {
      const integerPart = digits.slice(0, newDecimalPos).replace(/^0+/, "") || "0";
      result = integerPart + "." + digits.slice(newDecimalPos);
    }

    return (isNegative ? "-" : "") + result;
  } catch (error) {
    if (error instanceof RangeError) {
      throw new ResultOverflowError();
    }
    /* istanbul ignore next */
    throw error;
  }
}
