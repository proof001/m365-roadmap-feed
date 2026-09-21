"use client";

import { useMemo, useState } from "react";
import { filterRoadmapItems, type RoadmapFilters } from "@/lib/filters";
import { computeRoadmapStats } from "@/lib/stats";
import type { RoadmapItem } from "@/lib/types";
import { RoadmapRow } from "@/components/RoadmapRow";

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

  const stats = useMemo(() => computeRoadmapStats(items), [items]);

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
    <div>
      <div className="stats" aria-label="Summary statistics">
        <div className="slab stat s1">
          <b>{stats.itemCount.toLocaleString("en-US")}</b>
          <span>items tracked</span>
        </div>
        <div className="slab stat s2">
          <b>{stats.productCount.toLocaleString("en-US")}</b>
          <span>products</span>
        </div>
        <div className="slab stat s3">
          <b>{stats.rollingOutCount.toLocaleString("en-US")}</b>
          <span>rolling out</span>
        </div>
        <div className="slab stat s4">
          <b>{stats.previewCount.toLocaleString("en-US")}</b>
          <span>with preview date</span>
        </div>
      </div>

      <section className="slab filters-panel" aria-label="Filters">
        <div className="controls">
          <input
            type="search"
            className="control-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="search: teams, copilot, exchange…"
            aria-label="Search roadmap"
          />
          <select
            className="control-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            aria-label="Filter by status"
          >
            <option value="">all statuses</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        <div className="product-row">
          <select
            className="control-select min-w-0 flex-1"
            value={productPicker}
            onChange={(e) => setProductPicker(e.target.value)}
            aria-label="Add product filter"
          >
            <option value="">add product filter…</option>
            {products.map((p) => (
              <option key={p} value={p} disabled={selectedProducts.includes(p)}>
                {p}
              </option>
            ))}
          </select>
          <button type="button" className="control-btn" onClick={addProduct}>
            add
          </button>
          {hasActiveFilters ? (
            <button
              type="button"
              className="control-btn control-btn-ghost"
              onClick={clearFilters}
            >
              clear filters
            </button>
          ) : null}
        </div>

        {selectedProducts.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedProducts.map((p) => (
              <button
                key={p}
                type="button"
                className="tag tag-filter"
                onClick={() => removeProduct(p)}
                title="Remove filter"
              >
                {p} ×
              </button>
            ))}
          </div>
        )}
      </section>

      <p className="result-meta">
        showing {filtered.length.toLocaleString("en-US")} of{" "}
        {items.length.toLocaleString("en-US")} · newest modified first
      </p>

      {filtered.length > 0 ? (
        <table className="roadmap-table">
          <thead>
            <tr>
              <th>title</th>
              <th>status</th>
              <th className="hide-s">products</th>
              <th className="hide-s">dates</th>
              <th>updated</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <RoadmapRow key={item.id} item={item} />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="slab empty-slab">no roadmap items match your filters.</div>
      )}
    </div>
  );
}
