class CommonService {
  static readonly baseUrl: string = "http://localhost:5000/api";
  static readonly signInUrl: string = CommonService.baseUrl + "/user/signin";
  static readonly signUpUrl: string = CommonService.baseUrl + "/user/signup";
  static readonly searchUserByUsernameUrl: string =
    CommonService.baseUrl + "/user/search";
}

export default CommonService;
