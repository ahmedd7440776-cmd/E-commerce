// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {

//   Heart,
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
// import { useSession } from "next-auth/react";

// export default function Navbar() {
// const { data} = useSession()
// console.log(data);

//   return (
//     <>
//       <nav className="pt-4 pb-2 mx-auto  shadow-2xl sticky top-0 inset-s-0 inset-e-0 mb-5 bg-white/80 z-50 backdrop-blur-lg ">
//         <UpperSide />
//         <div
//           aria-hidden="true"
//           className="pointer-events-none mx-auto   fixed inset-0 z-0 overflow-hidden"
//         >
//           <div className="glow glow-one-n" />
//           <div className="glow glow-two-n" />
//           <div className="glow glow-three-n" />
//         </div>
//         <div className=" container w-11/12 items-center flex justify-end md:py-3 ">
//           <NavigationMenu className=" max-w-none mx-2 lg:mx-0">
//             {/* logo */}
//             <div className="items-center ms-3 lg:ms-0   flex gap-2 w-full">
//               <span className=" font-bold text-xl rounded-full bg-green-600 p-1.5 md:animate-bounce text-white">
//                 B.S
//               </span>
//               <span className="hidden shadow-2xl lg:flex font-bold text-green-800 text-xl">
//                 Brand.shop
//               </span>
//               <input
//                 type="text"
//                 placeholder="search..."
//                 className="border rounded-4xl md:p-1.5  md:ps-2 md:w-35 lg:w-80 ps-1.5 hover:border-green-400 focus:border-green-500 outline-none"
//               />
//             </div>
//             <NavigationMenuList>
//               <NavigationMenuItem className="flex md:hidden ">
//                 <NavigationMenuTrigger>Components</NavigationMenuTrigger>
//                 <NavigationMenuContent className=" z-50! bg-white! rounded ">
//                   <ul className="grid w-100 gap-2 md:w-125 md:grid-cols-2 lg:w-150 ms-3 font-bold hover:bg-green-900">
//                     <li className="hover:bg-green-900">
//                       <Link href="/">Home</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/category">Categories</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/brands">Brands</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/whislist">Whishlist</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/cart">Cart</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/login">Login</Link>
//                     </li>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem className="hidden md:flex justify-end! items-end!">
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/">Home</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/brands">Brands</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/category">Categoiers</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/shop">Shop</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={
//                     <Link href="/cart">
//                       <ShoppingBag />
//                     </Link>
//                   }
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={
//                     <Link href="/wishlist">
//                       <Heart />
//                     </Link>
//                   }
//                 />
//                 {!data ? (
//                   <>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                       render={
//                         <Link href="/login">
//                           Signin <User />
//                         </Link>
//                       }
//                     />
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                       render={
//                         <Link href="/register">
//                           Signup
//                           <UserPlus />
//                         </Link>
//                       }
//                     />
//                   </>
//                 ) : (
//                   <span className={navigationMenuTriggerStyle()}>
//                     <span> Welcome {data.user?.name}</span>
//                   </span>
//                 )}
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       </nav>
//     </>
//   );
// }

// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { Heart, ShoppingBag, User, UserPlus } from "lucide-react";

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
// import { useSession } from "next-auth/react";

// export default function Navbar() {
//   const { data } = useSession();
//   console.log(data);

//   return (
//     <>
//       <nav className="sticky inset-s-0 inset-e-0 top-0 z-50 mx-auto mb-5 bg-white/80 pt-4 pb-2 shadow-2xl backdrop-blur-lg">
//         <UpperSide />

//         <div
//           aria-hidden="true"
//           className="pointer-events-none fixed inset-0 z-0 mx-auto overflow-hidden"
//         >
//           <div className="glow glow-one-n" />
//           <div className="glow glow-two-n" />
//           <div className="glow glow-three-n" />
//         </div>

//         <div className="container mx-auto flex w-11/12 min-w-0 items-center justify-between gap-2 md:py-3">
//           <NavigationMenu className="mx-0 max-w-none min-w-0 flex-1">
//             {/* logo and search */}
//             <div className="ms-0 flex min-w-0 w-full items-center gap-2">
//               <span className="shrink-0 rounded-full bg-green-600 p-1.5 text-xl font-bold text-white md:animate-bounce">
//                 B.S
//               </span>

//               <span className="hidden shrink-0 text-xl font-bold text-green-800 shadow-2xl lg:flex">
//                 Brand.shop
//               </span>

//               <input
//                 type="text"
//                 placeholder="search..."
//                 className="min-w-0 w-full rounded-4xl border py-1.5 ps-2 outline-none hover:border-green-400 focus:border-green-500 sm:max-w-40 lg:max-w-80"
//               />
//             </div>

//             <NavigationMenuList className="shrink-0">
//               <NavigationMenuItem className="flex md:hidden">
//                 <NavigationMenuTrigger>Components</NavigationMenuTrigger>

//                 <NavigationMenuContent className="z-50! rounded bg-white!">
//                   <ul className="ms-3 grid w-[min(20rem,calc(100vw-2rem))] gap-2 font-bold">
//                     <li className="hover:bg-green-900">
//                       <Link href="/">Home</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/category">Categories</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/brands">Brands</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/whislist">Whishlist</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/cart">Cart</Link>
//                     </li>
//                     <li className="hover:bg-green-900">
//                       <Link href="/login">Login</Link>
//                     </li>
//                   </ul>
//                 </NavigationMenuContent>
//               </NavigationMenuItem>

//               <NavigationMenuItem className="hidden items-end justify-end md:flex">
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/">Home</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/brands">Brands</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/category">Categoiers</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={<Link href="/shop">Shop</Link>}
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={
//                     <Link href="/cart">
//                       <ShoppingBag />
//                     </Link>
//                   }
//                 />
//                 <NavigationMenuLink
//                   className={navigationMenuTriggerStyle()}
//                   render={
//                     <Link href="/wishlist">
//                       <Heart />
//                     </Link>
//                   }
//                 />

//                 {!data ? (
//                   <>
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                       render={
//                         <Link href="/login">
//                           Signin <User />
//                         </Link>
//                       }
//                     />
//                     <NavigationMenuLink
//                       className={navigationMenuTriggerStyle()}
//                       render={
//                         <Link href="/register">
//                           Signup <UserPlus />
//                         </Link>
//                       }
//                     />
//                   </>
//                 ) : (
//                   <span className={navigationMenuTriggerStyle()}>
//                     <span>Welcome {data.user?.name}</span>
//                   </span>
//                 )}
//               </NavigationMenuItem>
//             </NavigationMenuList>
//           </NavigationMenu>
//         </div>
//       </nav>
//     </>
//   );
// }

"use client";

import Link from "next/link";
import { Heart, LogOut, Menu, ShoppingBag, User, UserPlus } from "lucide-react";

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

export default function Navbar() {

 function handleLogOut(){
      signOut({
        redirectTo: "/login",
      });
  }
  const { data} = useSession();

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
                  < Menu/>
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
                    <Link href="/wishlist">Wishlist</Link>
                  </li>
                  <li className="hover:bg-green-100">
                    <Link href="/cart">Cart</Link>
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
                className={navigationMenuTriggerStyle()}
                render={
                  <Link href="/cart" aria-label="Cart">
                    <ShoppingBag />
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
                  <h2 className={`${navigationMenuTriggerStyle()} md:font-extrabold text-green-700`}>
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