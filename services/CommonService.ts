class CommonService {
  static readonly baseUrl: string = process.env.BACKEND_URL!;
  static readonly wsUrl: string = process.env.WS_URL!;

  static readonly authUrl: string = CommonService.baseUrl + "/auth";
  static readonly signinUrl: string = CommonService.authUrl + "/signin";
  static readonly signupUrl: string = CommonService.authUrl + "/signup";
  static readonly authCodeUrl: string = CommonService.authUrl + "/code";
  static readonly logoutUrl: string = CommonService.authUrl + "/logout";

  static readonly requestsUrl: string = CommonService.baseUrl + "/requests";

  static readonly sendRequestUrl: string = CommonService.requestsUrl + "/send";
  static readonly acceptRequestUrl: string =
    CommonService.requestsUrl + "/accept";
  static readonly declineRequestUrl: string =
    CommonService.requestsUrl + "/decline";
  static readonly outgoingRequestsUrl: string =
    CommonService.requestsUrl + "/sent";
  static readonly incomingRequestsUrl: string =
    CommonService.requestsUrl + "/received";

  static readonly searchUserByUsernameUrl: string =
    CommonService.baseUrl + "/user";
  static readonly chatsUrl: string = CommonService.baseUrl + "/chats";
  static readonly getAllChatsUrl: string = CommonService.chatsUrl + "/all";
  static readonly getChatByIdUrl: string = CommonService.chatsUrl;
  static readonly editMessageUrl: string =
    CommonService.chatsUrl + "/editMessage";
  static readonly deleteMessageUrl: string =
    CommonService.chatsUrl + "/deleteMessage";
}

export default CommonService;
