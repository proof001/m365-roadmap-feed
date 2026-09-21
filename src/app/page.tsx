import { Footer } from "@/components/Footer";
import { RoadmapFeed } from "@/components/RoadmapFeed";
import { collectFilterOptions, getRoadmapItems } from "@/lib/roadmap";

export const revalidate = 3600;

export default async function HomePage() {
  const items = await getRoadmapItems();
  const { products, statuses } = collectFilterOptions(items);

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-10">
        <p className="text-sm font-medium uppercase tracking-wide text-[var(--accent)]">
          Microsoft 365
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
          Roadmap feed
        </h1>
        <p className="mt-3 max-w-2xl text-[var(--muted)]">
          Official Release Communications updates in chronological order. Data is
          fetched on the server and cached for about an hour — your browser never
          talks to Microsoft directly.
        </p>
      </header>

      <RoadmapFeed items={items} products={products} statuses={statuses} />

      <Footer />
    </main>
  );
}
