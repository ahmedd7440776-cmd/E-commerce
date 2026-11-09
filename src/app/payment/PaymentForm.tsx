// "use client";
// import { Controller, useForm } from "react-hook-form";
// import { Field, FieldError, FieldLabel } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import AppButton from "@/components/AppButton/AppButton";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { PaymentDataType } from "./py.interface";
// import { cashOrder } from "./py.action";
// import { string } from "zod";
// import { useContext } from "react";
// import { CartCountProvider } from "@/context/cartContext/cartContext";
// import { toast } from "@/components/ui/toast";
// import { useRouter } from "next/navigation";
// export default function PaymentForm({ id }: { id: string }) {
//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues: {
//       details: "",
//       phone: "",
//       city: "",
//       postalCode: "",
//     },
//     mode: "all",
//     // resolver: zodResolver(),
//   });

//   const {setCount} = useContext(CartCountProvider)

// const router = useRouter()
//   async function handleCashPayment(data: PaymentDataType) {
//     const promise = cashOrder(data, id).then((result) => {
//       if (result.status !== "success") {
//         throw new Error(result.message || "Could not place your order");
//       }

//       return result;
//     });

//     toast.promise(promise, {
//       loading: "Placing your order...",
//       success: (result) => {
//         setCount(0);
//         router.push('/')
//         return result.message || "Order placed successfully";
//       },
//       error: (error) =>
//         error instanceof Error ? error.message : "Could not place your order",
//     });

//     try {
//       await promise;
//     } catch {

//     }
//   }

//   function handleOnlinePayment(data: PaymentDataType) {
//     console.log("online", data);
//   }

//   return (
//     <>
//       <form className="flex flex-col gap-6">
//         <Controller
//           name="details"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Address</FieldLabel>
//               <Input
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//                 placeholder="Enter your Address"
//                 autoComplete="off"
//                 type="text"
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="city"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>City</FieldLabel>
//               <Input
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//                 placeholder="Your city"
//                 autoComplete="off"
//                 type="text"
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="phone"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Phone </FieldLabel>
//               <Input
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//                 placeholder="Your phone number"
//                 autoComplete="off"
//                 type="tel"
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />
//         <Controller
//           name="postalCode"
//           control={control}
//           render={({ field, fieldState }) => (
//             <Field data-invalid={fieldState.invalid}>
//               <FieldLabel htmlFor={field.name}>Postalcode</FieldLabel>
//               <Input
//                 {...field}
//                 id={field.name}
//                 aria-invalid={fieldState.invalid}
//                 placeholder="Your postalcode"
//                 autoComplete="off"
//                 type="text"
//               />

//               {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
//             </Field>
//           )}
//         />

//         <div className="gap-3  flex justify-center">
//           <AppButton
//             onClick={handleSubmit(handleCashPayment)}
//             // disabled={isSubmitting}
//             type="button"
//             className="disabled:cursor-not-allowed disabled:bg-green-700 cursor-pointer  bg-green-700 text-white hover:bg-green-500 w-6/12 hover:text-black"
//           >
//             cash
//           </AppButton>

//           <AppButton
//             onClick={handleSubmit(handleOnlinePayment)}
//             type="button"
//             className="bg-red-700 text-white hover:bg-red-500 w-6/12 cursor-pointer hover:text-black"
//           >
//             online
//           </AppButton>
//         </div>
//       </form>
//     </>
//   );
// }

"use client";

import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Banknote,
  CreditCard,
  House,
  Info,
  LockKeyhole,
  MapPin,
  Phone,
  ShieldCheck,
  Truck,
} from "lucide-react";

import { cashOrder } from "./py.action";
import type { PaymentDataType } from "./py.interface";
import { CartCountProvider } from "@/context/cartContext/cartContext";
import AppButton from "@/components/AppButton/AppButton";
import { toast } from "@/components/ui/toast";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type CartProduct = {
  _id: string;
  count: number;
  price: number;
  product: {
    _id: string;
    title: string;
    imageCover: string;
  };
};

