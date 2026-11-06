import { AwardIcon } from "lucide-react";
import { AllProductsResponse, Brand } from "./home.interface";
import { AllBarandsResponse } from "./brands.interface";

export default async function getAllBrands(): Promise<Brand[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands`, 
    {cache:'force-cache',
    next: { revalidate: 6660 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch brands");
  }
  const response: AllBarandsResponse = await res.json();

  // console.log(response.data);

  return response.data;
}
