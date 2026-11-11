import { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Badge,
  CalendarDays,
  MapPin,
  Package,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { getAllOrdersAction } from "./getAllOrders.action";

type OrderItem = {
  _id: string;
  count: number;
  price: number;
  product?: {
    title?: string;
    imageCover?: string;
  };
};

type Order = {
  _id: string;
  id?: number;
  createdAt: string;
  totalOrderPrice: number;
  shippingPrice?: number;
  taxPrice?: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  shippingAddress?: {
    details?: string;
    phone?: string;
    city?: string;
    postalCode?: string;
  };
  cartItems?: OrderItem[];
};

export default function MyOrdersPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 p-8 text-center text-green-800">
          Loading your orders...
        </main>
      }
    >
      <OrdersContent />
    </Suspense>
  );
}

async function OrdersContent() {
  const response = await getAllOrdersAction();

  const orders: Order[] = Array.isArray(response)
    ? response
    : Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response?.data?.data)
        ? response.data.data
        : [];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-5 text-xs text-slate-500">
          <Link href="/" className="hover:text-green-700">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="font-medium text-slate-900">My Orders</span>
        </div>

        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
              <span className="grid size-10 place-items-center rounded-xl bg-green-600 text-white">
                <ShoppingBag className="size-5" />
              </span>
              My Orders
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Track and manage your {orders.length}{" "}
              {orders.length === 1 ? "order" : "orders"}
            </p>
          </div>

          <Link
            href="/shop"
            className="text-sm font-semibold text-green-700 hover:text-green-800"
          >
            ← Continue Shopping
          </Link>
        </div>

        {orders.length === 0 ? (
          <Card className="rounded-xl border-slate-200 shadow-sm">
            <CardContent className="p-10 text-center">
              <Package className="mx-auto size-9 text-slate-400" />
              <h2 className="mt-3 font-semibold text-slate-900">
                No orders yet
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your orders will appear here after you make a purchase.
              </p>
              <Link
                href="/shop"
                className="mt-4 inline-block text-sm font-semibold text-green-700"
              >
                Start shopping
              </Link>
            </CardContent>
          </Card>
        ) : (
          <section className="space-y-3">
            {orders.map((order, index) => (
              <OrderCard
                key={order._id}
                order={order}
                defaultOpen={index === 0}
              />
            ))}
          </section>
        )}
      </div>
    </main>
  );
}

function OrderCard({
  order,
  defaultOpen,
}: {
  order: Order;
  defaultOpen: boolean;
}) {
  const items = order.cartItems ?? [];
  const firstItem = items[0];
  const itemCount = items.reduce((sum, item) => sum + item.count, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.count,
    0,
  );

  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm open:border-green-200"
    >
      <summary className="grid cursor-pointer list-none grid-cols-[56px_minmax(0,1fr)_auto] items-center gap-3 p-3 marker:hidden sm:grid-cols-[72px_minmax(0,1fr)_auto] sm:gap-4 sm:p-4">
        <div className="grid size-14 place-items-center overflow-hidden rounded-xl border bg-white p-1 sm:size-[72px]">
          {firstItem?.product?.imageCover ? (
            <img
              src={firstItem.product.imageCover}
              alt={firstItem.product.title ?? "Ordered product"}
              className="h-full w-full object-contain"
            />
          ) : (
            <Package className="size-6 text-slate-400" />
          )}
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <OrderStatus order={order} />
            <span className="text-xs font-bold text-slate-800">
              #{order.id ?? order._id.slice(-6)}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-slate-500 sm:text-xs">
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3" />
              {formatDate(order.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <Package className="size-3" />
              {itemCount} {itemCount === 1 ? "item" : "items"}
            </span>
            {order.shippingAddress?.city && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3" />
                {order.shippingAddress.city}
              </span>
            )}
          </div>

          <p className="mt-2 text-sm font-extrabold text-slate-900">
            {order.totalOrderPrice.toLocaleString()}{" "}
            <span className="text-[10px] font-medium text-slate-500">EGP</span>
          </p>
        </div>

        <span className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-semibold text-slate-700 group-open:bg-green-600 group-open:text-white">
          <span className="group-open:hidden">Details ↓</span>
          <span className="hidden group-open:inline">Hide ↑</span>
        </span>
      </summary>

      <div className="border-t border-slate-100 bg-slate-50/60 p-3 sm:p-4">
        <h2 className="mb-3 flex items-center gap-2 text-sm font-bold text-slate-900">
          <Package className="size-4 text-green-600" />
          Order Items
        </h2>

        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-center gap-3 rounded-xl bg-white p-2.5"
            >
              <div className="grid size-11 shrink-0 place-items-center overflow-hidden rounded-lg border bg-white p-1">
                {item.product?.imageCover && (
                  <img
                    src={item.product.imageCover}
                    alt={item.product.title ?? "Ordered product"}
                    className="h-full w-full object-contain"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-xs font-semibold text-slate-900">
                  {item.product?.title ?? "Product"}
                </p>
                <p className="mt-0.5 text-[10px] text-slate-500">
                  {item.count} × {item.price.toLocaleString()} EGP
                </p>
              </div>

              <p className="shrink-0 text-xs font-bold text-slate-900">
                {(item.count * item.price).toLocaleString()} EGP
              </p>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 lg:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-white p-3">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">
              <MapPin className="size-3.5 text-blue-500" />
              Delivery Address
            </h3>
            <p className="text-xs text-slate-700">
              {order.shippingAddress?.city || "City not provided"}
            </p>
            {order.shippingAddress?.details && (
              <p className="mt-1 text-xs text-slate-500">
                {order.shippingAddress.details}
              </p>
            )}
            {order.shippingAddress?.phone && (
              <p className="mt-2 text-xs text-slate-500">
                {order.shippingAddress.phone}
              </p>
            )}
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <h3 className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-900">
              <Truck className="size-3.5 text-amber-600" />
              Order Summary
            </h3>

            <div className="space-y-1.5 text-xs">
              <SummaryRow label="Subtotal" value={subtotal} />
              <SummaryRow label="Shipping" value={order.shippingPrice ?? 0} />
              <SummaryRow label="Tax" value={order.taxPrice ?? 0} />

              <div className="border-t border-amber-200 pt-1.5" />

              <div className="flex justify-between font-bold text-slate-900">
                <span>Total</span>
                <span>{order.totalOrderPrice.toLocaleString()} EGP</span>
              </div>

              <p className="pt-1 text-[10px] capitalize text-slate-500">
                Payment: {order.paymentMethodType}
              </p>
            </div>
          </div>
        </div>
      </div>
    </details>
  );
}

function OrderStatus({ order }: { order: Order }) {
  if (order.isDelivered) {
    return (
      <span className="bg-green-100 text-green-800 hover:bg-green-100">
        Delivered
      </span>
    );
  }

  if (order.isPaid) {
    return (
      <span className="bg-sky-100 text-sky-800 hover:bg-sky-100">
        <Truck className="mr-1 size-3" />
        On the way
      </span>
    );
  }

  return (
    <span className="bg-amber-100 text-amber-800 px-2 rounded-2xl hover:bg-amber-100">
      Processing
    </span>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex justify-between gap-3 text-slate-600">
      <span>{label}</span>
      <span>{value === 0 ? "Free" : `${value.toLocaleString()} EGP`}</span>
    </div>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-EG", {
    dateStyle: "medium",
  }).format(new Date(value));
}
