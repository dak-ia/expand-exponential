# expand-exponential

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![Coverage](https://img.shields.io/badge/dynamic/json?url=https://gist.githubusercontent.com/dak-ia/ffbc073b427f8115e093429b5730e98b/raw/expand-exponential-coverage.json&label=coverage&query=$.coverage&suffix=%25&color=brightgreen)](https://github.com/dak-ia/expand-exponential/actions/workflows/jest-check.yml)

指数表記（例: `1e+20`, `1.23e-5`）を通常の10進数文字列（例: `"100000000000000000000"`, `"0.0000123"`）に展開する軽量ライブラリです。
JavaScript の `number` 型では安全に扱えない大きな数や高精度の小数も、文字列として正確に返します。

A lightweight library that expands exponential (scientific) notation (e.g., `1e+20`, `1.23e-5`) into full decimal strings (e.g., `"100000000000000000000"`, `"0.0000123"`).
Returns results as strings, preserving precision beyond JavaScript's `number` safe range.

---

## 📖 目次 / Table of Contents

- [📦 インストール / Installation](#-インストール--installation)
- [🚀 クイックスタート / Quick Start](#-クイックスタート--quick-start)
- [📚 API リファレンス / API Reference](#-api-リファレンス--api-reference)
- [📝 入力形式 / Input Format](#-入力形式--input-format)
- [⚠️ エラーハンドリング / Error Handling](#️-エラーハンドリング--error-handling)
- [💻 TypeScript サポート / TypeScript Support](#-typescript-サポート--typescript-support)
- [🌐 CDN 経由での利用 / Use via CDN](#-cdn-経由での利用--use-via-cdn)
- [🛠️ 開発 / Development](#️-開発--development)

---

## 📦 インストール / Installation

```bash
npm install expand-exponential
```

---

## 🚀 クイックスタート / Quick Start

### Node.js (CommonJS)

```javascript
const { expandExponential } = require("expand-exponential");

console.log(expandExponential("1.23e5")); // "123000"
console.log(expandExponential("5e-7")); // "0.0000005"
console.log(expandExponential(1e21)); // "1000000000000000000000"
```

### Node.js (ESM)

```javascript
import { expandExponential } from "expand-exponential";

console.log(expandExponential("1.23e5")); // "123000"
console.log(expandExponential("5e-7")); // "0.0000005"
console.log(expandExponential(1e21)); // "1000000000000000000000"
```

---

## 📚 API リファレンス / API Reference

### `expandExponential(number)`

指数表記を展開し、10進数の文字列として返します。
指数表記でない数値文字列はそのまま返します。

Expands exponential notation to a full decimal string.
Non-exponential numeric strings are returned as-is.

- **引数 / Parameters**: `number` (`string | number`) - 展開する数値または文字列 / The number or string to expand
- **戻り値 / Returns**: `string` - 展開された10進数文字列 / Expanded decimal string
- **例外 / Throws**:
  - `InvalidArgumentError` - `null`, `undefined`, 空文字の場合 / If `null`, `undefined`, or empty string
  - `InvalidInputError` - `NaN`, `Infinity`, 不正な形式の場合 / If `NaN`, `Infinity`, or invalid format
  - `ResultOverflowError` - 結果文字列が最大長を超える場合 / If result exceeds max string length

**例 / Examples**:

```javascript
// 正の指数 / Positive exponent
expandExponential("1.23e5"); // "123000"
expandExponential("5e3"); // "5000"
expandExponential("9.87654e6"); // "9876540"

// 負の指数 / Negative exponent
expandExponential("1.23e-2"); // "0.0123"
expandExponential("5e-7"); // "0.0000005"

// 負の数 / Negative numbers
expandExponential("-1.5e4"); // "-15000"
expandExponential("-2.5e-3"); // "-0.0025"

// number型入力 / Number type input
expandExponential(1e21); // "1000000000000000000000"
expandExponential(5e-7); // "0.0000005"

// 指数表記でない入力はそのまま返す / Non-exponential input returned as-is
expandExponential("123.456"); // "123.456"
expandExponential(42); // "42"
```

---

## 📝 入力形式 / Input Format

### サポートされている入力 / Supported Input

| 入力タイプ / Input Type | 例 / Example | 結果 / Result              |
| ----------------------- | ------------ | -------------------------- |
| 指数表記 (string)       | `"1.23e5"`   | `"123000"`                 |
| 指数表記 (大文字E)      | `"2.5E10"`   | `"25000000000"`            |
| 明示的な+記号           | `"+1.23e+5"` | `"123000"`                 |
| 負の指数                | `"1.23e-2"`  | `"0.0123"`                 |
| 負の数                  | `"-1.5e4"`   | `"-15000"`                 |
| number 型               | `1e21`       | `"1000000000000000000000"` |
| 通常の数値文字列        | `"123.456"`  | `"123.456"`                |

### サポートされていない入力 / Unsupported Input

| 入力 / Input                       | エラー / Error         |
| ---------------------------------- | ---------------------- |
| `null`, `undefined`, `""`          | `InvalidArgumentError` |
| `NaN`, `Infinity`                  | `InvalidInputError`    |
| `"abc"`, `"1.2.3e5"`               | `InvalidInputError`    |
| `"1e999999999"` (結果が巨大すぎる) | `ResultOverflowError`  |

---

## ⚠️ エラーハンドリング / Error Handling

すべてのエラーは `ExpandExponentialErrorBase` を継承しています。
エラーの種別ごとにキャッチできます。

All errors extend `ExpandExponentialErrorBase`.
You can catch errors by specific type.

```javascript
import { expandExponential } from "expand-exponential";

try {
  expandExponential("abc");
} catch (error) {
  console.log(error.name); // "InvalidInputError"
  console.log(error.message); // "Expected a valid number format."
}
```

| エラークラス / Error Class | 発生条件 / Condition                                              |
| -------------------------- | ----------------------------------------------------------------- |
| `InvalidArgumentError`     | `null`, `undefined`, 空文字 / `null`, `undefined`, empty string   |
| `InvalidInputError`        | `NaN`, `Infinity`, 不正な形式 / `NaN`, `Infinity`, invalid format |
| `ResultOverflowError`      | 結果が文字列最大長を超過 / Result exceeds max string length       |

---

## 💻 TypeScript サポート / TypeScript Support

TypeScript の型定義が含まれています。

TypeScript definitions are included.

```typescript
import { expandExponential } from "expand-exponential";

const result: string = expandExponential("1.23e5"); // "123000"
```

---

## 🌐 CDN 経由での利用 / Use via CDN

jsDelivr や unpkg の CDN から直接ブラウザで利用できます。

You can use the library directly in the browser via jsDelivr or unpkg CDN.

```html
<script src="https://cdn.jsdelivr.net/npm/expand-exponential/dist/index.umd.js"></script>
<script>
  const { expandExponential } = ExpandExponential;
  console.log(expandExponential("1.23e5")); // "123000"
</script>
```

unpkg も同様に利用可能です:

You can also use unpkg:

```html
<script src="https://unpkg.com/expand-exponential/dist/index.umd.js"></script>
```

---

## 🛠️ 開発 / Development

### ビルド / Build

```bash
npm run build
```

### テストの実行 / Running Tests

```bash
npm test              # 全テストを実行 / Run all tests
npm run test:watch    # ウォッチモードで実行 / Run in watch mode
npm run test:coverage # カバレッジ付きで実行 / Run with coverage
```

---

## ライセンス / License

MIT License

## 作者 / Author

[dak-ia](https://github.com/dak-ia)

## リポジトリ / Repository

https://github.com/dak-ia/expand-exponential
