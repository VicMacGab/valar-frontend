import axios, { AxiosRequestConfig } from "axios";
import { SignInDTO } from "@utils/dtos/SignIn";
import { SignUpDTO } from "@utils/dtos/SignUp";
import CommonService from "@services/CommonService";
import { Message } from "@utils/interfaces/Message";

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
  static async sendChatRequest(body: { username: string }) {
    return await axios.post(
      CommonService.sendRequestUrl,
      body,
      this.axiosOptions
    );
  }
  static async acceptChatRequest(body: { username: string }) {
    return await axios.post(
      CommonService.acceptRequestUrl,
      body,
      this.axiosOptions
    );
  }
  static async declineChatRequest(body: { username: string }) {
    return await axios.post(
      CommonService.declineRequestUrl,
      body,
      this.axiosOptions
    );
  }
  static async getOutgoingRequests() {
    return await axios.get(
      CommonService.outgoingRequestsUrl,
      this.axiosOptions
    );
  }
  static async getIncomingRequests() {
    return await axios.get(
      CommonService.incomingRequestsUrl,
      this.axiosOptions
    );
  }
  static async getAllChats() {
    return await axios.get(CommonService.getAllChatsUrl, this.axiosOptions);
  }
  static async getChatById(chatId: string) {
    return await axios.post(
      CommonService.getChatByIdUrl,
      { chatId },
      this.axiosOptions
    );
  }
  static async sendMessage(chatId: string, message: Message) {
    return await axios.put(
      CommonService.chatsUrl,
      { chatId: chatId, message: message },
      this.axiosOptions
    );
  }
}

export default ClientService;
