"use client";

import Link from "next/link";
import {
  Badge,
  Heart,
  LogOut,
  Menu,
  MessageCircleCheck,
  ShoppingBag,
  User,
  UserPlus,
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import UpperSide from "../upperSide/UpperSide";
import { signOut, useSession } from "next-auth/react";
import { useContext } from "react";
import { CartCountProvider } from "@/context/cartContext/cartContext";

export default function Navbar() {
  function handleLogOut() {
    signOut({
      redirectTo: "/login",
    });
  }
  const { data } = useSession();
  const { count } = useContext(CartCountProvider);

  return (
    <nav className="sticky inset-s-0 inset-e-0 top-0 z-50 mx-auto mb-5 bg-white/80 pt-4 pb-2 shadow-2xl backdrop-blur-lg">
      <UpperSide />

      {/* /colorful divs */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 mx-auto overflow-hidden"
      >
        <div className="glow glow-one-n" />
        <div className="glow glow-two-n" />
        <div className="glow glow-three-n" />
      </div>

      <div className="container mx-auto flex w-11/12 min-w-0 items-center justify-between gap-2 md:py-3">
        {/* Logo and search */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Link href="/" className="shrink-0">
            <span className="block rounded-full bg-green-600 p-1.5 text-xl font-bold text-white md:animate-bounce">
              B.S
            </span>
          </Link>

          <span className="hidden shrink-0 text-xl font-bold text-green-800 shadow-2xl lg:flex">
            Brand.shop
          </span>

          <input
            type="text"
            placeholder="search..."
            className="min-w-0 w-full max-w-40 rounded-4xl border py-1.5 ps-2 outline-none hover:border-green-400 focus:border-green-500 sm:max-w-56 lg:max-w-80"
          />
        </div>

        {/* Navigation menu */}
        <NavigationMenu className="shrink-0">
          <NavigationMenuList>
            {/* Mobile menu */}
            <NavigationMenuItem className="flex md:hidden">
              <NavigationMenuTrigger className="px-2">
                <Menu />
              </NavigationMenuTrigger>

              <NavigationMenuContent className="z-50! rounded bg-white!">
                <ul className="grid w-[min(20rem,calc(100vw-2rem))] gap-2 p-3 font-bold">
                  <li className="hover:bg-green-100">
                    <Link href="/">Home</Link>
                  </li>
                  <li className="hover:bg-green-100">
                    <Link href="/category">Categories</Link>
                  </li>
                  <li className="hover:bg-green-100">
                    <Link href="/brands">Brands</Link>
                  </li>
                  <li className="hover:bg-green-100">
                    <Link href="/shop">Shop</Link>
                  </li>
                  <li className="hover:bg-green-100">
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                  <li className="hover:bg-green-100  flex flex-row items-center  justify-start gap-2">
                    <Link href="/cart">Cart</Link>

                    {count > 0 && (
                      <p className="text-white bg-green-700 rounded-full w-1/2 h-1/2 text-center absolute top-0 right-0 ">
                        {count}
                      </p>
                    )}
                  </li>

                  {!data && (
                    <>
                      <li className="hover:bg-green-100">
                        <Link href="/login">Login</Link>
                      </li>
                      <li className="hover:bg-green-100">
                        <Link href="/register">Register</Link>
                      </li>
                    </>
                  )}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* Desktop menu */}
            <NavigationMenuItem className="hidden items-center md:flex">
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/">Home</Link>}
              />
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/brands">Brands</Link>}
              />
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/category">Categories</Link>}
              />
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={<Link href="/shop">Shop</Link>}
              />
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} relative `}
                render={
                  <Link href="/cart" aria-label="Cart">
                    <ShoppingBag className="text-green-600 " />
                    {count > 0 && (
                      <p className="text-white bg-green-700 rounded-full w-1/2 h-1/2 text-center absolute top-0 right-0 ">
                        {count}
                      </p>
                    )}
                  </Link>
                }
              />
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link href="/wishlist" aria-label="Wishlist">
                    <Heart />
                  </Link>
                }
              />

              {!data ? (
                <>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    render={
                      <Link href="/login">
                        Signin <User />
                      </Link>
                    }
                  />
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    render={
                      <Link href="/register">
                        Signup <UserPlus />
                      </Link>
                    }
                  />
                </>
              ) : (
                <>
                  <h2
                    className={`${navigationMenuTriggerStyle()} md:font-extrabold text-green-700`}
                  >
                    Welcome {data?.user?.name}
                  </h2>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    render={
                      <span
                        className="cursor-pointer text-red-800 hover:text-red-600"
                        onClick={() => handleLogOut()}
                      >
                        sign out <LogOut />
                      </span>
                    }
                  />
                </>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
