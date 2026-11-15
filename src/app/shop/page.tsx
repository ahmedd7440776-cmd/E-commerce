// import HeroSlider from "@/components/HeroSlider/HeroSlider";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import { getAllProducts } from "@/app/services/home.services";
// import { connection } from "next/server";

// export default async function ShopPage() {
//     await connection();
//   const products = await getAllProducts();

//   return (
//     <main className="min-h-screen w-full overflow-x-hidden">
//       <HeroSlider />

//       <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
//         <h1 className="my-6 text-2xl font-bold">Shop</h1>
//         <ProductGrid products={products} />
//       </section>
//     </main>
//   );
// }

// import { connection } from "next/server";

// import HeroSlider from "@/components/HeroSlider/HeroSlider";
// import ShopProductFilter from "@/components/ProductGrid/ShopProductFilter";
// import { getAllProducts } from "@/app/services/home.services";
// import getAllCategoiers from "@/app/services/category.services";

// export default async function ShopPage() {
//   await connection();

//   const [products, categories] = await Promise.all([
//     getAllProducts(),
//     getAllCategoiers(),
//   ]);

//   return (
//     <main className="min-h-screen w-full overflow-x-hidden">
//       <HeroSlider />

//       <section className="w-full px-4 py-6 sm:px-6 lg:px-8">
//         <h1 className="my-6 text-2xl font-bold">Shop</h1>
//         <ShopProductFilter
//           products={products.filter(Boolean)}
//           categories={categories}
//         />
//       </section>
//     </main>
//   );
// }

import { connection } from "next/server";

import HeroSlider from "@/components/HeroSlider/HeroSlider";
import { getAllProducts } from "@/app/services/home.services";
import getAllCategoiers from "@/app/services/category.services";
import getAllBrands from "@/app/services/brands.services";
import ShopCatalog from "@/components/ProductGrid/ShopCatalog";

export default async function ShopPage() {
  await connection();

  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getAllCategoiers(),
    getAllBrands(),
  ]);

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <HeroSlider />

      <section className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="my-6 text-2xl font-bold">Shop</h1>
        <ShopCatalog
          products={products.filter(Boolean)}
          categories={categories}
          brands={brands}
        />
      </section>
    </main>
  );
}