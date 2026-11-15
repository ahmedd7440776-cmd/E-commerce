// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function proxy(req: NextRequest) {
//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//   });

//   const pathName = req.nextUrl.pathname;
//   const isAuth = pathName === "/login" || pathName === "/register";

//   if (isAuth) {
//     if (token) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     return NextResponse.next();
//   }

//   if (token) {
//     // this returns desierd page
//     return NextResponse.next();
//   }
//   // it redirects it if the user is not authantcated
//   return NextResponse.redirect(new URL("/login", req.url));
// }
// //  the request comes from the client and we need to send it to the server and get the response and send it back to the client
// //  it has to return a NextResponse object with the response from the server
// //  request contains the object which is the data user (email , name , credentaialToken,.....)

// export const config = {
//   matcher: [
//     "/cart/:path*",
//     "/wishlist/:path*",
//     "/login/:path*",
//     "/register/:path*",
//     "/payment/:path*",
//     "/allorders/:path*",
//   ],
// };

import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const pathname = req.nextUrl.pathname;
  const isAuthPage = pathname === "/login" || pathname === "/register";
  const isLoggedIn = Boolean(req.auth);

  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isAuthPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/cart/:path*",
    "/wishlist/:path*",
    "/login/:path*",
    "/register/:path*",
    "/payment/:path*",
    "/allorders/:path*",
  ],
};



















// {
//   "name": "my-app",
//   "version": "0.1.0",
//   "private": true,
//   "scripts": {
//     "dev": "next dev",
//     "build": "next build",
//     "start": "next start",
//     "lint": "eslint"
//   },
//   "dependencies": {
//     "@base-ui/react": "^1.9.0",
//     "@hookform/resolvers": "^6.0.1",
//     "class-variance-authority": "^0.7.1",
//     "cn": "^0.5.0",
//     "jwt-decode": "^4.0.0",
//     "lucide-react": "^1.59.0",
//     "next": "16.4.2",
//     "next-auth": "^5.0.0-beta.32",
//     "react": "19.3.0",
//     "react-dom": "19.3.0",
//     "react-hook-form": "^7.91.0",
//     "shadcn": "^4.22.0",
//     "swiper": "^14.3.0",
//     "tw-animate-css": "^1.4.0",
//     "zod": "^4.6.7"
//   },
//   "devDependencies": {
//     "@tailwindcss/turbopack": "^4",
//     "@types/node": "^20",
//     "@types/react": "^19",
//     "@types/react-dom": "^19",
//     "babel-plugin-react-compiler": "1.0.0",
//     "eslint": "^9",
//     "eslint-config-next": "16.4.2",
//     "tailwindcss": "^4",
//     "typescript": "^5"
//   }
// }