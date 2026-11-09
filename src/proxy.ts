import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
  });


const pathName = req.nextUrl.pathname
const isAuth = pathName === "/login" || pathName === "/register"; 


if (isAuth) {
  if(token){
  return NextResponse.redirect(new URL("/", req.url));

  }
    return NextResponse.next();
  
}


  if (token) {
    // this returns desierd page
    return NextResponse.next();
  }
  // it redirects it if the user is not authantcated
  return NextResponse.redirect(new URL("/login", req.url));
}
//  the request comes from the client and we need to send it to the server and get the response and send it back to the client
//  it has to return a NextResponse object with the response from the server
//  request contains the object which is the data user (email , name , credentaialToken,.....)
 
export const config = {
  matcher: ['/cart' , '/wishlist' , '/category' ,'/login','/register']
}