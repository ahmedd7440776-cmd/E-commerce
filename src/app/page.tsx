// import HeroSlider from "@/components/HeroSlider/HeroSlider";
// import { getAllProducts } from "./services/home.services";
// import Products from "@/app/products/page";
// import Categories from "./category/page";
// import PromoBanners from "@/components/PromoBanners/PromoBanners ";
// import getAllCategoiers from "./services/category.services";
// import { lazy, Suspense } from "react";

// const LazyLoadingpage = lazy(() => import("@/components/slider/Slider"));

// export default async function Home() {
//   const productsData = await getAllProducts();
//   const categories = await getAllCategoiers();
//   const imageList = categories.map((e) => e.image);

//   return (
//     <div className="w-12/12 bg-green-800">
//       <HeroSlider />
//       <Categories />
//       <Suspense fallback={<h1 className="text-center text-6xl">loading...</h1>}>
//         <LazyLoadingpage imageList={imageList} />
//       </Suspense>
//       <PromoBanners />
//       <div className="">
//         <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-10 ">
//           {productsData.map((e) => {
//             return <Products key={e._id} prod={e} />;
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

/* <Slider imageList={imageList} />  */

import HeroSlider from "@/components/HeroSlider/HeroSlider";
import { getAllProducts } from "./services/home.services";
import Products from "@/app/products/page";
import Categories from "./category/page";
import PromoBanners from "@/components/PromoBanners/PromoBanners ";
import getAllCategoiers from "./services/category.services";
import { lazy, Suspense } from "react";
   
const LazyLoadingpage = lazy(() => import("@/components/slider/Slider"));

export default async function Home() {
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
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {productsData.map((e) => (
            <Products key={e._id} prod={e} />
          ))}
        </div>
        
      </section>
    </main>
  );
}