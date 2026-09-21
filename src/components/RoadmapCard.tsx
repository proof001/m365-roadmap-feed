import { truncateText } from "@/lib/html";
import type { RoadmapItem } from "@/lib/types";

function DateRow({ label, value }: { label: string; value: string }) {
  if (!value?.trim()) return null;
  return (
    <p className="text-sm text-[var(--muted)]">
      <span className="font-medium text-[var(--foreground)]">{label}:</span>{" "}
      {value}
    </p>
  );
}

export function RoadmapCard({ item }: { item: RoadmapItem }) {
  const description = truncateText(item.descriptionPlain);

  return (
    <article
      className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition hover:border-[var(--accent)]/40"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <h2 className="text-lg font-semibold leading-snug text-[var(--foreground)]">
          {item.title}
        </h2>
        <span className="shrink-0 rounded-full bg-[var(--background)] px-3 py-1 text-xs font-medium ring-1 ring-[var(--border)]">
          {item.status || "Unknown"}
        </span>
      </div>

      {item.products.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {item.products.map((product) => (
            <span
              key={product}
              className="rounded-md bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--accent)]"
            >
              {product}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 space-y-1">
        <DateRow label="GA" value={item.publicDisclosureAvailabilityDate} />
        <DateRow label="Preview" value={item.publicPreviewDate} />
      </div>

      {description && (
        <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
          {description}
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--muted)]">
        <span>
          Updated {new Date(item.modified || item.created).toLocaleDateString()}
        </span>
        {item.moreInfoLink && (
          <a
            href={item.moreInfoLink}
            className="font-medium text-[var(--accent)] hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more →
          </a>
        )}
      </div>
    </article>
  );
}
