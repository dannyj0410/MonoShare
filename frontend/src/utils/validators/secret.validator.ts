const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const invalidReceiverEmail = (email: string): boolean => {
  if (!email) return false;
  if (!emailRegex.test(email)) return true;
  return false;
};

export const invalidSecretPassword = (password: string): boolean => {
  const hasSpaces = /\s/.test(password);

  if (!password) return false;
  if (hasSpaces || password.length < 3) {
    return true;
  }

  return false;
};

export const invalidSecretText = (
  secret: string,
  charLimit: number = 1000,
): boolean => {
  if (secret.length < 3 || secret.length > charLimit) return true;
  return false;
};
