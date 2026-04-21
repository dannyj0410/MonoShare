import { describe, it, expect, vi } from "vitest";
import {
  generateKey,
  encryptSecret,
  decryptSecret,
  exportKeyToString,
  importKeyFromString,
} from "../../../utils/encryption/crypto";

// ─── helpers ────────────────────────────────────────────────────

const makeFakeKey = (): CryptoKey =>
  ({
    type: "secret",
    extractable: true,
    algorithm: { name: "AES-GCM" },
    usages: ["encrypt", "decrypt"],
  }) as unknown as CryptoKey;

const arrayBufferToBase64 = (buffer: ArrayBuffer) => {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// ─── generateKey ────────────────────────────────────────────────────

describe("generateKey", () => {
  it("calls crypto.subtle.generateKey with AES-GCM / 128 and returns the key", async () => {
    const fakeKey = makeFakeKey();
    vi.spyOn(crypto.subtle, "generateKey").mockResolvedValueOnce(fakeKey);

    const result = await generateKey();

    expect(crypto.subtle.generateKey).toHaveBeenCalledWith(
      { name: "AES-GCM", length: 128 },
      true,
      ["encrypt", "decrypt"],
    );
    expect(result).toBe(fakeKey);
  });
});

// ─── encryptSecret ────────────────────────────────────────────────────

describe("encryptSecret", () => {
  it("returns empty strings when the text is empty", async () => {
    const fakeKey = makeFakeKey();
    const result = await encryptSecret("", fakeKey);
    expect(result).toEqual({ encryptedText: "", encryptionIV: "" });
    expect(crypto.subtle.encrypt).not.toHaveBeenCalled();
  });

  it("returns base64-encoded encrypted text and IV for non-empty input", async () => {
    const fakeKey = makeFakeKey();
    const fakeEncrypted = new Uint8Array([1, 2, 3, 4]).buffer;
    const encryptMock = vi.mocked(crypto.subtle.encrypt);
    encryptMock.mockResolvedValueOnce(fakeEncrypted);

    const result = await encryptSecret("hello", fakeKey);

    expect(encryptMock).toHaveBeenCalledWith(
      expect.objectContaining({ name: "AES-GCM", iv: expect.any(Object) }),
      fakeKey,
      expect.any(Object),
    );
    expect(result.encryptedText).toBe(arrayBufferToBase64(fakeEncrypted));
    expect(result.encryptionIV.length).toBeGreaterThan(0);
  });
});

// ─── decryptSecret ────────────────────────────────────────────────────

describe("decryptSecret", () => {
  const fakeKey = makeFakeKey();
  const fakeCiphertextB64 = btoa("fakeciphertext");
  const fakeIvB64 = btoa("fakeiv______");

  it("decodes and returns the plaintext string on success", async () => {
    const encoder = new TextEncoder();
    const plainBuffer = encoder.encode("my secret");
    vi.spyOn(crypto.subtle, "decrypt").mockResolvedValueOnce(
      plainBuffer.buffer,
    );

    const result = await decryptSecret(fakeCiphertextB64, fakeIvB64, fakeKey);
    expect(result).toBe("my secret");
  });

  it("throws when decryption fails", async () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    const decryptMock = vi.mocked(crypto.subtle.decrypt);
    decryptMock.mockRejectedValueOnce(new Error("bad key"));

    await expect(
      decryptSecret(fakeCiphertextB64, fakeIvB64, fakeKey),
    ).rejects.toThrow("Failed to decrypt");
    consoleSpy.mockRestore();
  });
});

// ─── exportKeyToString / importKeyFromString ────────────────────────────────────────────────────

describe("exportKeyToString", () => {
  it("calls exportKey with 'jwk' and returns the k property", async () => {
    const fakeKey = makeFakeKey();
    vi.spyOn(crypto.subtle, "exportKey").mockResolvedValueOnce({
      kty: "oct",
      k: "FAKE_KEY_STRING",
      alg: "A128GCM",
      ext: true,
      key_ops: ["encrypt", "decrypt"],
    });

    const result = await exportKeyToString(fakeKey);
    expect(result).toBe("FAKE_KEY_STRING");
  });
});

describe("importKeyFromString", () => {
  it("calls importKey with the correct JWK structure", async () => {
    const fakeKey = makeFakeKey();
    vi.spyOn(crypto.subtle, "importKey").mockResolvedValueOnce(fakeKey);

    const result = await importKeyFromString("FAKE_KEY_STRING");

    expect(crypto.subtle.importKey).toHaveBeenCalledWith(
      "jwk",
      expect.objectContaining({ k: "FAKE_KEY_STRING", alg: "A128GCM" }),
      { name: "AES-GCM" },
      true,
      ["encrypt", "decrypt"],
    );
    expect(result).toBe(fakeKey);
  });
});
