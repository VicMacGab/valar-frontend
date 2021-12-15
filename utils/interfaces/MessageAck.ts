export interface MessageAck {
  ok: boolean;
  _id: string;
  error: unknown;
  timestamp?: Date;
}
