'use client'
import { handleUserRegister } from "./register.action";
import { RegisterDataTypeInterface } from "./register.interface";

export async function sendUserDataRegister(userData: RegisterDataTypeInterface) {
 handleUserRegister(userData);

  
}