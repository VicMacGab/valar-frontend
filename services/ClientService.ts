import axios from "axios";
import { SignInDTO } from "utils/dtos/SignIn";
import { SignUpDTO } from "utils/dtos/SignUp";
import CommonService from "./CommonService";

class ClientService {
  static async signUp(body: SignUpDTO) {
    return await axios.post(CommonService.signupUrl, body);
  }
  static async signIn(body: SignInDTO) {
    return await axios.post(CommonService.signinUrl, body);
  }
  static async findUserByUsername(username: string) {
    return await axios.get(
      `${CommonService.searchUserByUsernameUrl}/${username}`
    );
  }
}

export default ClientService;
