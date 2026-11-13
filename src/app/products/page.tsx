
import { connection } from "next/server";

import { getAllProducts } from "@/app/services/home.services";
import ProductGrid from "@/components/ProductGrid/ProductGrid";

export default async function ProductsPage() {
  await connection();

  const products = await getAllProducts();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">All Products</h1>
      <ProductGrid products={products.filter(Boolean)} />
    </main>
  );
}