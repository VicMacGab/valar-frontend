import axios, { AxiosRequestConfig } from "axios";
import { SignInDTO } from "@utils/dtos/SignIn";
import { SignUpDTO } from "@utils/dtos/SignUp";
import CommonService from "@services/CommonService";
import { Message } from "@utils/interfaces/Message";

class ClientService {
  private static axiosOptions: AxiosRequestConfig = {
    withCredentials: true, // esto es para que mande los HTTP only cookies automaticamente
    headers: {
      origin: "https://cliffdev.com",
    },
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
  static async sendChatRequest(body: {
    username: string;
    pubKey: Buffer;
    g: Buffer;
    p: Buffer;
  }) {
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
      { chatId, message },
      this.axiosOptions
    );
  }
  static async editMessage(content: string, messageId: string) {
    return await axios.put(
      CommonService.editMessageUrl,
      { content, messageId },
      this.axiosOptions
    );
  }
  static async deleteMessage(messageId: string) {
    return await axios.put(
      CommonService.deleteMessageUrl,
      { messageId },
      this.axiosOptions
    );
  }
  static async sendPubKeyUrl(body: {
    p: number[];
    g: number[];
    pubKey: number[];
    friendUsername: string;
  }) {
    return await axios.put(
      CommonService.sendPubKeyUrl,
      body,
      this.axiosOptions
    );
  }
  static async finish(body: { friendUsername: string; friendId: string }) {
    return await axios.put(
      CommonService.finishExchangeUrl,
      body,
      this.axiosOptions
    );
  }
}

export default ClientService;
