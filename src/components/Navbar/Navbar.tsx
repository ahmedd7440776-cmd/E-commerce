// "use client";

// import Link from "next/link";
// import {
//   Heart,
//   LogOut,
//   Settings,
//   ShoppingBag,
//   User,
//   UserPlus,
// } from "lucide-react";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import UpperSide from "../upperSide/UpperSide";
// import { signOut, useSession } from "next-auth/react";
// import { CartCountProvider } from "@/context/cartContext/cartContext";
// import { useContext, useEffect, useRef, useState } from "react";
// import { Search } from "lucide-react";
// import { searchProducts } from "@/app/services/searchProducts.action";
// type SearchProduct = {
//   _id: string;
//   title: string;
//   imageCover: string;
//   price: number;
// };

// export default function Navbar() {
//   function handleLogOut() {
//     signOut({
//       redirectTo: "/login",
//     });
//   }
//   const { data } = useSession();
// const { count, wishlistIds } = useContext(CartCountProvider);
// const wishlistCount = wishlistIds.length;

// const [searchTerm, setSearchTerm] = useState("");
// const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
// const [isSearching, setIsSearching] = useState(false);
// const [showSearchResults, setShowSearchResults] = useState(false);
// const latestSearch = useRef(0);

// useEffect(() => {
//   const term = searchTerm.trim();

//   if (term.length < 2) {
//     setSearchResults([]);
//     setIsSearching(false);
//     return;
//   }

//   const searchId = ++latestSearch.current;

//   const timer = setTimeout(async () => {
//     setIsSearching(true);

//     try {
//       const products = await searchProducts(term);

//       // Ignore an older response if the user has typed a newer query.
//       if (searchId === latestSearch.current) {
//         setSearchResults(products);
//         setShowSearchResults(true);
//       }
//     } catch {
//       if (searchId === latestSearch.current) {
//         setSearchResults([]);
//       }
//     } finally {
//       if (searchId === latestSearch.current) {
//         setIsSearching(false);
//       }
//     }
//   }, 300);

//   return () => clearTimeout(timer);
// }, [searchTerm]);

//   return (
//     <nav className="sticky inset-s-0 inset-e-0 top-0 z-50 mx-auto mb-5 bg-white/80 pt-4 pb-2 shadow-2xl backdrop-blur-lg">
//       <UpperSide />

//       {/* /colorful divs */}
//       <div
//         aria-hidden="true"
//         className="pointer-events-none fixed inset-0 z-0 mx-auto overflow-hidden"
//       >
//         <div className="glow glow-one-n" />
//         <div className="glow glow-two-n" />
//         <div className="glow glow-three-n" />
//       </div>

//       <div className="container mx-auto flex w-11/12 min-w-0 items-center justify-between gap-2 md:py-3">
//         {/* Logo and search */}
//         <div className="flex min-w-0 flex-1 items-center gap-2">
//           <Link href="/" className="shrink-0">
//             <span className="block rounded-full bg-green-600 p-1.5 text-xl font-bold text-white md:animate-bounce">
//               G.S
//             </span>
//           </Link>

//           <span className="hidden shrink-0 text-xl font-bold text-green-800 shadow-2xl lg:flex">
//             Green shop
//           </span>

//           <div className="relative min-w-0 w-full max-w-40 sm:max-w-56 lg:max-w-80">
//             <div className="flex items-center rounded-full border bg-white px-3 focus-within:border-green-500">
//               <input
//                 type="search"
//                 value={searchTerm}
//                 onChange={(event) => setSearchTerm(event.target.value)}
//                 onFocus={() => setShowSearchResults(true)}
//                 onKeyDown={(event) => {
//                   if (event.key === "Escape") setShowSearchResults(false);
//                 }}
//                 placeholder="Search products..."
//                 aria-label="Search products"
//                 className="min-w-0 flex-1 bg-transparent py-2 outline-none"
//               />
//               <Search className="size-4 shrink-0 text-slate-500" />
//             </div>

