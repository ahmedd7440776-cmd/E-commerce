'use client'
import AppButton from '@/components/AppButton/AppButton';
import { Trash2 } from 'lucide-react';
import React, { useContext } from 'react'
import { toast } from '@/components/ui/toast';
import { handleDeleteAllProduct } from './updatacart.action';
import { CartCountProvider } from '@/context/cartContext/cartContext';

export default function DeleteAllCart() {
const {setCount} = useContext(CartCountProvider)
function deleteCart(){
toast.promise(handleDeleteAllProduct(),{
    success:(data)=> {
         setCount(data.numOfCartItems)
         return data.message
    },
    loading:'Clearing the cart ',
    error:(data)=> data.message || 'Could not remove the cart'
});

}


  return (
    <AppButton
      onClick={deleteCart}
      variant="outline"
      className=" shrink-0 rounded-lg cursor-pointer border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
    >
      Clear All <Trash2 />
    </AppButton>
  );
}
