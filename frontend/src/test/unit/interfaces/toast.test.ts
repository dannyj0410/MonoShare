import { describe, it, expect } from "vitest";
import { isApiError } from "../../../interfaces/toast.interface";

describe("isApiError", () => {
  it("returns true for an object with a response property", () => {
    const error = { response: { data: { message: "Not found" }, status: 404 } };
    expect(isApiError(error)).toBe(true);
  });

  it("returns false for a plain Error instance", () => {
    expect(isApiError(new Error("oops"))).toBe(false);
  });

  it("returns false for a null value", () => {
    expect(isApiError(null)).toBe(false);
  });

  it("returns false for a primitive string", () => {
    expect(isApiError("some error string")).toBe(false);
  });

  it("returns false for undefined", () => {
    expect(isApiError(undefined)).toBe(false);
  });

  it("returns true for a minimal object with a response key", () => {
    expect(isApiError({ response: undefined })).toBe(true);
  });
});
