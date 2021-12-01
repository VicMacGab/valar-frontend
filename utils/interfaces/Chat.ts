import { Message } from "./Message";
import { User } from "./User";

export interface Chat {
  _id: string;
  user1: string | User;
  user2: string | User;
  messages: Message[];
}
