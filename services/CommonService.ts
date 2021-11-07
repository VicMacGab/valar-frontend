class CommonService {
  static readonly baseUrl: string = "http://localhost:5000/api";
  static readonly signInUrl: string = ""; // TODO
  static readonly signUpUrl: string = CommonService.baseUrl + "/user";
}

export default CommonService;
