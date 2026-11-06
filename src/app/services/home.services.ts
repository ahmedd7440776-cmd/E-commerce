import { AllProductsResponse, Product } from "./home.interface";

export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products`,
    {
      cache: "force-cache",
      next: {
        revalidate: 6660,
      },
    },
  );
  const data: AllProductsResponse = await response.json();
  
  

  return data.data;
}
