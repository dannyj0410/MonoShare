import {
  invalidReceiverEmail,
  invalidSecretPassword,
  invalidSecretText,
} from "../../../utils/validators/secret.validator";

describe("invalidReceiverEmail", () => {
  it("Returns false (valid) when receiver email input is empty", () => {
    expect(invalidReceiverEmail("")).toBe(false);
  });

  it("Returns true (invalid) when the email format is invalid", () => {
    expect(invalidReceiverEmail("invalidemail")).toBe(true);
    expect(invalidReceiverEmail("missingdomain@")).toBe(true);
    expect(invalidReceiverEmail("missingATgmail.com")).toBe(true);
    expect(invalidReceiverEmail("@missing.localpart")).toBe(true);
  });

  it("returns false (valid) for a valid email address", () => {
    expect(invalidReceiverEmail("user@example.com")).toBe(false);
  });
});

describe("invalidSecretPassword", () => {
  it("returns false (valid) when no password is provided", () => {
    expect(invalidSecretPassword("")).toBe(false);
  });

  it("returns true (invalid) when the password is too short", () => {
    expect(invalidSecretPassword("ab")).toBe(true);
  });

  it("returns true (invalid) when the password contains spaces", () => {
    expect(invalidSecretPassword("bad pass")).toBe(true);
  });

  it("returns false (valid) for a valid password", () => {
    expect(invalidSecretPassword("ok123")).toBe(false);
  });

  it("returns false (valid) for a password exactly 3 characters long", () => {
    expect(invalidSecretPassword("abc")).toBe(false);
  });
});

describe("invalidSecretText", () => {
  it("returns true (invalid) when the text is too short", () => {
    expect(invalidSecretText("ab")).toBe(true);
    expect(invalidSecretText("")).toBe(true);
  });

  it("returns false (valid) for a valid secret text", () => {
    expect(invalidSecretText("my secret value")).toBe(false);
  });

  it("returns true (invalid) when exceeding the default 1000 character limit", () => {
    const longText = "a".repeat(1001);
    expect(invalidSecretText(longText)).toBe(true);
  });

  it("returns false (valid) when under character limit", () => {
    expect(invalidSecretText("a".repeat(100), 1000)).toBe(false);
    expect(invalidSecretText("a".repeat(999), 1000)).toBe(false);
  });

  it("returns true (invalid) when exceeding character limit", () => {
    expect(invalidSecretText("a".repeat(1100), 1000)).toBe(true);
    expect(invalidSecretText("a".repeat(10001), 10000)).toBe(true);
    expect(invalidSecretText("a".repeat(10100), 10000)).toBe(true);
  });

  it("returns false (valid) when exactly matching character limit", () => {
    expect(invalidSecretText("a".repeat(1000), 1000)).toBe(false);
    expect(invalidSecretText("a".repeat(10000), 10000)).toBe(false);
  });
});
