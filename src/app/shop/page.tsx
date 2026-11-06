// // src/app/shop/page.tsx
// import HeroSlider from "@/components/HeroSlider/HeroSlider";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import { getAllProducts } from "@/app/services/home.services";

// export default async function ShopPage() {
//   const products = await getAllProducts();

//   return (
//     <main className="container w-full mx-auto px-4 py-6">
//       <HeroSlider/>
//       <h1 className="my-6 text-2xl font-bold">Shop</h1>
//       <ProductGrid products={products} />
//     </main>
//   );
// }



// src/app/shop/page.tsx
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { getAllProducts } from "@/app/services/home.services";

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSlider />

      <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="my-6 text-2xl font-bold">Shop</h1>
        <ProductGrid products={products} />
      </section>
    </main>
  );
}