//             {showSearchResults && searchTerm.trim().length >= 2 && (
//               <div className="absolute left-0 top-full z-[60] mt-2 max-h-96 w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border bg-white p-2 shadow-xl">
//                 {isSearching ? (
//                   <p className="p-3 text-sm text-slate-500">Searching...</p>
//                 ) : searchResults.length > 0 ? (
//                   searchResults.map((product) => (
//                     <Link
//                       key={product._id}
//                       href={`/products/${product._id}`}
//                       onClick={() => {
//                         setSearchTerm("");
//                         setShowSearchResults(false);
//                       }}
//                       className="flex items-center gap-3 rounded-lg p-2 hover:bg-green-50"
//                     >
//                       <img
//                         src={product.imageCover}
//                         alt=""
//                         className="size-12 rounded-md bg-slate-50 object-contain p-1"
//                       />
//                       <span className="min-w-0 flex-1">
//                         <span className="block truncate text-sm font-medium text-slate-800">
//                           {product.title}
//                         </span>
//                         <span className="text-xs text-green-700">
//                           {product.price.toLocaleString()} EGP
//                         </span>
//                       </span>
//                     </Link>
//                   ))
//                 ) : (
//                   <p className="p-3 text-sm text-slate-500">
//                     No matching products.
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Navigation menu */}
//         <NavigationMenu className="shrink-0">
//           <NavigationMenuList>
//             {/* Mobile menu */}
//             <NavigationMenuItem className="flex md:hidden">
//               <NavigationMenuTrigger className="px-2">
//                 <Settings className="animate-spin" />
//               </NavigationMenuTrigger>

//               {/* <NavigationMenuContent className="z-50! rounded bg-white!">
//                 <ul className="grid w-[min(20rem,calc(100vw-2rem))] gap-2 p-3 font-bold">
//                   <li className="hover:bg-green-100">
//                     <Link href="/">Home</Link>
//                   </li>
//                   <li className="hover:bg-green-100">
//                     <Link href="/category">Categories</Link>
//                   </li>
//                   <li className="hover:bg-green-100">
//                     <Link href="/brands">Brands</Link>
//                   </li>
//                   <li className="hover:bg-green-100">
//                     <Link href="/shop">Shop</Link>
//                   </li>
//                   <li className="hover:bg-green-100">
//                     <Link href="/wishlist">Wishlist</Link>
//                   </li>
//                   <li className="hover:bg-green-100  flex flex-row items-center  justify-start gap-2">
//                     <Link href="/cart">Cart</Link>

//                     {count > 0 && (
//                       <p className="text-white bg-green-700 rounded-full w-1/2 h-1/2 text-center absolute top-0 right-0 ">
//                         {count}
//                       </p>
//                     )}
//                   </li>

//                   {!data && (
//                     <>
//                       <li className="hover:bg-green-100">
//                         <Link href="/login">Login</Link>
//                       </li>
//                       <li className="hover:bg-green-100">
//                         <Link href="/register">Register</Link>
//                       </li>
//                     </>
//                   )}
//                 </ul>
//               </NavigationMenuContent> */}

//               <NavigationMenuContent className="z-50 rounded bg-white">
//                 <ul className="grid w-[min(20rem,calc(100vw-2rem))] gap-1 p-3 font-bold">
//                   <li className="rounded hover:bg-green-100">
//                     <Link className="block p-2" href="/">
//                       Home
//                     </Link>
//                   </li>

//                   <li className="rounded hover:bg-green-100">
//                     <Link className="block p-2" href="/category">
//                       Categories
//                     </Link>
//                   </li>

//                   <li className="rounded hover:bg-green-100">
//                     <Link className="block p-2" href="/brands">
//                       Brands
//                     </Link>
//                   </li>

//                   <li className="rounded hover:bg-green-100">
//                     <Link className="block p-2" href="/shop">
//                       Shop
//                     </Link>
//                   </li>

//                   <li className="rounded hover:bg-green-100">
//                     <Link
//                       className="flex items-center gap-2 p-2"
//                       href="/wishlist"
//                     >
//                       <span className="relative">
//                         Wishlist
//                         {wishlistCount > 0 && (
//                           <span className="absolute -right-6 -top-2 grid size-5 place-items-center rounded-full bg-red-600 text-xs text-white">
//                             {wishlistCount}
//                           </span>
//                         )}
//                       </span>
//                     </Link>
//                   </li>

