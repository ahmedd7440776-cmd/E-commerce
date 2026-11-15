"use client";

import { useMemo, useState } from "react";
import { LayoutGrid, List } from "lucide-react";

import type { Product } from "@/app/services/home.interface";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

type FilterOption = {
  _id: string;
  name: string;
};

export default function ShopCatalog({
  products,
  categories,
  brands,
}: {
  products: Product[];
  categories: FilterOption[];
  brands: FilterOption[];
}) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filteredProducts = useMemo(() => {
    const min = minPrice === "" ? 0 : Number(minPrice);
    const max = maxPrice === "" ? Infinity : Number(maxPrice);

    return products.filter((product) => {
      const price = product.priceAfterDiscount ?? product.price;

      const categoryMatches =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category?._id ?? "");

      const brandMatches =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand?._id ?? "");

      return categoryMatches && brandMatches && price >= min && price <= max;
    });
  }, [products, selectedCategories, selectedBrands, minPrice, maxPrice]);

  function toggleCategory(id: string) {
    setSelectedCategories((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  function toggleBrand(id: string) {
    setSelectedBrands((current) =>
      current.includes(id)
        ? current.filter((value) => value !== id)
        : [...current, id],
    );
  }

  function clearFilters() {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
  }

  const hasFilters =
    selectedCategories.length > 0 ||
    selectedBrands.length > 0 ||
    minPrice !== "" ||
    maxPrice !== "";

  const priceShortcuts = [
    { label: "Under 500", max: "500" },
    { label: "Under 1K", max: "1000" },
    { label: "Under 5K", max: "5000" },
    { label: "Under 10K", max: "10000" },
  ];

  return (
    <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
      <aside className="h-fit rounded-xl border border-gray-200 bg-white p-5 text-gray-900 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold">Filters</h2>
          {hasFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-green-700 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>

        <section className="border-b border-gray-200 pb-5">
          <h3 className="mb-3 text-sm font-bold">Categories</h3>
          <div className="max-h-52 space-y-2 overflow-y-auto">
            {categories.map((category) => (
              <label
                key={category._id}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category._id)}
                  onChange={() => toggleCategory(category._id)}
                  className="size-4 accent-green-600"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </section>

        <section className="border-b border-gray-200 py-5">
          <h3 className="mb-3 text-sm font-bold">Price Range</h3>

          <div className="grid grid-cols-2 gap-2">
            <label className="text-xs text-gray-600">
              Min (EGP)
              <input
                type="number"
                min="0"
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="0"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-green-600"
              />
            </label>

            <label className="text-xs text-gray-600">
              Max (EGP)
              <input
                type="number"
                min="0"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="No limit"
                className="mt-1 h-10 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none focus:border-green-600"
              />
            </label>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {priceShortcuts.map((shortcut) => (
              <button
                key={shortcut.max}
                type="button"
                onClick={() => {
                  setMinPrice("");
                  setMaxPrice(shortcut.max);
                }}
                className={`rounded-full px-3 py-1.5 text-xs ${
                  maxPrice === shortcut.max && minPrice === ""
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {shortcut.label}
              </button>
            ))}
          </div>
        </section>

        <section className="pt-5">
          <h3 className="mb-3 text-sm font-bold">Brands</h3>
          <div className="max-h-52 space-y-2 overflow-y-auto">
            {brands.map((brand) => (
              <label
                key={brand._id}
                className="flex cursor-pointer items-center gap-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand._id)}
                  onChange={() => toggleBrand(brand._id)}
                  className="size-4 accent-green-600"
                />
                <span>{brand.name}</span>
              </label>
            ))}
          </div>
        </section>
      </aside>

      <section className="min-w-0">
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-sm text-gray-600">
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </p>

          <div
            className="flex rounded-lg border border-gray-200 bg-white p-1"
            aria-label="Product layout"
          >
            <button
              type="button"
              onClick={() => setView("grid")}
              aria-label="Grid view"
              aria-pressed={view === "grid"}
              className={`grid size-9 place-items-center rounded-md ${
                view === "grid"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <LayoutGrid className="size-4" />
            </button>

            <button
              type="button"
              onClick={() => setView("list")}
              aria-label="List view"
              aria-pressed={view === "list"}
              className={`grid size-9 place-items-center rounded-md ${
                view === "list"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <List className="size-4" />
            </button>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} view={view} catalog />
        ) : (
          <p className="rounded-xl border border-dashed border-gray-300 p-8 text-center text-gray-600">
            No products match these filters.
          </p>
        )}
      </section>
    </div>
  );
}
