import { AllCategories, Daum } from "./category.interface";
import { Category } from "./home.interface";

export default async function getAllCategoiers(): Promise<Category[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,
    {
      cache: "force-cache",
      next: {
        revalidate: 6660,
      },
    },
  );
  

   if (!res.ok) {
     throw new Error("Failed to fetch categories");
   }

  const response: AllCategories = await res.json();


  return response.data;
}
