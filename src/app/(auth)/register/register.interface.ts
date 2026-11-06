import * as zod from 'zod'
import { registerSchema } from './register.zod';


export type RegisterDataTypeInterface = zod.infer<typeof registerSchema>;




export interface RegisterResponseType {
  message: string 
  user: User;
  token: string;
  statusMsg: string;
}

export interface User {
  name: string;
  email: string;
  password : string,
  rePassword : string,
  phone : string,
  role: string;
}


// insted of this data

// export interface Root {
//   name: string;
//   email: string;
//   password: string;
//   rePassword: string;
//   phone: string;
// }
