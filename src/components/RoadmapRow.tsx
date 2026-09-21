import { truncateText } from "@/lib/html";
import { formatDaysAgo, daysSince } from "@/lib/format";
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
  const description = truncateText(item.descriptionPlain, 220);
  const sortDate = item.modified || item.created;
  const ageDays = daysSince(sortDate);
  const stale = ageDays !== null && ageDays > 90;

  const titleContent = item.moreInfoLink ? (
    <a
      className="repo"
      href={item.moreInfoLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      {item.title}
    </a>
  ) : (
    <span className="repo">{item.title}</span>
  );

  const status = item.status || "unknown";

  return (
    <tr>
      <td className={`n${stale ? " stale" : ""}`}>{formatDaysAgo(sortDate)}</td>
      <td>
        {titleContent}
        <span className={`tag ${statusTagClass(item.status)}`}>{status}</span>
        {description ? <span className="desc">{description}</span> : null}
      </td>
      <td className="hide-s">
        <div className="tag-row">
          {item.products.length > 0 ? (
            item.products.map((product) => (
              <span key={product} className="tag cat">
                {product}
              </span>
            ))
          ) : (
            "—"
          )}
        </div>
      </td>
      <td className="hide-s">{formatDate(item.publicPreviewDate)}</td>
      <td className="hide-s">{formatDate(item.publicDisclosureAvailabilityDate)}</td>
    </tr>
  );
}
