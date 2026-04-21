import { describe, it, expect } from "vitest";
import { emailShortener } from "../../../utils/email.shortener";

describe("emailShortener", () => {
  it("returns the original email when it is 20 characters or fewer", () => {
    const short = "a@b.com";
    expect(emailShortener(short)).toBe(short);
  });

  it("returns the original email when it is exactly 20 characters", () => {
    const exact = "user1234@example.com";
    expect(emailShortener(exact)).toBe(exact);
  });

  it("truncates a very long local-part with an ellipsis", () => {
    const email = "verylonglocalpart@example.com";
    const result = emailShortener(email);
    expect(result.startsWith("verylongloca...")).toBe(true);
  });

  it("truncates a very long domain with an ellipsis", () => {
    const email = "user@verylongdomainnamethatistoolong.com";
    const result = emailShortener(email);
    const [, domain] = result.split("@");
    expect(domain.endsWith("...")).toBe(true);
  });

  it("truncates both parts when both are too long", () => {
    const email = "averylonglocalpart@averylongdomainname.com";
    const result = emailShortener(email);
    const [local, domain] = result.split("@");
    expect(local.endsWith("...")).toBe(true);
    expect(domain.endsWith("...")).toBe(true);
  });

  it("preserves the @ symbol in the output", () => {
    const email = "averylonglocalpart@averylongdomainname.com";
    expect(emailShortener(email)).toContain("@");
  });
});
