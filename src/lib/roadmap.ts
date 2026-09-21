import type { RoadmapItem, RoadmapItemRaw } from "@/lib/types";
import { htmlToPlainText } from "@/lib/html";

export const M365_ROADMAP_API_URL =
  "https://www.microsoft.com/releasecommunications/api/v1/m365";

export const ROADMAP_REVALIDATE_SECONDS = 3600;

function tagNames(tags?: { tagName: string }[]): string[] {
  if (!tags?.length) return [];
  return tags.map((t) => t.tagName).filter(Boolean);
}

export function normalizeRoadmapItem(raw: RoadmapItemRaw): RoadmapItem {
  const modified = raw.modified || raw.created;
  const created = raw.created || raw.modified;

  return {
    id: raw.id,
    title: raw.title,
    descriptionPlain: htmlToPlainText(raw.description ?? ""),
    status: raw.status ?? "",
    publicRoadmapStatus: raw.publicRoadmapStatus ?? "",
    created,
    modified,
    publicDisclosureAvailabilityDate: raw.publicDisclosureAvailabilityDate ?? "",
    publicPreviewDate: raw.publicPreviewDate ?? "",
    moreInfoLink: raw.moreInfoLink,
    products: tagNames(raw.tagsContainer?.products),
    platforms: tagNames(raw.tagsContainer?.platforms),
    releasePhase: tagNames(raw.tagsContainer?.releasePhase),
    sortDate: modified || created,
  };
}

export function sortRoadmapItems(items: RoadmapItem[]): RoadmapItem[] {
  return [...items].sort((a, b) => {
    const aTime = Date.parse(a.sortDate) || 0;
    const bTime = Date.parse(b.sortDate) || 0;
    return bTime - aTime;
  });
}

export function collectFilterOptions(items: RoadmapItem[]): {
  products: string[];
  statuses: string[];
} {
  const productSet = new Set<string>();
  const statusSet = new Set<string>();

  for (const item of items) {
    if (item.status) statusSet.add(item.status);
    for (const p of item.products) productSet.add(p);
  }

  return {
    products: [...productSet].sort((a, b) => a.localeCompare(b)),
    statuses: [...statusSet].sort((a, b) => a.localeCompare(b)),
  };
}

type RoadmapCacheEntry = {
  raw: RoadmapItemRaw[];
  expiresAt: number;
};

let roadmapCache: RoadmapCacheEntry | null = null;

export async function fetchM365RoadmapRaw(): Promise<RoadmapItemRaw[]> {
  const now = Date.now();
  if (roadmapCache && roadmapCache.expiresAt > now) {
    return roadmapCache.raw;
  }

  const res = await fetch(M365_ROADMAP_API_URL, {
    // Payload exceeds Next.js fetch data cache limits (~2MB); cache in-process instead.
    cache: "no-store",
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Microsoft roadmap API returned ${res.status}`);
  }

  const data = (await res.json()) as RoadmapItemRaw[];
  if (!Array.isArray(data)) {
    throw new Error("Microsoft roadmap API returned unexpected payload");
  }

  roadmapCache = {
    raw: data,
    expiresAt: now + ROADMAP_REVALIDATE_SECONDS * 1000,
  };

  return data;
}

export async function getRoadmapItems(): Promise<RoadmapItem[]> {
  const raw = await fetchM365RoadmapRaw();
  return sortRoadmapItems(raw.map(normalizeRoadmapItem));
}
