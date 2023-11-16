import { v4 as uuidv4, parse as uuidParse, stringify as uuidStringify } from 'uuid';
import * as Base62 from 'base62/lib/ascii';

export class UuidUtil {
  static toBase62(uuid: string): string {
    if (!this.isValidUuid(uuid)) {
      throw new Error('유효하지않은 UUID 입니다.');
    }
    const bytes = uuidParse(uuid);
    return Base62.encode(bytes);
  }

  static fromBase62(encoded: string): string {
    if (!this.isValidBase62(encoded)) {
      throw new Error(' 유효하지 않은 Base62 값입니다.');
    }
    const bytes = Base62.decode(encoded);
    return uuidStringify(bytes);
  }

  static generateUuid(): string {
    return uuidv4();
  }

  static isValidUuid(uuid: string): boolean {
    // 해당 문자열 인코딩 문자열 검사
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  }

  static isValidBase62(str: string): boolean {
    // 해당 문자열 인코딩 문자열 검사
    return /^[0-9a-zA-Z]+$/.test(str);
  }
}
