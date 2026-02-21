export const calcTimeRemaining = (expiresAt: string): string => {
  const expiration = new Date(expiresAt).getTime();
  const now = new Date().getTime();
  const msDiff = expiration - now;

  if (msDiff <= 0) return "Expired";

  const seconds = Math.floor(msDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // 1. Days + Hours (e.g., "2d 5h")
  if (days > 0) {
    return `${days}d ${hours % 24}h`;
  }

  // 2. Hours + Minutes (e.g., "5h 30m")
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  }

  // 3. Minutes + Seconds (e.g., "10m 15s")
  if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  }

  // 4. Just Seconds (e.g., "45s")
  return `${seconds}s`;
};
