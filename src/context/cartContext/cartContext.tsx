"use client";
import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action";
import React, {
  createContext,
  useEffect,
  useState,
} from "react";

interface CartContextType {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
export const CartCountProvider = createContext<CartContextType>({
  count: 0,
  setCount: () => {},
});

export default function CartContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setCount] = useState(0);
  //   (better useeffet down bloiw)
  //   useEffect(() => {
  //     getLoggedUserCart().then((data) => setCount(data.numOfCartItems));
  //   }, []);

  useEffect(() => {
    const fetchcartData = async () => {
      try {
        const data = await getLoggedUserCart();
        setCount(data.numOfCartItems);
      } catch (error) {
        window.alert(error);
      }
    };
    fetchcartData();
  }, []);

  return (
    <>
      <CartCountProvider value={{ count, setCount }}>
        {children}
      </CartCountProvider>
    </>
  );
}