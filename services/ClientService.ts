import axios, { AxiosRequestConfig } from "axios";
import { SignInDTO } from "@utils/dtos/SignIn";
import { SignUpDTO } from "@utils/dtos/SignUp";
import CommonService from "@services/CommonService";

class ClientService {
  private static axiosOptions: AxiosRequestConfig = {
    withCredentials: true, // esto es para que mande los HTTP only cookies automaticamente
  };

  static async signUp(body: SignUpDTO) {
    return await axios.post(CommonService.signupUrl, body, this.axiosOptions);
  }
  static async signIn(body: SignInDTO) {
    return await axios.post(CommonService.signinUrl, body, this.axiosOptions);
  }
  static async verifyAuthCode(authCode: number) {
    return await axios.get(
      `${CommonService.authCodeUrl}/${authCode}`,
      this.axiosOptions
    );
  }
  static async logout() {
    return await axios.post(CommonService.logoutUrl, {}, this.axiosOptions);
  }
  static async findUserByUsername(username: string) {
    return await axios.get(
      `${CommonService.searchUserByUsernameUrl}/${username}`,
      this.axiosOptions
    );
  }
}

export default ClientService;
