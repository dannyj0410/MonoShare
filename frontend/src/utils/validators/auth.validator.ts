const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (email: string): string | undefined => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Incorrect email address";
};

export const validatePassword = (password: string): string | undefined => {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
};

export const validateConfirmPassword = (
  password: string,
  confirm?: string,
): string | undefined => {
  if (!confirm) return "Please confirm your password";
  if (confirm !== password) return "Passwords do not match";
};