//                   <li className="rounded hover:bg-green-100">
//                     <Link className="flex items-center gap-2 p-2" href="/cart">
//                       <span className="relative">
//                         Cart
//                         {count > 0 && (
//                           <span
//                             aria-label={`${count} items in cart`}
//                             className="absolute -right-6 -top-2 grid size-5 place-items-center rounded-full bg-green-700 text-xs text-white"
//                           >
//                             {count}
//                           </span>
//                         )}
//                       </span>
//                     </Link>
//                   </li>

//                   {/* {!data && (
//                     <>
//                       <li className="rounded hover:bg-green-100">
//                         <Link className="block p-2" href="/login">
//                           Login
//                         </Link>
//                       </li>
//                       <li className="rounded hover:bg-green-100">
//                         <Link className="block p-2" href="/register">
//                           Register
//                         </Link>
//                       </li>
//                     </>
//                   )} */}

//                   {!data ? (
//                     <>
//                       <li className="rounded hover:bg-green-100">
//                         <Link className="block p-2" href="/login">
//                           Login
//                         </Link>
//                       </li>
//                       <li className="rounded hover:bg-green-100">
//                         <Link className="block p-2" href="/register">
//                           Register
//                         </Link>
//                       </li>
//                     </>
//                   ) : (
//                     <li>
//                       <button
//                         type="button"
//                         onClick={handleLogOut}
//                         className="flex w-full items-center gap-2 rounded p-2 text-left text-red-700 hover:bg-red-50"
//                       >
//                         <LogOut className="size-4" />
//                         <span>Log out</span>
//                       </button>
//                     </li>
//                   )}
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>

//             {/* Desktop menu */}
//             <NavigationMenuItem className="hidden items-center md:flex">
//               <NavigationMenuLink
//                 className={navigationMenuTriggerStyle()}
//                 render={<Link href="/">Home</Link>}
//               />
//               <NavigationMenuLink
//                 className={navigationMenuTriggerStyle()}
//                 render={<Link href="/brands">Brands</Link>}
//               />
//               <NavigationMenuLink
//                 className={navigationMenuTriggerStyle()}
//                 render={<Link href="/category">Categories</Link>}
//               />
//               <NavigationMenuLink
//                 className={navigationMenuTriggerStyle()}
//                 render={<Link href="/shop">Shop</Link>}
//               />
//               <NavigationMenuLink
//                 className={`${navigationMenuTriggerStyle()} relative `}
//                 render={
//                   <Link href="/cart" aria-label="Cart">
//                     <ShoppingBag className="text-green-600 " />
//                     {count > 0 && (
//                       <p className="text-white bg-green-700 rounded-full w-1/2 h-1/2 text-center absolute top-0 right-0 ">
//                         {count}
//                       </p>
//                     )}
//                   </Link>
//                 }
//               />

//               <NavigationMenuLink
//                 className={navigationMenuTriggerStyle()}
//                 render={
//                   <Link
//                     href="/wishlist"
//                     aria-label={`Wishlist, ${wishlistCount} items`}
//                   >
//                     <span className="relative inline-flex">
//                       {wishlistCount > 0 ? (
//                         <>
//                           <Heart className="text-red-500 fill-current z-50 " />
//                           <span className="absolute -right-3 -top-2 grid size-5 place-items-center rounded-full bg-white border text-xs text-red-500">
//                             {wishlistCount}
//                           </span>
//                         </>
//                       ) : (
//                         <Heart />
//                       )}
//                     </span>
//                   </Link>
//                 }
//               />

