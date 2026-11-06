// src/app/products/ProductGrid.tsx
import Products from "@/app/products/page";
import { Product } from "@/app/services/home.interface";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
      {products.map((product) => (
        <Products key={product._id} prod={product} />
      ))}
    </div>
  );
}
