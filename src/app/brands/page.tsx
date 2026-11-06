

import HeroSlider from "@/components/HeroSlider/HeroSlider";
import getAllBrands from "../services/brands.services";

export default async function BrandsPage() {
  const brandData = await getAllBrands();

  return (
    
    <>
          <HeroSlider/>
    <main className="container mx-auto shadow-2xl grid grid-cols-2 rounded-2xl gap-4 px-4 py-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
    
      {brandData.map((brand) => (
        <div
          key={brand._id}
          className="flex flex-col shadow-2xl items-center rounded-lg  border border-gray-200/40 p-4"
        >
          <img
            src={brand.image}
            alt={brand.name}
            className="h-24 w-full object-contain"
          />
          <p className="mt-2 text-center">{brand.name}</p>
        </div>
      ))}
    </main></>
  );
}