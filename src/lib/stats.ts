import type { RoadmapItem } from "@/lib/types";

export interface RoadmapStats {
  itemCount: number;
  productCount: number;
  previewCount: number;
  rollingOutCount: number;
}

export function computeRoadmapStats(items: RoadmapItem[]): RoadmapStats {
  const productSet = new Set<string>();
  let previewCount = 0;
  let rollingOutCount = 0;

  for (const item of items) {
    for (const p of item.products) productSet.add(p);
    if (item.publicPreviewDate?.trim()) previewCount += 1;
    const status = item.status.toLowerCase();
    if (status.includes("roll")) rollingOutCount += 1;
  }

  return {
    itemCount: items.length,
    productCount: productSet.size,
    previewCount,
    rollingOutCount,
  };
}

export function statusTagClass(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("roll")) return "tag-yel";
  if (s.includes("develop") || s.includes("preview")) return "tag-blue";
  if (s.includes("launch") || s.includes("ga") || s.includes("general")) return "tag-grn";
  if (s.includes("cancel")) return "tag-pink";
  return "tag-cat";
}
