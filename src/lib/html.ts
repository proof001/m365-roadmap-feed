import sanitizeHtml from "sanitize-html";

/** Strip HTML from Microsoft roadmap descriptions for safe card display. */
export function htmlToPlainText(html: string): string {
  const stripped = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });
  return stripped.replace(/\s+/g, " ").trim();
}

export function truncateText(text: string, maxLength = 280): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trimEnd()}…`;
}
