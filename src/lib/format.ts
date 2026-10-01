export function daysSince(isoDate: string): number | null {
  if (!isoDate?.trim()) return null;
  const parsed = Date.parse(isoDate);
  if (Number.isNaN(parsed)) return null;
  const days = Math.floor((Date.now() - parsed) / 86400000);
  return days <= 0 ? 0 : days;
}

export function formatDaysAgo(isoDate: string): string {
  const days = daysSince(isoDate);
  if (days === null) return "—";
  if (days <= 0) return "Today";
  return `${days}d ago`;
}
