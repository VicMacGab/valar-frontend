import { User } from "./User";

export interface OutgoingRequest {
  _id: string;
  user: User;
  accepted: boolean;
  peerPublicPart: Buffer; // g^b mod p
  p: Buffer;
  g: Buffer;
}
