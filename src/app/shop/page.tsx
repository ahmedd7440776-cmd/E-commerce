

import { connection } from "next/server";

import HeroSlider from "@/components/HeroSlider/HeroSlider";
import { getAllProducts } from "@/app/services/home.services";
import getAllCategoiers from "@/app/services/category.services";
import getAllBrands from "@/app/services/brands.services";
import ShopCatalog from "@/components/ProductGrid/ShopCatalog";
import { getUserToken } from "@/lib/MyUtil";

export default async function ShopPage() {
  await connection();
  const [products, categories, brands] = await Promise.all([
    getAllProducts(),
    getAllCategoiers(),
    getAllBrands(),
  ]);
  
  console.log(  'use data jjja',  await getUserToken() )
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