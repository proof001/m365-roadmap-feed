import type { RoadmapItem } from "@/lib/types";

export interface RoadmapFilters {
  query: string;
  products: string[];
  status: string;
}

export function filterRoadmapItems(
  items: RoadmapItem[],
  filters: RoadmapFilters,
): RoadmapItem[] {
  const q = filters.query.trim().toLowerCase();

  return items.filter((item) => {
    if (filters.status && item.status !== filters.status) {
      return false;
    }

    if (filters.products.length > 0) {
      const hasProduct = filters.products.some((p) => item.products.includes(p));
      if (!hasProduct) return false;
    }

    if (q) {
      const haystack = `${item.title} ${item.descriptionPlain}`.toLowerCase();
      if (!haystack.includes(q)) return false;
    }

    return true;
  });
}
