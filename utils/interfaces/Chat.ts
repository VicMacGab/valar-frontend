import { Message } from "./Message";
import { User } from "./User";

export interface Chat {
  chatId: {
    _id: string;
    user1?: {
      _id: string;
      username: string;
    };
    user2?: {
      _id: string;
      username: string;
    };
  };
}
