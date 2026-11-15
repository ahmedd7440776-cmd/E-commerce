"use client";

import { useMemo, useState } from "react";

import type { Product } from "@/app/services/home.interface";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

type CategoryOption = {
  _id: string;
  name: string;
};

export default function ShopProductFilter({
  products,
  categories,
}: {
  products: Product[];
  categories: CategoryOption[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") return products;

    return products.filter(
      (product) => product.category?._id === selectedCategory,
    );
  }, [products, selectedCategory]);

  return (
    <>
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <label htmlFor="shop-category" className="font-medium">
          Filter by category
        </label>

        <select
          id="shop-category"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
          className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-900 sm:max-w-xs"
        >
          <option value="all">All categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
          No products found in this category.
        </p>
      )}
    </>
  );
}
