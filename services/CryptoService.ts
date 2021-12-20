type ChatId = string;

class CryptoService {
  static readonly KEY_FORMAT = "raw";
  static readonly CIPHER_MODE = "AES-CTR";
  static readonly EXTRACTABLE = true;
  static readonly LENGTH = 128;

  keys: Map<ChatId, CryptoKey>;
  encoder: TextEncoder;
  decoder: TextDecoder;

  constructor() {
    this.keys = new Map<string, CryptoKey>();
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  private fromHexString = (hexString: string) =>
    new Uint8Array(
      hexString.match(/.{1,2}/g)!.map((byte: any) => parseInt(byte, 16))
    );

  async init(chatId: string, key: string): Promise<void> {
    if (!this.keys.has(chatId)) {
      const cryptoKey = await crypto.subtle.importKey(
        CryptoService.KEY_FORMAT,
        this.fromHexString(key),
        CryptoService.CIPHER_MODE,
        CryptoService.EXTRACTABLE,
        ["encrypt", "decrypt"]
      );
      this.keys.set(chatId, cryptoKey);
    } else {
      console.log(`cryptoKey for ${chatId} already initialized`);
    }
  }

  private encode(text: string): Uint8Array {
    return this.encoder.encode(text);
  }

  private decode(text: Uint8Array): string {
    return this.decoder.decode(text);
  }

  async encrypt(
    chatId: string,
    plaintext: string
  ): Promise<[Uint8Array, Uint8Array]> {
    if (this.keys.has(chatId)) {
      const plaintextBytes = this.encode(plaintext);
      const [ciphertextBytes, nonce] = await this.encryptByteArray(
        chatId,
        plaintextBytes
      );
      return [ciphertextBytes, nonce];
    } else {
      throw new Error("must initialize crypto key before encrypting");
    }
  }

  async decrypt(
    chatId: string,
    ciphertext: Uint8Array,
    nonce: Uint8Array
  ): Promise<string> {
    if (this.keys.has(chatId)) {
      const plaintextBytes = await this.decryptByteArray(
        chatId,
        ciphertext,
        nonce
      );
      return this.decode(plaintextBytes);
    } else {
      throw new Error("must initialize crypto key before decrypting");
    }
  }

  async encryptByteArray(
    chatId: string,
    plaintext: Uint8Array
  ): Promise<[Uint8Array, Uint8Array]> {
    const nonce = crypto.getRandomValues(new Uint8Array(16));
    const cipherBytes = await crypto.subtle.encrypt(
      {
        name: CryptoService.CIPHER_MODE,
        counter: nonce,
        length: CryptoService.LENGTH,
      },
      this.keys.get(chatId)!,
      plaintext
    );
    return [cipherBytes, nonce];
  }

  async decryptByteArray(
    chatId: string,
    ciphertext: Uint8Array,
    nonce: Uint8Array
  ): Promise<Uint8Array> {
    // console.log("decrypting with nonce: ", nonce);
    if (!(nonce instanceof ArrayBuffer) && typeof nonce === "object") {
      // console.log("nonce instance of array", nonce);
      nonce = Uint8Array.from(nonce);
      console.log(nonce.byteLength);
    }
    const plainBytes = await crypto.subtle.decrypt(
      {
        name: CryptoService.CIPHER_MODE,
        counter: nonce,
        length: CryptoService.LENGTH,
      },
      this.keys.get(chatId)!,
      ciphertext
    );
    return plainBytes;
  }
}

export default new CryptoService();
