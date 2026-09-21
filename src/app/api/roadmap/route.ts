import { NextResponse } from "next/server";
import {
  collectFilterOptions,
  getRoadmapItems,
  ROADMAP_REVALIDATE_SECONDS,
} from "@/lib/roadmap";
import type { RoadmapApiResponse } from "@/lib/types";

export const revalidate = 3600;

export async function GET() {
  try {
    const items = await getRoadmapItems();
    const { products, statuses } = collectFilterOptions(items);

    const body: RoadmapApiResponse = {
      items,
      meta: {
        fetchedAt: new Date().toISOString(),
        count: items.length,
        products,
        statuses,
      },
    };

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": `public, s-maxage=${ROADMAP_REVALIDATE_SECONDS}, stale-while-revalidate=60`,
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to load roadmap";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
