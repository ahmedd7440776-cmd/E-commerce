// "use server";

// export async function searchProducts(keyword: string) {
//   const trimmedKeyword = keyword.trim();

//   if (trimmedKeyword.length < 2) {
//     return [];
//   }

//   const url = new URL("/api/v1/products", process.env.NEXT_PUBLIC_BASE_URL);
//   url.searchParams.set("keyword", trimmedKeyword);
//   url.searchParams.set("limit", "6");

//   const response = await fetch(url, { cache: "no-store" });

//   if (!response.ok) {
//     throw new Error("Could not search products.");
//   }
// const result = await response.json();

// console.log("Search URL:", url.toString());
// console.log("Search response:", result);

// return Array.isArray(result.data) ? result.data : [];
// }

"use server";

type ProductSearchResult = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
  description?: string;
};

export async function searchProducts(
  keyword: string,
): Promise<ProductSearchResult[]> {
  const term = keyword.trim().toLowerCase();
  if (term.length < 2) return [];

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not set");

  const matches: ProductSearchResult[] = [];
  let page = 1;
  let numberOfPages = 1;

  // Read pages until we find 6 matches or reach the end of the catalog.
  while (page <= numberOfPages && matches.length < 6) {
    const url = new URL("/api/v1/products", baseUrl);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", "100");

    const response = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error("Could not load products for search.");
    }

    const result = await response.json();
    const products = result.data ?? [];
    numberOfPages = result.metadata?.numberOfPages ?? 1;

    for (const product of products) {
      const searchableText =
        `${product.title ?? ""} ${product.description ?? ""}`.toLowerCase();

      if (searchableText.includes(term)) {
        matches.push({
          _id: product._id,
          title: product.title,
          imageCover: product.imageCover,
          price: product.price,
        });

        if (matches.length === 6) break;
      }
    }

    page += 1;
  }

  return matches;
}
