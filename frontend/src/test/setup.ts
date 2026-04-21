import "@testing-library/jest-dom";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

// Clean up DOM after every test
afterEach(() => {
  cleanup();
});

// Mock window.crypto for encryption tests
Object.defineProperty(globalThis, "crypto", {
  value: {
    subtle: {
      generateKey: vi.fn(),
      encrypt: vi.fn(),
      decrypt: vi.fn(),
      exportKey: vi.fn(),
      importKey: vi.fn(),
    },
    getRandomValues: vi.fn((arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++) arr[i] = i % 256;
      return arr;
    }),
  },
});

// Mock window.btoa / atob (available in jsdom but explicit is safer)
globalThis.btoa = (str: string) =>
  Buffer.from(str, "binary").toString("base64");
globalThis.atob = (str: string) =>
  Buffer.from(str, "base64").toString("binary");
