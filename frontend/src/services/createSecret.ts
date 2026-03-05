import type {
  ICreateSecretFormData,
  ICreateSecretRequest,
  ICreateSecretResponse,
} from "../interfaces/secret.interface";
import {
  encryptSecret,
  exportKeyToString,
  generateKey,
} from "../utils/encryption/crypto";

export const createEncryptedSecret = async (
  formData: ICreateSecretFormData,
  mutateFn: (data: ICreateSecretRequest) => Promise<ICreateSecretResponse>,
) => {
  const urlFragmentKey = await generateKey();
  const { encryptedText, encryptionIV } = await encryptSecret(
    formData.secret,
    urlFragmentKey,
  );
  const urlKeyAsString = await exportKeyToString(urlFragmentKey);

  const res = await mutateFn({
    encryptedText,
    encryptionIV,
    timeTillExpiration: formData.timeTillExpiration,
    receiverEmail: formData.receiverEmail,
    password: formData.password,
  });

  return {
    ...res.secret,
    created: true,
    key: urlKeyAsString,
    text: formData.secret,
    shareUrl: res.shareUrl,
  };
};
