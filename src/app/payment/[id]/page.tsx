// import React from "react";
// import CheckoutForm from "../PaymentForm";
// import PaymentForm from "../PaymentForm";
// import { redirect } from "next/navigation";

// export default async function page({params}:{params:Promise<{id:string}>}) {

//   const {id} = await params
//     // redirect('/')
//   return (
//     <>
//       <h1 className="text-green-600 text-3xl text-center">
//         Green Shop Payment
//       </h1>
//       <PaymentForm id={id}/>
//     </>
//   );
// }

// import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action";
// import PaymentForm from "../PaymentForm";

// export default async function Page({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const { id } = await params;

//   const {
//     numOfCartItems,
//     data: { products, totalCartPrice },
//   } = await getLoggedUserCart();

//   return (
//     <PaymentForm
//       id={id}
//       products={products}
//       numOfCartItems={numOfCartItems}
//       totalCartPrice={totalCartPrice}
//     />
//   );
// }




import { Suspense } from "react"
import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action"
import PaymentForm from "../PaymentForm"

type PageProps = {
  params: Promise<{ id: string }>
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-green-800">
          Loading checkout...
        </div>
      }
    >
      <CheckoutContent params={params} />
    </Suspense>
  )
}

async function CheckoutContent({ params }: PageProps) {
  const { id } = await params

  const {
    numOfCartItems,
    data: { products, totalCartPrice },
  } = await getLoggedUserCart()

  return (
    <PaymentForm
      id={id}
      products={products}
      numOfCartItems={numOfCartItems}
      totalCartPrice={totalCartPrice}
    />
  )
}