'use client'
import Link from "next/link";
import {

    Balloon,
    FaceAngry,
  GuitarIcon,
  Headphones,
  Mail,
  MapPin,
  RotateCcw,
  ShieldCheck,
  ShoppingCart,
  Truck,

} from "lucide-react";

const footerColumns = [
  {
    title: "Shop",
    links: [
      ["All Products", "/products"],
      ["Categories", "/categories"],
      ["Brands", "/brands"],
      ["Electronics", "/categories"],
      ["Men's Fashion", "/categories"],
      ["Women's Fashion", "/categories"],
    ],
  },
  {
    title: "Account",
    links: [
      ["My Account", "/account"],
      ["Order History", "/orders"],
      ["Wishlist", "/wishlist"],
      ["Shopping Cart", "/cart"],
      ["Sign In", "/login"],
      ["Create Account", "/register"],
    ],
  },
  {
    title: "Support",
    links: [
      ["Contact Us", "/contact"],
      ["Help Center", "/help"],
      ["Shipping Info", "/shipping"],
      ["Returns & Refunds", "/returns"],
      ["Track Order", "/orders"],
    ],
  },
  {
    title: "Legal",
    links: [
      ["Privacy Policy", "/privacy"],
      ["Terms of Service", "/terms"],
      ["Cookie Policy", "/cookies"],
    ],
  },
];

const benefits = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    Icon: Truck,
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    Icon: RotateCcw,
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    Icon: ShieldCheck,
  },
  {
    title: "24/7 Support",
    description: "Contact us anytime",
    Icon: Headphones,
  },
];

export default function Footer() {
  return (
    <footer>
      <section className="border-y mt-10 border-emerald-100 bg-emerald-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-5 px-4 py-5 sm:px-6 md:grid-cols-4 md:gap-8">
          {benefits.map(({ title, description, Icon }) => (
            <div key={title} className="flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-100 text-emerald-600">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-sm font-semibold text-slate-800">
                  {title}
                </h2>
                <p className="text-xs text-slate-500">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-slate-900 text-slate-300 ">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:grid-cols-[2fr_repeat(4,1fr)] lg:gap-12">
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-xl font-bold text-slate-900"
            >
              <ShoppingCart className="h-6 w-6 text-emerald-600" />
              <span>GreenShop</span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Your one-stop destination for quality products. From fashion to
              electronics, find great brands and enjoy a seamless shopping
              experience.
            </p>

            <address className="mt-5 space-y-3 text-sm not-italic text-slate-400">
              <a
                href="tel:+18001234567"
                className="flex items-center gap-3 hover:text-emerald-400"
              >
                <Headphones className="h-4 w-4 text-emerald-500" />
                +1 (800) 123-4567
              </a>
              <a
                href="mailto:support@greenshop.com"
                className="flex items-center gap-3 hover:text-emerald-400"
              >
                <Mail className="h-4 w-4 text-emerald-500" />
                support@greenshop.com
              </a>
              <p className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-500" />
                123 Commerce Street, New York, NY 10001
              </p>
            </address>

            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <FaceAngry className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <Balloon className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                aria-label="YouTube"
                className="grid h-9 w-9 place-items-center rounded-full bg-slate-800 text-slate-300 transition hover:bg-emerald-600 hover:text-white"
              >
                <GuitarIcon className="h-4 w-4" />
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="mb-5 text-base font-semibold text-white">
                {column.title}
              </h2>
              <ul className="space-y-3">
                {column.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-slate-400 transition hover:text-emerald-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="border-t border-slate-800">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-center text-xs text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© {new Date().getFullYear()} GreenShop. All rights reserved.</p>
            <p>Secure shopping · Fast delivery · Easy returns</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
