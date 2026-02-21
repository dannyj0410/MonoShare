export function calcTimePastCreation(createdAt: string) {
  const now = new Date().getTime();
  const created = new Date(createdAt).getTime();
  const diffInSeconds = Math.floor((now - created) / 1000);

  // Define intervals in seconds
  const intervals = [
    { label: "yr", seconds: 31536000 },
    { label: "mth", seconds: 2592000 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "m", seconds: 60 },
    { label: "s", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count}${interval.label} ago`;
    }
  }

  return "just now";
}
