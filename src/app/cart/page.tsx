// import { addProductToUserCart } from "@/components/AddToCart/addToCart.action";
// import AppButton from "@/components/AppButton/AppButton";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { getUserToken } from "@/lib/MyUtil";
// import { Input } from "@base-ui/react";

// export default async function page() {
//   const {
//     cartId,
//     numOfCartItems,
//     data: { products, totalCartPrice },
//   } = await addProductToUserCart();
//   return (
//     <>
//       <div className="text-center w-1/2 mx-auto p-10 border border-xl">
//         <p>total price {totalCartPrice}</p>
//         <p>number of cart {numOfCartItems}</p>
//       </div>

//       <Table className="w-3xl mx-auto">
//         <TableCaption>A list of your recent invoices.</TableCaption>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="text-center">products</TableHead>
//             <TableHead className="text-center">price</TableHead>
//             <TableHead className="text-center">quantity</TableHead>
//             <TableHead className=" text-center">action</TableHead>
//           </TableRow>
//         </TableHeader>

//         <TableBody>
//           {products.map((e) => (
//             <TableRow key={e._id}>
//               <TableCell className="font-medium text-center w-30">
//                 <img src={e.product.imageCover} className="w-full" alt="" />
//               </TableCell>
//               <TableCell className="text-center">{e.price}</TableCell>
//               <TableCell className="text-center">{e.count}</TableCell>
//               <TableCell className="text-center">

//                 <div className="">
//                   <div>
// <AppButton>+</AppButton>
// <Input value={e.count} className='w-10'/>
// <AppButton >-</AppButton>
//                   </div>
//                   <AppButton variant='destructive'>remove</AppButton>
//                 </div>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TableCell colSpan={3}>Total</TableCell>
//             <TableCell className="text-right">$2,500.00</TableCell>
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </>
//   );
// }

import { addProductToUserCart } from "@/components/AddToCart/addToCart.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge, LockKeyhole, ShieldCheck, Tag, Trash2, Truck } from "lucide-react";

export default async function Page() {
  const {
    numOfCartItems,
    data: { products, totalCartPrice },
  } = await addProductToUserCart();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-8">
      <div className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_328px]">
        <section className="space-y-3">
          {products.map((item) => (
            <Card
              key={item._id}
              className="rounded-xl border-slate-200 shadow-sm"
            >
              <CardContent className="grid grid-cols-[88px_minmax(0,1fr)_auto] gap-4 p-3 sm:p-4">
                <div className="relative">
                  <div className="grid size-[88px] place-items-center overflow-hidden rounded-lg border border-slate-100 bg-white p-2">
                    <img
                      src={item.product.imageCover}
                      alt={item.product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-green-500 px-2 py-0.5 text-[9px] font-semibold text-white">
                    ✓ In Stock
                  </span>
                </div>

                <div className="min-w-0 pt-1">
                  <h2 className="line-clamp-2 text-sm font-bold text-slate-900">
                    {item.product.title}
                  </h2>

                  <div className="mt-2">
                    <Badge className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 hover:bg-green-50">
                      {item.product.category?.name ?? "Fashion"}
                    </Badge>
                  </div>

                  <p className="mt-2 text-sm font-extrabold text-green-600">
                    {item.price.toLocaleString()} EGP
                    <span className="text-[10px] font-normal text-slate-400">
                      per unit
                    </span>
                  </p>

                  <div className="mt-3 inline-flex h-8 items-center rounded-lg border border-slate-200 p-0.5">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-7 rounded-md text-slate-500"
                      aria-label={`Decrease ${item.product.title} quantity`}
                    >
                      −
                    </Button>
                    <span className="w-8 text-center text-xs font-bold">
                      {item.count}
                    </span>
                    <Button
                      size="icon"
                      className="size-7 rounded-md bg-green-600 text-white hover:bg-green-700"
                      aria-label={`Increase ${item.product.title} quantity`}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex items-end gap-2 self-end">
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400">Total</p>
                    <p className="text-base font-extrabold leading-none text-slate-900">
                      {(item.price * item.count).toLocaleString()}{" "}
                      <span className="text-[9px] font-medium text-slate-400">
                        EGP
                      </span>
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-8 rounded-lg border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                    aria-label={`Remove ${item.product.title}`}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        <Card className="overflow-hidden sticky top-30 right-5 rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="bg-green-600 px-4 py-3 text-white">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <LockKeyhole className="size-4" />
              Order Summary
            </h2>
            <p className="text-[10px]">{numOfCartItems} items in your cart</p>
          </CardHeader>

          <CardContent className="space-y-4 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 text-green-700">
              <span className="grid size-8 place-items-center rounded-full bg-green-100">
                <Truck className="size-4" />
              </span>
              <div className="text-[10px] leading-4">
                <p className="font-bold">Free Shipping!</p>
                <p>You qualify for free delivery</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold text-slate-900">
                  {totalCartPrice.toLocaleString()} EGP
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-semibold text-green-600">FREE</span>
              </div>

              <div className="border-t border-dashed border-slate-200" />

              <div className="flex items-center justify-between font-bold">
                <span>Total</span>
                <span className="text-lg">
                  {totalCartPrice.toLocaleString()}
                  <span className="text-[10px] font-medium text-slate-400">
                    EGP
                  </span>
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="h-9 w-full border-dashed text-xs text-slate-600"
            >
              <Tag className="mr-2 size-3.5" />
              Apply Promo Code
            </Button>

            <Button className="h-10 w-full bg-green-600 text-xs font-bold text-white hover:bg-green-700">
              <LockKeyhole className="mr-2 size-4" />
              Secure Checkout
            </Button>

            <div className="flex justify-center gap-3 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-green-600" />
                Secure Payment
              </span>
              <span className="text-slate-300">|</span>
              <span className="flex items-center gap-1">
                <Truck className="size-3 text-blue-500" />
                Fast Delivery
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}