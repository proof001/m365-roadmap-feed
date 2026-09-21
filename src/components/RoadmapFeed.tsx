"use client";

import { useMemo, useState } from "react";
import { filterRoadmapItems, type RoadmapFilters } from "@/lib/filters";
import type { RoadmapItem } from "@/lib/types";
import { RoadmapCard } from "@/components/RoadmapCard";

interface RoadmapFeedProps {
  items: RoadmapItem[];
  products: string[];
  statuses: string[];
}

export function RoadmapFeed({ items, products, statuses }: RoadmapFeedProps) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [productPicker, setProductPicker] = useState("");

  const filters: RoadmapFilters = useMemo(
    () => ({
      query,
      status,
      products: selectedProducts,
    }),
    [query, status, selectedProducts],
  );

  const filtered = useMemo(
    () => filterRoadmapItems(items, filters),
    [items, filters],
  );

  function addProduct() {
    const value = productPicker.trim();
    if (!value || selectedProducts.includes(value)) return;
    setSelectedProducts((prev) => [...prev, value].sort((a, b) => a.localeCompare(b)));
    setProductPicker("");
  }

  function removeProduct(product: string) {
    setSelectedProducts((prev) => prev.filter((p) => p !== product));
  }

  function clearFilters() {
    setQuery("");
    setStatus("");
    setSelectedProducts([]);
    setProductPicker("");
  }

  const hasActiveFilters = query || status || selectedProducts.length > 0;

  return (
    <div className="space-y-6">
      <section
        className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 shadow-sm md:p-5"
        aria-label="Filters"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium">Search</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title or description…"
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium">Status</span>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            >
              <option value="">All statuses</option>
              {statuses.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-4">
          <span className="mb-1 block text-sm font-medium">Products</span>
          <div className="flex flex-col gap-2 sm:flex-row">
            <select
              value={productPicker}
              onChange={(e) => setProductPicker(e.target.value)}
              className="min-w-0 flex-1 rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none ring-[var(--accent)] focus:ring-2"
            >
              <option value="">Add a product filter…</option>
              {products.map((p) => (
                <option key={p} value={p} disabled={selectedProducts.includes(p)}>
                  {p}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addProduct}
              className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            >
              Add
            </button>
          </div>

          {selectedProducts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedProducts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => removeProduct(p)}
                  className="inline-flex items-center gap-1 rounded-full bg-[var(--background)] px-3 py-1 text-xs ring-1 ring-[var(--border)] hover:ring-[var(--accent)]"
                  title="Remove filter"
                >
                  {p}
                  <span aria-hidden>×</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-[var(--accent)] hover:underline"
          >
            Clear filters
          </button>
        )}
      </section>

      <p className="text-sm text-[var(--muted)]">
        Showing {filtered.length.toLocaleString()} of {items.length.toLocaleString()}{" "}
        items · sorted by most recently modified
      </p>

      <div className="grid gap-4">
        {filtered.map((item) => (
          <RoadmapCard key={item.id} item={item} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-[var(--border)] p-8 text-center text-[var(--muted)]">
          No roadmap items match your filters.
        </p>
      )}
    </div>
  );
}
