export interface Message {
  _id: string;
  usernameFrom: string;
  content: string;
  fromMe?: boolean;
  edited: boolean;
  deleted: boolean;
}
