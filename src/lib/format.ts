export function daysSince(isoDate: string): number | null {
  if (!isoDate?.trim()) return null;
  const parsed = Date.parse(isoDate);
  if (Number.isNaN(parsed)) return null;
  return Math.floor((Date.now() - parsed) / 86400000);
}

export function formatDaysAgo(isoDate: string): string {
  const days = daysSince(isoDate);
  if (days === null) return "—";
  return `${days}d ago`;
}
