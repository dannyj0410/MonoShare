const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateReceiverEmail = (email: string): boolean => {
  if (!email) return false;
  if (!emailRegex.test(email)) return true;
  return false;
};

export const validateSecretPassword = (password: string): boolean => {
  if (!password) return false;
  if (password.length < 3) return true;
  return false;
};

export const validateSecretText = (secret: string): boolean => {
  if (secret.length < 3) return true;
  return false;
};
