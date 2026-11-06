"use client";

import React, { useState } from "react";
import AppButton from "../AppButton/AppButton";
import { Product } from "@/app/services/home.interface";
import Products from "@/app/products/page";
import { Plus } from "lucide-react";
import { error, log } from "node:console";
import { addToUserCart } from "./addToCart.action";
import { toast } from "../ui/toast";

export default function AddToCart({ prod }: { prod: Product }) {
  //  prod comes from products page as a prob  to get (quantity,title)
  const { quantity, title, _id: productId } = prod;
  const [isLoading, setIsLoading] = useState(false);

  async function handleAddToCart() {
    // const { message, numOfCartItems, status, data: { products, _id, totalCartPrice },
    // } = await addToUserCart(productId);

    if (isLoading) return;
    setIsLoading(true);

    try {
      await toast.promise(addToUserCart(productId), {
        loading: "Adding to cart....",
        success: (response) => {
          return response.message || "product added successfuly to your cart!";
        },
        error: "Can not add to cart",
      });
    } catch (error) {
      console.log(error);
      window.alert(error)
      
    }
    finally{
      setIsLoading(false)
    }
  }

  return (
    <>
      <AppButton
        onClick={handleAddToCart}
        aria-label={`Add ${title} to cart`}
        disabled={quantity === 0 || isLoading}
        className="shadow-xl cursor-pointer duration-50 ease-in-out active:scale-105 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-green-600 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
      >
        <Plus className="h-6 w-6" />
      </AppButton>
    </>
  );
}
