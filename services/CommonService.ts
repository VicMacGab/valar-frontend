class CommonService {
  static readonly baseUrl: string = "http://localhost:5000/api";
  static readonly signinUrl: string = CommonService.baseUrl + "/auth/signin";
  static readonly signupUrl: string = CommonService.baseUrl + "/auth/signup";
  static readonly searchUserByUsernameUrl: string =
    CommonService.baseUrl + "/user/search";
}

export default CommonService;
