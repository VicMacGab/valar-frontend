export interface Message {
  usernameFrom: string;
  content: string;
  fromMe?: boolean;
  _id?: string;
  edited?: boolean;
  deleted?: boolean;
  timestamp?: Date;
}
