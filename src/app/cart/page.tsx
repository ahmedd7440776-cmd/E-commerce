import { getLoggedUserCart } from "@/components/AddToCart/addToCart.action";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight, LockKeyhole, ShieldCheck, Tag, Truck } from "lucide-react";
import UpdataCartCount from "./UpdataCartCount";
import Link from "next/link";
import DeleteProduct from "./DeleteProduct";
import { Suspense } from "react";
import DeleteAllCartProducts from "./deleteAllCartProducts";
import ApplyCoupon from "./ApplyCoupon";

async function CartContent() {
  const {
    numOfCartItems,
    cartId,
    data: { products, totalCartPrice, },
  } = await getLoggedUserCart();

  return (
    <main className="mx-auto w-full max-w-5xl px-3 py-5 sm:px-4 sm:py-8">
      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_328px] lg:gap-5">
        {numOfCartItems === 0 ? (
          <>
            <div className="flex flex-col items-center">
              <h2 className="capitalize text-green-900 font-bold">
                Your cart is embty right now check our products{" "}
              </h2>

              <div className="flex flex-row items-center gap-2">
                <span>
                  <Link
                    className="text-green-700 text-base font-bold"
                    href="/shop"
                  >
                    Shop now
                  </Link>
                </span>
                <ArrowRight className="w-4 h-4 text-center text-green-700" />
              </div>
            </div>
          </>
        ) : (
          <section className="min-w-0 space-y-3 ">
            {products.map((item) => (
              <Card
                key={item._id}
                className="rounded-xl border-slate-200 shadow-sm"
              >
                <CardContent className="grid grid-cols-[72px_minmax(0,1fr)] gap-x-3 gap-y-3 p-3 sm:grid-cols-[88px_minmax(0,1fr)_auto] sm:items-center sm:gap-x-4 sm:p-4">
                  {/* Product image and stock status */}
                  <div className="relative row-span-2 self-start sm:row-span-1">
                    <div className="grid size-[72px] place-items-center overflow-hidden rounded-lg border border-slate-100 bg-white p-1.5 sm:size-[88px] sm:p-2">
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

                  {/* Product information */}
                  <div className="min-w-0 pt-1 sm:pt-0">
                    <h2 className="line-clamp-2 text-sm font-bold text-slate-900">
                      {item.product.title}
                    </h2>

                    <div className="mt-2">
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-medium text-green-700 hover:bg-green-50">
                        {item.product.category?.name ?? "Fashion"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-extrabold text-green-600">
                      {item.price.toLocaleString()} EGP{" "}
                      <span className="text-[10px] font-normal text-slate-400">
                        per unit
                      </span>
                    </p>
                  </div>

                  {/* Quantity controls and remove button */}
                  <div className="col-start-2 flex  justify-center items-center gap-2 sm:col-start-2">
                    <UpdataCartCount
                      productId={item.product._id}
                      count={item.count}
                      title={item.product.title}
                    />
                    {/* <Button
                    variant="outline"
                    size="icon"
                    className="size-8 shrink-0 rounded-lg border-red-200 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                    aria-label={`Remove ${item.product.title}`}
                  >
                    <Trash2 className="size-4" />
                  </Button> */}

                    <DeleteProduct
                      productId={item.product._id}
                      title={item.product.title}
                    />
                    {/* On mobile the total sits below the controls.
              On larger screens it moves to the right column. */}
                    <div className="ml-auto text-right sm:hidden">
                      <p className="text-[9px] text-slate-400">Total</p>
                      <p className="text-sm font-extrabold leading-tight text-slate-900">
                        {(item.price * item.count).toLocaleString()}
                        <span className="text-[9px] font-medium text-slate-400">
                          EGP
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Total on the right, as in the reference photo */}
                  <div className="hidden text-right sm:col-start-3 justify-between   sm:row-span-2 sm:flex sm:flex-row gap-1 items-center sm:justify-center">
                    <p className=" text-slate-500">Total:</p>
                    <p className="font-bold">
                      {" "}
                      {(item.price * item.count).toLocaleString()}{" "}
                    </p>
                    <p className="text-green-500 font-bold">EGP</p>
                  </div>
                </CardContent>
              </Card>
            ))}

            <DeleteAllCartProducts />
          </section>
        )}

        <Card className="overflow-hidden rounded-xl border-slate-200 shadow-sm lg:sticky lg:top-30">
          <CardHeader className="bg-green-600 px-4 py-3 text-white">
            <h2 className="flex items-center gap-2 text-sm font-bold">
              <LockKeyhole className="size-4" />
              Order Summary
            </h2>
            <p className="text-[10px]">{numOfCartItems} items in your cart</p>
          </CardHeader>

          <CardContent className="space-y-4 p-4">
            <div className="flex items-center gap-3 rounded-lg bg-green-50 p-3 text-green-700">
              <span className="grid size-8 shrink-0 place-items-center rounded-full bg-green-100">
                <Truck className="size-4" />
              </span>
              <div className="text-[10px] leading-4">
                <p className="font-bold">Free Shipping!</p>
                <p>You qualify for free delivery</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between gap-3 text-slate-600">
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
                  {totalCartPrice.toLocaleString()}{" "}
                  <span className="text-[10px] font-medium text-slate-400">
                    EGP
                  </span>
                </span>
              </div>
            </div>

            {/* <Button
              variant="outline"
              className="h-9 w-full border-dashed text-xs text-slate-600"
            >
              <Tag className="mr-2 size-3.5" />
              Apply Promo Code
            </Button> */}

            <ApplyCoupon />

            <Button className="h-10 w-full bg-green-600 text-xs font-bold text-white hover:bg-green-700">
              <LockKeyhole className="mr-2 size-4" />

              {/*  send the cart id in url and get by [id] parmas and dustruct it (easy)  */}

              <Link href={`/payment/${cartId}`}>Secure Checkout</Link>
            </Button>

            <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[9px] text-slate-500">
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-green-600" />
                Secure Payment
              </span>
              <span className="hidden text-slate-300 sm:inline">|</span>
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

export default function page() {
  return (
    <Suspense
      fallback={
        <p className="p-8 text-center text-green-800">Loading your cart....</p>
      }
    >
      <CartContent />
    </Suspense>
  );
}
