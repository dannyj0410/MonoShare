import { customAlphabet } from "nanoid";
import { ONE_DAY_MS, ONE_HOUR_MS, SEVEN_DAYS_MS } from "../constants/days_ms";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { CreateSecretDto, SecretExpirationOptions } from "../dtos/secret.dto";
import { AppError } from "../utils/AppError";

export const SecretService = {
  isValidExpiration(value: string): value is SecretExpirationOptions {
    return ["1h", "1d", "7d"].includes(value);
  },

  setSecretExpirationDate(value: SecretExpirationOptions): Date {
    switch (value) {
      case "1h":
        return new Date(Date.now() + ONE_HOUR_MS);
      case "1d":
        return new Date(Date.now() + ONE_DAY_MS);
      case "7d":
        return new Date(Date.now() + SEVEN_DAYS_MS);
    }
  },

  validateSecretPayload({
    encryptedText,
    encryptionIV,
    timeTillExpiration,
    receiverEmail,
  }: CreateSecretDto) {
    if (!encryptedText) {
      throw new AppError("Secret text field cannot be empty", HTTP_BAD_REQUEST);
    }
    if (!encryptionIV) {
      throw new AppError("Error encrypting secret", HTTP_BAD_REQUEST);
    }

    // 2. Base64 validation
    const base64Regex =
      /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;

    if (!base64Regex.test(encryptedText)) {
      throw new AppError("Invalid encrypted text format", HTTP_BAD_REQUEST);
    }

    if (!base64Regex.test(encryptionIV)) {
      throw new AppError("Error encrypting secret", HTTP_BAD_REQUEST);
    }

    // 3. IV must decode to exactly 12 bytes (AES-GCM requirement)
    const ivBytes = Buffer.from(encryptionIV, "base64");

    if (ivBytes.length !== 12) {
      throw new AppError("Error encrypting secret", HTTP_BAD_REQUEST);
    }

    if (!this.isValidExpiration(timeTillExpiration)) {
      throw new AppError(
        "Received incorrect expiration time option",
        HTTP_BAD_REQUEST,
      );
    }

    if (receiverEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(receiverEmail)) {
        throw new AppError(
          "Please enter a valid recipient email",
          HTTP_BAD_REQUEST,
        );
      }
    }
    return { success: true };
  },

  generateSlug() {
    const alphabet =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const nanoid = customAlphabet(alphabet, 12);
    return nanoid();
  },
};
