import { truncateText } from "@/lib/html";
import { statusTagClass } from "@/lib/stats";
import type { RoadmapItem } from "@/lib/types";

function formatDate(value: string): string {
  if (!value?.trim()) return "—";
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) return value;
  return new Date(parsed).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function RoadmapRow({ item }: { item: RoadmapItem }) {
  const description = truncateText(item.descriptionPlain);
  const updated = formatDate(item.modified || item.created);
  const titleContent = item.moreInfoLink ? (
    <a
      className="item-title"
      href={item.moreInfoLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.title}
    </a>
  ) : (
    <span className="item-title">{item.title}</span>
  );

  return (
    <tr>
      <td>
        {titleContent}
        {description ? <span className="item-desc">{description}</span> : null}
      </td>
      <td>
        <span className={`tag ${statusTagClass(item.status)}`}>
          {item.status || "unknown"}
        </span>
      </td>
      <td className="hide-s">
        <div className="flex flex-wrap gap-1">
          {item.products.length > 0 ? (
            item.products.map((product) => (
              <span key={product} className="tag tag-cat">
                {product}
              </span>
            ))
          ) : (
            <span className="text-[var(--muted)]">—</span>
          )}
        </div>
      </td>
      <td className="hide-s n">
        <div>{formatDate(item.publicPreviewDate)}</div>
        <div className="text-[13px] font-bold text-[var(--muted)]">
          ga {formatDate(item.publicDisclosureAvailabilityDate)}
        </div>
      </td>
      <td className="n">{updated}</td>
    </tr>
  );
}