type PaymentFormProps = {
  id: string;
  products: CartProduct[];
  numOfCartItems: number;
  totalCartPrice: number;
};

export default function PaymentForm({
  id,
  products,
  numOfCartItems,
  totalCartPrice,
}: PaymentFormProps) {
  const router = useRouter();
  const { setCount } = useContext(CartCountProvider);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<PaymentDataType>({
    mode: "all",
    defaultValues: {
      details: "",
      phone: "",
      city: "",
      postalCode: "",
    },
  });

  async function handleCashPayment(data: PaymentDataType) {
    const promise = cashOrder(data, id).then((result) => {
      if (result.status !== "success") {
        throw new Error(result.message || "Could not place your order");
      }

      return result;
    });

    toast.promise(promise, {
      loading: "Placing your order...",
      success: (result) => {
        setCount(0);
        router.push("/");
        return result.message || "Order placed successfully";
      },
      error: (error) =>
        error instanceof Error ? error.message : "Could not place your order",
    });

    try {
      await promise;
    } catch {
      // The toast displays the error.
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-6">
          <p className="text-xs text-slate-500">
            Home <span className="mx-1">/</span> Cart{" "}
            <span className="mx-1">/</span>
            <span className="font-medium text-slate-900">Checkout</span>
          </p>

          <h1 className="mt-4 flex items-center gap-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            <span className="grid size-10 place-items-center rounded-xl bg-green-600 text-white">
              <LockKeyhole className="size-5" />
            </span>
            Complete Your Order
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Review your items and complete your purchase
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleCashPayment)}
          className="grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_340px]"
        >
          <div className="space-y-4">
            {/* Shipping address */}
            <Card className="overflow-hidden rounded-xl border-slate-200 shadow-sm">
              <CardHeader className="bg-green-700 px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-bold">
                  <House className="size-4" />
                  Shipping Address
                </h2>
                <p className="text-xs text-green-50">
                  Where should we deliver your order?
                </p>
              </CardHeader>

              <CardContent className="space-y-5 p-4 sm:p-5">
                <div className="flex items-start gap-3 rounded-lg border border-green-100 bg-green-50 p-3">
                  <Info className="mt-0.5 size-4 shrink-0 text-blue-600" />
                  <div>
                    <p className="text-xs font-semibold text-blue-700">
                      Delivery Information
                    </p>
                    <p className="text-[11px] text-blue-600">
                      Please enter your address accurately for delivery.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Controller
                    name="city"
                    control={control}
                    rules={{ required: "City is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="city">
                          City <span className="text-red-500">*</span>
                        </FieldLabel>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                          <Input
                            {...field}
                            id="city"
                            aria-invalid={fieldState.invalid}
                            placeholder="e.g. Cairo, Alexandria, Giza"
                            className="h-11 pl-10"
                          />
                        </div>
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />

                  <Controller
                    name="postalCode"
                    control={control}
                    rules={{ required: "Postal code is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="postalCode">
                          Postal Code <span className="text-red-500">*</span>
                        </FieldLabel>
                        <Input
                          {...field}
                          id="postalCode"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter postal code"
                          className="h-11"
                        />
                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                </div>

                <Controller
                  name="details"
                  control={control}
                  rules={{ required: "Street address is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="details">
                        Street Address <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 size-4 text-slate-400" />
                        <textarea
                          {...field}
                          id="details"
                          aria-invalid={fieldState.invalid}
                          placeholder="Street name, building number, floor, apartment..."
                          className="min-h-24 w-full resize-y rounded-md border border-input bg-background py-2 pl-10 pr-3 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^01[0125][0-9]{8}$/,
                      message: "Enter a valid Egyptian phone number",
                    },
                  }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="phone">
                        Phone Number <span className="text-red-500">*</span>
                      </FieldLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        <Input
                          {...field}
                          id="phone"
                          type="tel"
                          inputMode="numeric"
                          aria-invalid={fieldState.invalid}
                          placeholder="01xxxxxxxxx"
                          className="h-11 pl-10"
                        />
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </CardContent>
            </Card>

            {/* Payment method */}
            <Card className="overflow-hidden rounded-xl border-slate-200 shadow-sm">
              <CardHeader className="bg-green-700 px-5 py-4 text-white">
                <h2 className="flex items-center gap-2 font-bold">
                  <CreditCard className="size-4" />
                  Payment Method
                </h2>
                <p className="text-xs text-green-50">
                  Choose how you&apos;d like to pay
                </p>
              </CardHeader>

              <CardContent className="space-y-3 p-4 sm:p-5">
                <div className="flex items-center gap-3 rounded-xl border-2 border-green-500 bg-green-50/50 p-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-green-600 text-white">
                    <Banknote className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-green-800">
                      Cash on Delivery
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Pay when your order arrives at your doorstep
                    </span>
                  </span>
                  <CheckIcon />
                </div>

                {/* Visual option only for now */}
                <div
                  aria-disabled="true"
                  className="flex cursor-not-allowed items-center gap-3 rounded-xl border border-slate-200 p-3 opacity-60"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-100 text-slate-500">
                    <CreditCard className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block text-sm font-bold text-slate-900">
                      Pay Online
                    </span>
                    <span className="mt-1 block text-xs text-slate-500">
                      Secure payment by credit or debit card
                    </span>
                  </span>
                  <span className="text-xs text-slate-500">Coming soon</span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  <ShieldCheck className="size-5 shrink-0 text-green-700" />
                  <div>
                    <p className="text-xs font-semibold text-green-800">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-[11px] text-green-700">
                      Your payment information is protected.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order summary */}
          <Card className="h-fit overflow-hidden rounded-xl border-slate-200 shadow-sm lg:sticky lg:top-6">
            <CardHeader className="bg-green-700 px-5 py-4 text-white">
              <h2 className="flex items-center gap-2 font-bold">
                <LockKeyhole className="size-4" />
                Order Summary
              </h2>
              <p className="text-xs text-green-50">{numOfCartItems} items</p>
            </CardHeader>

            <CardContent className="p-4">
              <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-3 rounded-xl bg-slate-50 p-2.5"
                  >
                    <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border bg-white p-1">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-1 text-xs font-semibold text-slate-900">
                        {item.product.title}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {item.count} × {item.price.toLocaleString()} EGP
                      </p>
                    </div>

                    <p className="shrink-0 text-xs font-bold text-slate-900">
                      {(item.count * item.price).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="my-4 border-t border-slate-200" />

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-3 text-slate-600">
                  <span>Subtotal</span>
                  <span>{totalCartPrice.toLocaleString()} EGP</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span className="flex items-center gap-2">
                    <Truck className="size-4 text-slate-400" />
                    Shipping
                  </span>
                  <span className="font-semibold text-green-600">FREE</span>
                </div>

                <div className="border-t border-slate-200" />

                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Total</span>
                  <span className="text-lg text-green-600">
                    {totalCartPrice.toLocaleString()}{" "}
                    <span className="text-[10px] font-medium text-slate-500">
                      EGP
                    </span>
                  </span>
                </div>
              </div>

              <AppButton
                type="submit"
                disabled={isSubmitting || products.length === 0}
                className="mt-4 w-full bg-green-700 text-white hover:bg-green-600 disabled:cursor-not-allowed"
              >
                <LockKeyhole className="mr-2 size-4" />
                {isSubmitting ? "Placing order..." : "Place Order"}
              </AppButton>

              <div className="mt-4 flex flex-wrap justify-center gap-3 border-t border-slate-100 pt-3 text-[10px] text-slate-500">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="size-3 text-green-600" />
                  Secure
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="size-3 text-blue-500" />
                  Fast Delivery
                </span>
                <span className="bg-orange-500 px-1.5 py-0 text-[9px] hover:bg-orange-500">
                  Easy Returns
                </span>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </main>
  );
}

function CheckIcon() {
  return (
    <span className="grid size-5 place-items-center rounded-full bg-green-600 text-white">
      <span className="text-xs">✓</span>
    </span>
  );
}