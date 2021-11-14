import axios, { Axios, AxiosError, AxiosResponse } from "axios";
import { SignUpDTO } from "utils/dtos/SignUp";
import CommonService from "./CommonService";

class ClientService {
  static async signUp(body: SignUpDTO): Promise<AxiosResponse | any> {
    try {
      const res = await axios.post(CommonService.signupUrl, body);
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default ClientService;
