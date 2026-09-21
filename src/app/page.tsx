import { Footer } from "@/components/Footer";
import { RoadmapFeed } from "@/components/RoadmapFeed";
import { collectFilterOptions, getRoadmapItems } from "@/lib/roadmap";

export const revalidate = 3600;

export default async function HomePage() {
  const items = await getRoadmapItems();
  const { products, statuses } = collectFilterOptions(items);

  return (
    <main className="wrap">
      <header>
        <h1 className="display-title">m365 roadmap feed</h1>
        <p className="display-sub">
          official microsoft 365 release communications. chronological updates,
          filtered on your device. refreshed hourly on the server.
        </p>
      </header>

      <RoadmapFeed items={items} products={products} statuses={statuses} />

      <Footer />
    </main>
  );
}
