export interface User {
  _id: string;
  username: string;
  password?: string;
  email: string;
  verified: boolean;
}
