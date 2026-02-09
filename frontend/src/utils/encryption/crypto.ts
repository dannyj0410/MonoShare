// utils/crypto.ts

// 1. Generate a random key (used when creating the secret)
export async function generateKey(): Promise<CryptoKey> {
  return window.crypto.subtle.generateKey(
    {
      name: "AES-GCM",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"],
  );
}

// 2. Encrypt the data
export async function encryptSecret(text: string, key: CryptoKey) {
  const encoder = new TextEncoder();
  const encodedText = encoder.encode(text);

  // The IV (Initialization Vector) must be unique for every encryption
  const iv = window.crypto.getRandomValues(new Uint8Array(12));

  const encryptedData = await window.crypto.subtle.encrypt(
    {
      name: "AES-GCM",
      iv: iv,
    },
    key,
    encodedText,
  );

  // Return base64 strings to easily store in DB and URL
  return {
    ciphertext: arrayBufferToBase64(encryptedData),
    iv: arrayBufferToBase64(iv),
  };
}

// 3. Decrypt the data
export async function decryptSecret(
  ciphertextB64: string,
  ivB64: string,
  key: CryptoKey,
) {
  const decoder = new TextDecoder();
  const ciphertext = base64ToArrayBuffer(ciphertextB64);
  const iv = base64ToArrayBuffer(ivB64);

  try {
    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: "AES-GCM",
        iv: iv,
      },
      key,
      ciphertext,
    );
    return decoder.decode(decryptedData);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to decrypt. Key might be wrong or data tampered.");
  }
}

// --- Helpers for Base64 conversion ---

export async function exportKeyToString(key: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey("jwk", key);
  // We use the "k" parameter from the JWK as the URL-safe key string
  return exported.k || "";
}

export async function importKeyFromString(
  keyString: string,
): Promise<CryptoKey> {
  return window.crypto.subtle.importKey(
    "jwk",
    {
      kty: "oct",
      k: keyString,
      alg: "A256GCM",
      ext: true,
    },
    { name: "AES-GCM" },
    true,
    ["encrypt", "decrypt"],
  );
}

function arrayBufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = window.atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}
