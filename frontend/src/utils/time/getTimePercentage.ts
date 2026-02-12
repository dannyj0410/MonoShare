export function getTimePercentage(createdAt: string, expiresAt: string) {
  const start = new Date(createdAt).getTime();
  const end = new Date(expiresAt).getTime();
  const now = Date.now();

  const totalDuration = end - start;
  const elapsed = now - start;
  const progress = (elapsed / totalDuration) * 100; // add 5 because of the animation making the height look lower than it should be

  const finalValue = Math.min(Math.max(Math.round(progress), 0), 100);
  return finalValue.toString();
}
