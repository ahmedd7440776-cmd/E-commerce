
import { LoginDataTypeInterface } from "./Login.interface";
import { handleUserLogin } from "./login.action";

export async function sendUserDataLogin(userData: LoginDataTypeInterface) {
const res = await handleUserLogin(userData);
if (res === 'User logged successfuly'){
    return res
}
 throw new Error(res)

}