//               {!data ? (
//                 <>
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     render={
//                       <Link href="/login">
//                         Signin <User />
//                       </Link>
//                     }
//                   />
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     render={
//                       <Link href="/register">
//                         Signup <UserPlus />
//                       </Link>
//                     }
//                   />
//                 </>
//               ) : (
//                 <>
//                   <h2
//                     className={`${navigationMenuTriggerStyle()} md:font-extrabold text-green-700`}
//                   >
//                     Welcome {data?.user?.name}
//                   </h2>
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     render={
//                       <span
//                         className="cursor-pointer text-red-800 hover:text-red-600"
//                         onClick={() => handleLogOut()}
//                       >
//                         sign out <LogOut />
//                       </span>
//                     }
//                   />
//                 </>
//               )}
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import {
  Heart,
  LogOut,
  Search,
  Settings,
  ShoppingBag,
  User,
  UserPlus,
} from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { CartCountProvider } from "@/context/cartContext/cartContext";
import { searchProducts } from "@/app/services/searchProducts.action";
import UpperSide from "../upperSide/UpperSide";

type SearchProduct = {
  _id: string;
  title: string;
  imageCover: string;
  price: number;
};

export default function Navbar() {
  const { data } = useSession();
  const { count, wishlistIds } = useContext(CartCountProvider);
  const wishlistCount = wishlistIds.length;

  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchProduct[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const latestSearch = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const term = searchTerm.trim();

    if (term.length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    const searchId = ++latestSearch.current;

    const timer = setTimeout(async () => {
      setIsSearching(true);

      try {
        const products = await searchProducts(term);

        if (searchId === latestSearch.current) {
          setSearchResults(products);
          setShowSearchResults(true);
        }
      } catch {
        if (searchId === latestSearch.current) {
          setSearchResults([]);
        }
      } finally {
        if (searchId === latestSearch.current) {
          setIsSearching(false);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  function handleLogOut() {
    signOut({ redirectTo: "/login" });
  }

  return (
    <nav className="sticky inset-s-0 inset-e-0 top-0 z-50 mx-auto mb-5 bg-white/80 pt-4 pb-2 shadow-2xl backdrop-blur-lg">
      <UpperSide />

      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 mx-auto overflow-hidden"
      >
        <div className="glow glow-one-n" />
        <div className="glow glow-two-n" />
        <div className="glow glow-three-n" />
      </div>

      <div className="container mx-auto flex w-11/12 min-w-0 items-center justify-between gap-2 md:py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Link href="/" className="shrink-0">
            <span className="block rounded-full bg-green-600 p-1.5 text-xl font-bold text-white md:animate-bounce">
              G.S
            </span>
          </Link>

          <span className="hidden shrink-0 text-xl font-bold text-green-800 shadow-2xl lg:flex">
            Green shop
          </span>

          <div className="relative min-w-0 w-full max-w-40 sm:max-w-56 lg:max-w-80">
            <div className="flex items-center rounded-full border bg-white px-3 focus-within:border-green-500">
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                onFocus={() => setShowSearchResults(true)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") setShowSearchResults(false);
                }}
                placeholder="Search products..."
                aria-label="Search products"
                className="min-w-0 flex-1 bg-transparent py-2 outline-none"
              />
              <Search className="size-4 shrink-0 text-slate-500" />
            </div>

            {showSearchResults && searchTerm.trim().length >= 2 && (
              <div className="absolute left-0 top-full z-[60] mt-2 max-h-96 w-[min(22rem,calc(100vw-2rem))] overflow-y-auto rounded-xl border bg-white p-2 shadow-xl">
                {isSearching ? (
                  <p className="p-3 text-sm text-slate-500">Searching...</p>
                ) : searchResults.length > 0 ? (
                  searchResults.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/${product._id}`}
                      onClick={() => {
                        setSearchTerm("");
                        setShowSearchResults(false);
                      }}
                      className="flex items-center gap-3 rounded-lg p-2 hover:bg-green-50"
                    >
                      <img
                        src={product.imageCover}
                        alt=""
                        className="size-12 rounded-md bg-slate-50 object-contain p-1"
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-slate-800">
                          {product.title}
                        </span>
                        <span className="text-xs text-green-700">
                          {product.price.toLocaleString()} EGP
                        </span>
                      </span>
                    </Link>
                  ))
                ) : (
                  <p className="p-3 text-sm text-slate-500">
                    No matching products.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <NavigationMenu className="shrink-0">
          <NavigationMenuList>
            <NavigationMenuItem className="flex md:hidden">
              <NavigationMenuTrigger className="px-2">
                <Settings className="animate-spin" />
              </NavigationMenuTrigger>

              <NavigationMenuContent className="z-50 rounded bg-white">
                <ul className="grid w-[min(20rem,calc(100vw-2rem))] gap-1 p-3 font-bold">
                  <li className="rounded hover:bg-green-100">
                    <Link className="block p-2" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="rounded hover:bg-green-100">
                    <Link className="block p-2" href="/category">
                      Categories
                    </Link>
                  </li>
                  <li className="rounded hover:bg-green-100">
                    <Link className="block p-2" href="/brands">
                      Brands
                    </Link>
                  </li>
                  <li className="rounded hover:bg-green-100">
                    <Link className="block p-2" href="/shop">
                      Shop
                    </Link>
                  </li>
                  <li className="rounded hover:bg-green-100">
                    <Link
                      className="flex items-center gap-2 p-2"
                      href="/wishlist"
                    >
                      <span className="relative">
                        Wishlist
                        {wishlistCount > 0 && (
                          <span className="absolute -right-6 -top-2 grid size-5 place-items-center rounded-full bg-red-600 text-xs text-white">
                            {wishlistCount}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                  <li className="rounded hover:bg-green-100">
                    <Link className="flex items-center gap-2 p-2" href="/cart">
                      <span className="relative">
                        Cart
                        {count > 0 && (
                          <span
                            aria-label={`${count} items in cart`}
                            className="absolute -right-6 -top-2 grid size-5 place-items-center rounded-full bg-green-700 text-xs text-white"
                          >
                            {count}
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>

                  {mounted &&
                    (!data ? (
                      <>
                        <li className="rounded hover:bg-green-100">
                          <Link className="block p-2" href="/login">
                            Login
                          </Link>
                        </li>
                        <li className="rounded hover:bg-green-100">
                          <Link className="block p-2" href="/register">
                            Register
                          </Link>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          type="button"
                          onClick={handleLogOut}
                          className="flex w-full items-center gap-2 rounded p-2 text-left text-red-700 hover:bg-red-50"
                        >
                          <LogOut className="size-4" />
                          <span>Log out</span>
                        </button>
                      </li>
                    ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

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
                className={`${navigationMenuTriggerStyle()} relative`}
                render={
                  <Link href="/cart" aria-label={`Cart, ${count} items`}>
                    <ShoppingBag className="text-green-600" />
                    {count > 0 && (
                      <span className="absolute right-0 top-0 grid size-5 place-items-center rounded-full bg-green-700 text-xs text-white">
                        {count}
                      </span>
                    )}
                  </Link>
                }
              />

              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link
                    href="/wishlist"
                    aria-label={`Wishlist, ${wishlistCount} items`}
                  >
                    <span className="relative inline-flex">
                      <Heart
                        className={
                          wishlistCount > 0 ? "fill-red-500 text-red-500" : ""
                        }
                      />
                      {wishlistCount > 0 && (
                        <span className="absolute -right-3 -top-2 grid size-5 place-items-center rounded-full border bg-white text-xs text-red-500">
                          {wishlistCount}
                        </span>
                      )}
                    </span>
                  </Link>
                }
              />

              {mounted &&
                (!data ? (
                  <>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <Link href="/login">
                          Sign in <User />
                        </Link>
                      }
                    />
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <Link href="/register">
                          Sign up <UserPlus />
                        </Link>
                      }
                    />
                  </>
                ) : (
                  <>
                    <h2
                      className={`${navigationMenuTriggerStyle()} md:font-extrabold text-green-700`}
                    >
                      Welcome {data.user?.name}
                    </h2>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <button
                          type="button"
                          onClick={handleLogOut}
                          className="flex items-center gap-2 text-red-800 hover:text-red-600"
                        >
                          Sign out <LogOut />
                        </button>
                      }
                    />
                  </>
                ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}