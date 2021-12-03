class CommonService {
  static readonly baseUrl: string = process.env.BACKEND_URL!;
  static readonly signinUrl: string = CommonService.baseUrl + "/auth/signin";
  static readonly signupUrl: string = CommonService.baseUrl + "/auth/signup";
  static readonly authCodeUrl: string = CommonService.baseUrl + "/auth/code";
  static readonly logoutUrl: string = CommonService.baseUrl + "/auth/logout";
  static readonly sendRequestUrl: string =
    CommonService.baseUrl + "/requests/send";
  static readonly acceptRequestUrl: string =
    CommonService.baseUrl + "/requests/accept";
  static readonly declineRequestUrl: string =
    CommonService.baseUrl + "/requests/decline";
  static readonly outgoingRequestsUrl: string =
    CommonService.baseUrl + "/requests/sent";
  static readonly incomingRequestsUrl: string =
    CommonService.baseUrl + "/requests/received";
  static readonly searchUserByUsernameUrl: string =
    CommonService.baseUrl + "/user";
}

export default CommonService;
