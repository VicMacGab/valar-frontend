class CommonService {
  static readonly baseUrl: string = process.env.BACKEND_URL!;
  static readonly signinUrl: string = CommonService.baseUrl + "/auth/signin";
  static readonly signupUrl: string = CommonService.baseUrl + "/auth/signup";
  static readonly authCodeUrl: string = CommonService.baseUrl + "/auth/code";
  static readonly logoutUrl: string = CommonService.baseUrl + "/auth/logout";
  static readonly searchUserByUsernameUrl: string =
    CommonService.baseUrl + "/user";
}

export default CommonService;
