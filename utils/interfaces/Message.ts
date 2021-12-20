export interface Message {
  nonce: Uint8Array;
  usernameFrom: string;
  chatId: string;

  content: Uint8Array;
  _id: string;
  timestamp?: Date;

  fromMe?: boolean;
  edited?: boolean;
  deleted?: boolean;
}
