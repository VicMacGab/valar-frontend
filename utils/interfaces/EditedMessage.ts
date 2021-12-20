export interface EditedMessage {
  msgId: string;
  newContent: Uint8Array;
  msgIdx: number;
  chatId: string;
  newNonce?: Uint8Array;
}
