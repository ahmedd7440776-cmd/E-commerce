import { connection } from "next/server";
import getAllCategoiers from "../services/category.services";

export default async function Categories() {
  await connection();

  const categories = await getAllCategoiers();

  return (
    <main className="container mx-auto my-10 w-11/12">
      <div className="mx-1 grid grid-cols-2 gap-4 md:mx-0 md:grid-cols-4 lg:grid-cols-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col justify-between rounded-xl border border-gray-200/80 bg-white px-6 py-3 text-center shadow-2xl sm:px-10"
          >
            <img
              src={category.image}
              alt={category.name}
              className="aspect-square w-full rounded-full object-cover"
            />
            <p className="text-[13px] font-bold">{category.name}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
