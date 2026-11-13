
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import Categories from "./category/page";
import PromoBanners from "@/components/PromoBanners/PromoBanners ";
import getAllCategoiers from "./services/category.services";
import { lazy, Suspense } from "react";
import { connection } from "next/server";
import { getAllProducts } from "./services/home.services";
import ProductsPage from "./products/page";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
   
const LazyLoadingpage = lazy(() => import("@/components/slider/Slider"));

export default async function Home() {
    await connection();
  const productsData = await getAllProducts();
  const categories = await getAllCategoiers();
  const imageList = categories.map((e) => e.image);

  return (
    <main className="min-h-screen w-full overflow-x-hidden ">
      <HeroSlider />

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Categories />
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <h1 className="py-8 text-center text-2xl font-bold text-white sm:text-4xl">
              Loading...
            </h1>
          }
        >
          <LazyLoadingpage imageList={imageList} />
        </Suspense>
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <PromoBanners />
      </section>
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <ProductGrid products={productsData} />
      </section>
    </main>
  );
}