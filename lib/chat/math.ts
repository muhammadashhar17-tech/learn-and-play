import { toWesternDigits } from "./normalize";

/**
 * Finds a simple sum in a message ("what is 12 x 8", "۱۲ جمع ۵", "15 manfi 7")
 * and solves it with a tiny, safe parser (no eval).
 */

const WORD_OPERATORS: [RegExp, string][] = [
  [/\b(plus|add|jama|jamaa)\b|جمع|ڄوڙ/gi, "+"],
  [/\b(minus|subtract|manfi|nafi)\b|منفی|منفي|گھٹا|ڪٽ/gi, "-"],
  [/\b(times|multiplied by|multiply|into|zarb)\b|ضرب/gi, "*"],
  [/\b(divided by|divide|over|taqseem|taqsim)\b|تقسیم|تقسيم/gi, "/"],
  [/[×✕]/g, "*"],
  [/[÷]/g, "/"],
  [/[−–]/g, "-"],
];

export interface MathResult {
  expression: string;
  result: number | null; // null = divide by zero
}

export function findMath(message: string): MathResult | null {
  let s = toWesternDigits(message).replace(/[⁦-⁩]/g, "");
  for (const [re, op] of WORD_OPERATORS) s = s.replace(re, ` ${op} `);
  // "7 x 8" → "7 * 8" (only when x sits between two numbers)
  s = s.replace(/(\d)\s*[xX]\s*(?=\d)/g, "$1 * ");

  const candidates = s.match(/[\d.\s+\-*/()]+/g) ?? [];
  const expr = candidates
    .map((c) => c.trim())
    .filter((c) => /\d/.test(c) && /\d\s*[+\-*/]\s*[\d(]/.test(c))
    .sort((a, b) => b.length - a.length)[0];
  if (!expr) return null;

  try {
    const value = evaluate(expr);
    const pretty = expr.replace(/\s+/g, "").replace(/\*/g, " × ").replace(/\//g, " ÷ ").replace(/\+/g, " + ").replace(/(\d)-/g, "$1 − ");
    if (!Number.isFinite(value)) return { expression: pretty, result: null };
    return { expression: pretty, result: Math.round(value * 10000) / 10000 };
  } catch {
    return null;
  }
}

/** Recursive-descent parser for + - * / and parentheses. */
function evaluate(input: string): number {
  const tokens = input.match(/\d+(?:\.\d+)?|[+\-*/()]/g) ?? [];
  let i = 0;
  const peek = () => tokens[i];
  const next = () => tokens[i++];

  function factor(): number {
    const tok = next();
    if (tok === "-") return -factor();
    if (tok === "(") {
      const v = expr();
      if (next() !== ")") throw new Error("bracket");
      return v;
    }
    const n = Number(tok);
    if (Number.isNaN(n)) throw new Error("number");
    return n;
  }
  function term(): number {
    let v = factor();
    while (peek() === "*" || peek() === "/") v = next() === "*" ? v * factor() : v / factor();
    return v;
  }
  function expr(): number {
    let v = term();
    while (peek() === "+" || peek() === "-") v = next() === "+" ? v + term() : v - term();
    return v;
  }

  const v = expr();
  if (i !== tokens.length) throw new Error("trailing");
  return v;
}
