import { describe, it, expect } from "vitest";
import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from "../../../utils/validators/auth.validator";

describe("validateEmail", () => {
  it("returns an error when email is empty", () => {
    expect(validateEmail("")).toBe("Email is required");
  });

  it("returns an error for an address missing the @ symbol", () => {
    expect(validateEmail("notanemail")).toBe("Incorrect email address");
  });

  it("returns an error when there is no domain after the @", () => {
    expect(validateEmail("user@")).toBe("Incorrect email address");
  });

  it("returns undefined for a valid email", () => {
    expect(validateEmail("user@example.com")).toBeUndefined();
  });

  it("returns undefined for a valid email with sub-domain", () => {
    expect(validateEmail("user@mail.co.uk")).toBeUndefined();
  });
});

describe("validatePassword", () => {
  it("returns an error when the password contains spaces", () => {
    expect(validatePassword("pass word")).toBe(
      "Spaces are not allowed in your password",
    );
  });

  it("returns an error when the password is too short", () => {
    expect(validatePassword("abc")).toBe(
      "Password must be at least 6 characters",
    );
  });

  it("returns undefined for a valid password", () => {
    expect(validatePassword("securePass1!")).toBeUndefined();
  });

  it("returns undefined for a password exactly 6 characters long", () => {
    expect(validatePassword("abcdef")).toBeUndefined();
  });

  it("returns an error message when the password is an empty string", () => {
    expect(validatePassword("")).toBe("Password is required");
  });
});

describe("validateConfirmPassword", () => {
  it("returns an error when the confirm field is empty", () => {
    expect(validateConfirmPassword("securePass1!", "")).toBe(
      "Please confirm your password",
    );
  });

  it("returns an error when passwords do not match", () => {
    expect(validateConfirmPassword("securePass1!", "different")).toBe(
      "Passwords do not match",
    );
  });

  it("returns undefined when passwords match", () => {
    expect(
      validateConfirmPassword("securePass1!", "securePass1!"),
    ).toBeUndefined();
  });

  it("returns an error when the password itself contains a space", () => {
    expect(validateConfirmPassword("pass word", "pass word")).toBe(
      "Spaces are not allowed in your password",
    );
  });
});
