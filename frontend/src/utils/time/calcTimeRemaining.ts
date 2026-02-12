export const calcTimeRemaining = (expiresAt: string) => {
  const expiration = new Date(expiresAt);
  const now = new Date();
  const msDiff = expiration.getTime() - now.getTime();

  if (msDiff <= 0) return "Expired";

  const totalSeconds = Math.floor(msDiff / 1000);
  const totalMinutes = Math.floor(msDiff / (1000 * 60));
  const totalHours = Math.floor(totalMinutes / 60);

  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  const minutes = totalMinutes % 60;
  const seconds = totalSeconds % 60;

  if (days > 0) {
    return `${days} day${days > 1 ? "s" : ""}${
      hours > 0 ? ` ${hours} hour${hours > 1 ? "s" : ""}` : ""
    }`;
  }

  if (hours > 0) {
    return `${hours} hour${hours > 1 ? "s" : ""} ${minutes} minute${minutes > 1 ? "s" : ""}`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? "s" : ""} ${seconds} second${seconds !== 1 ? "s" : ""}`;
  }

  return `${seconds} second${seconds !== 1 ? "s" : ""}`;
};
