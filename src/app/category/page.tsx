import getAllCategoiers from "../services/category.services";


export default async function Categories() {
  const categories = await getAllCategoiers();

  return (
    <div className="container   w-11/12">
      
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 my-10 md:mx-0 mx-1">
        {categories.map((category) => (
          <div
            className="bg-white border border-gray-200/80 rounded-xl shadow-2xl justify-between flex flex-col px-10 text-center py-2"
            key={category._id}
          >
            <img
              src={category.image}
              alt={category.name}
              className="aspect-square w-full  object-cover rounded-full"
            />
            <p className="  font-bold text-[13px]">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
