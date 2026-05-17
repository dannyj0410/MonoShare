const CHARSET = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  digits: "0123456789",
  symbols: "!@#$%^&*-_=+",
} as const;

export function generateSecretKey(length = 16): string {
  const all = CHARSET.upper + CHARSET.lower + CHARSET.digits + CHARSET.symbols;
  const randomValues = new Uint8Array(length * 2); // overshoot to handle rejection sampling
  crypto.getRandomValues(randomValues);

  // Rejection sampling: discard values that would bias towards lower indices
  const maxUnbiased = 256 - (256 % all.length);
  const result: string[] = [];

  for (const byte of randomValues) {
    if (result.length === length) break;
    if (byte < maxUnbiased) {
      result.push(all[byte % all.length]);
    }
  }

  // Guarantee at least one of each character class
  const guaranteed = [
    CHARSET.upper[randomValues[0] % CHARSET.upper.length],
    CHARSET.lower[randomValues[1] % CHARSET.lower.length],
    CHARSET.digits[randomValues[2] % CHARSET.digits.length],
    CHARSET.symbols[randomValues[3] % CHARSET.symbols.length],
  ];
  // Splice guaranteed chars into random positions
  guaranteed.forEach((char, i) => {
    const pos = randomValues[i + 4] % result.length;
    result[pos] = char;
  });

  return result.join("");
}
