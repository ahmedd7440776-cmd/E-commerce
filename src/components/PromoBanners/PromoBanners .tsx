import Link from "next/link";
import { ArrowRight, Flame, Sparkles } from "lucide-react";

const promotions = [
  {
    label: "Deal of the Day",
    title: "Woman Brown Long Sleeve Tunic LT.CAMEL",
    

    description: "Get up to 40% off on selected items",
    discount: "40% OFF",
    code: "NEWARRIVE40",
    button: "Shop Now",
    href: "/shop",
    icon: Flame,
    colors: "from-emerald-500 to-emerald-700",
    accent: "text-emerald-700",
    badge: "bg-white/20",
  },
  {
    label: "New Arrivals",
    title: "Exotic Brands",
    description: "Discover our latest collection of premium Brands",
    discount: "25% OFF",
    code: "BRANDS25",
    button: "Explore Now",
    href: "/shop",
    icon: Sparkles,
    colors: "from-orange-500 to-rose-500",
    accent: "text-orange-600",
    badge: "bg-white/20",
  },
];

export default function PromoBanners() {
  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-5 px-4 py-6 md:grid-cols-2">
      {promotions.map((promo) => {
        const Icon = promo.icon;

        return (
          <article
            key={promo.title}
            className={`relative isolate overflow-hidden rounded-2xl bg-linear-to-br ${promo.colors} px-4 py-5 text-white sm:px-8 sm:py-8`}
          >
            {/* Decorative circles */}
            <div className="pointer-events-none absolute -right-10 -top-16 -z-10 h-36 w-36 rounded-full bg-white/10" />
            <div className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-32 w-32 rounded-full bg-white/10" />

            <div
              className={`inline-flex items-center gap-2 rounded-full ${promo.badge} px-3 py-1 text-sm`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
              <span>{promo.label}</span>
            </div>

            <h2 className="mt-4 text-xl font-bold tracking-tight sm:text-2xl">
              {promo.title}
            </h2>

            <p className="mt-2 text-sm text-white/90 sm:text-base">
              {promo.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
              <span className="text-xl font-extrabold sm:text-xl">
                {promo.discount}
              </span>
              <span className="text-sm text-white/90">
                Use code:{" "}
                <strong className="font-bold text-white">{promo.code}</strong>
              </span>
            </div>

            <Link
              href={promo.href}
              className={`mt-5 inline-flex items-center gap-3 rounded-full bg-white px-4 py-2 font-semibold ${promo.accent} transition hover:scale-[1.03] hover:shadow-lg`}
            >
              {promo.button}
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </Link>
          </article>
        );
      })}
    </section>
  );
}
