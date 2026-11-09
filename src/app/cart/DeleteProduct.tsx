'use client'

import AppButton from '@/components/AppButton/AppButton'
import { Trash2 } from 'lucide-react';
import { CartResponse } from '../services/addToUserCart.interface';
import React, { useContext } from 'react';
import handleDeleteProduct from './updatacart.action';
import { toast } from '@/components/ui/toast';
import { CartCountProvider } from '@/context/cartContext/cartContext';

export default function DeleteProduct({ title, productId }:{title:string,productId:string}) {
const {setCount} =useContext(CartCountProvider)
  function removeProduct() {
   toast.promise( handleDeleteProduct(productId),{
    loading:'Deleteing item...',
    success:(data)=>{

         setCount(data.numOfCartItems)
         return data.message
    },
    error: 'Can not remove item?!'
   })
  }

  return (
    <AppButton
      onClick={removeProduct}
      variant="outline"
      size="icon"
      className="size-8 shrink-0 rounded-lg border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
      aria-label={`Remove ${title}`}
    >
      <Trash2 className="size-4" />
    </AppButton>
  );
}