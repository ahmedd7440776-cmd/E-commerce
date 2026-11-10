import { LoginResponseType } from "@/app/(auth)/login/Login.interface";
import { log } from "console";
import { DefaultSession, NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { DefaultSerializer } from "v8";
import { int } from "zod";
import { jwtDecode } from "jwt-decode";


declare module "next-auth" {
  interface User {
    userTkn: string;
  }
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}
declare module "next-auth/jwt"{
  interface JWT {
    id: string;
    CredentialsToken:string;
  }
}



export const authJsConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Loggin to Green Shop",
      credentials: {
        email: { placeholder: "Enter Your Emai", type: "email" },
        password: { placeholder: "Enter Your Password", type: "password" },
      },
      async authorize(Credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(Credentials),
          },
        );
        const data: LoginResponseType = await response.json();
        console.log(data);
console.log("logain data ", data);


        if (data.message === "success") {
          const { role, ...userData } = data.user;
console.log("logain data ", data);

          // user insisde the data object is the user object that is returned from the backend and it contains the user data and the token
          // console.log(userData ,data);


// console.log('backend user' , data.user);
// console.log('backend user id' , data.user.id);



          return { ...userData, userTkn: data.token };

          // incaase if this function returns a user object {true obeject{userdatt: email, name}}  then next js takes this object
          //  and create another object called {token} but its not the same token of the user its just an object
          //  created by auth.js not next then it takes it  with the secret key and gives you an encrypted token and stoers it in  cookies
        }
        // it must return etheir null false or a user object
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    //  param is an object that contains the user object and the token object
    jwt: ({ token, user }) => {
      console.log(  'parama jwt',user,token);

      // we make this if statement to make sure that there is a user and not return undefined because it is being callled after each succesful call or navgation
      if (user) {
        console.log('uathuser' , user);
        const decodeToken: { id: string } = jwtDecode(user.userTkn);
        token.id = decodeToken.id;
        token.CredentialsToken = user.userTkn;
      }
      console.log('saved token id ' , token.id);
      
      // runs on server side and it returns the token object that will be stored in the cookies
      return token;
      //  the user tkn is stored in the token object and it will be used to authenticate the user in the next request
    },
    session: ({ session, token }) => {
      // session callback is called on the client side and it returns the session object that will be used to authenticate the user in the next request
      //  it's called after the (auth) jwt callback and it receives the token object that was returned from the jwt callback
      //  usesession() hook is used to get the session object and it will be used to authenticate the user in the next request
      // console.log("param object   ", param);


      console.log('seccion callback toen id ', token.id);
      
      session.user.id = token.id;
console.log("final seccion ", session);

      return session;
    },
  },
};

// google login function blow

// import { LoginResponseType } from "@/app/(auth)/login/Login.interface";
// import NextAuth, { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import Google from "next-auth/providers/google";

// export const authJsConfig: NextAuthConfig = {
//   providers: [
//     Credentials({
//       name: "Loggin to Green Shop",
//       credentials: {
//         email: { placeholder: "Enter Your Emai", type: "email" },
//         password: { placeholder: "Enter Your Password", type: "password" },
//       },
//       authorize: async function (Credentials) {
//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
//           {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//             },
//             body: JSON.stringify(Credentials),
//           },
//         );
//         const data: LoginResponseType = await response.json();

//         if (data.message === "success") {
//           const { role, ...userData } = data.user;
//           // incaase if this function returns a user object {true obeject{userdatt: email, name}}  then next js takes this object
//           //  and create anthor object called {token} but its not the same token of the user its just an object
//           //  created by auth.js not next then it takes it  with the secret key and gives you an encrypted token and stoers it in  cookies

//           return userData;
//         }

//         return null;
//       },
//     }),
//     Google,
//   ],
//   session: {
//     strategy: "jwt",
//   },

//   pages: {
//     signIn: "/login",
//   },
// };
// export const { handlers, auth, signIn, signOut } = NextAuth(authJsConfig);
