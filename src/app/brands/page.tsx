import { connection } from "next/server";
import HeroSlider from "@/components/HeroSlider/HeroSlider";
import getAllBrands from "../services/brands.services";

export default async function BrandsPage() {
  await connection();

  const brandData = await getAllBrands();

  return (
    <>
      <HeroSlider />
      <main className="container mx-auto grid grid-cols-2 gap-4 rounded-2xl px-4 py-6 shadow-2xl sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {brandData.map((brand) => (
          <div
            key={brand._id}
            className="flex flex-col items-center rounded-lg border border-gray-200/40 p-4 shadow-2xl"
          >
            <img
              src={brand.image}
              alt={brand.name}
              className="h-24 w-full object-contain"
            />
            <p className="mt-2 text-center">{brand.name}</p>
          </div>
        ))}
      </main>
    </>
  );
}
