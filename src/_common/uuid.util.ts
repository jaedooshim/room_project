import { v4 as uuidv4, parse as uuidParse, stringify as uuidStringify } from 'uuid';
// import * as Base62 from 'base62/lib/ascii';
import * as baseX from 'base-x';

const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const base62 = baseX(BASE62);
export class UuidUtil {
  // uuid 형식을 받아 base62 으로 인코딩
  static toBase62(uuid: string): string {
    if (!this.isValidUuid(uuid)) {
      throw new Error('유효하지않은 UUID 입니다.');
    }
    const bytes = uuidParse(uuid);
    console.log(bytes);
    const buffer = Buffer.from(bytes.buffer);
    const encoded = base62.encode(buffer);
    console.log(encoded);
    return encoded;
  }

  // base62 형식을 받아 uuid 로 디코딩
  static fromBase62(encoded: string): string {
    if (!this.isValidBase62(encoded)) {
      throw new Error(' 유효하지 않은 Base62 값입니다.');
    }
    const decoded = base62.decode(encoded);
    if (decoded.length !== 16) {
      throw new Error('디코딩된 값의 길이가 올바르지 않습니다.');
    }
    const bytes = new Uint8Array(decoded);
    return uuidStringify(bytes);
  }

  static generateUuid(): string {
    return uuidv4();
  }

  // 입력된 uuid가 유효한지 검증
  static isValidUuid(uuid: string): boolean {
    // 해당 문자열 인코딩 문자열 검사
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  }

  // 입력된 base62가 유효한지 검증
  static isValidBase62(str: string): boolean {
    // 해당 문자열 인코딩 문자열 검사
    return /^[0-9a-zA-Z]+$/.test(str);
  }
}
