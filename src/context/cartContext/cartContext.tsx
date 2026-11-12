// "use client";
// import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action";
// import React, {
//   createContext,
//   useEffect,
//   useState,
// } from "react";

// interface CartContextType {
//   count: number;
//   setCount: React.Dispatch<React.SetStateAction<number>>;
// }
// export const CartCountProvider = createContext<CartContextType>({
//   count: 0,
//   setCount: () => {},
// });

// export default function CartContext({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [count, setCount] = useState(0);
//   //   (better useeffet down bloiw)
//   //   useEffect(() => {
//   //     getLoggedUserCart().then((data) => setCount(data.numOfCartItems));
//   //   }, []);

//   useEffect(() => {
//     const fetchcartData = async () => {
//       try {
//         const data = await getLoggedUserCart();
//         setCount(data.numOfCartItems);
//       } catch (error) {
//         window.alert(error);
//       }
//     };
//     fetchcartData();
//   }, []);

//   return (
//     <>
//       <CartCountProvider value={{ count, setCount }}>
//         {children}
//       </CartCountProvider>
//     </>
//   );
// }

"use client";

import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";

import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action";
import { getWishlistProductIds } from "@/app/wishlist/wishlist.action";

interface CartContextType {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  wishlistIds: string[];
  setWishlistIds: Dispatch<SetStateAction<string[]>>;
}

export const CartCountProvider = createContext<CartContextType>({
  count: 0,
  setCount: () => {},
  wishlistIds: [],
  setWishlistIds: () => {},
});

export default function CartContext({ children }: { children: ReactNode }) {
  const [count, setCount] = useState(0);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    async function loadShoppingState() {
      try {
        const [cart, wishlistProductIds] = await Promise.all([
          getLoggedUserCart(),
          getWishlistProductIds(),
        ]);

        setCount(cart.numOfCartItems);
        setWishlistIds(wishlistProductIds);
      } catch (error) {
        console.error("Could not load cart or wishlist:", error);
      }
    }

    loadShoppingState();
  }, []);

  return (
    <CartCountProvider value={{ count, setCount, wishlistIds, setWishlistIds }}>
      {children}
    </CartCountProvider>
  );
}