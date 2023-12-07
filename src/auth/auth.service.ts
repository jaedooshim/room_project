import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { AuthLoginDto } from './auth.login.dto';
import { IMessage } from '../_common/message.interface';
const envFilePath = path.resolve(__dirname, 'auth', '.env');
dotenv.config({ path: envFilePath });

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  // 토큰 생성
  private createToken(user: any) {
    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload);
  }

  /* 일반 로그인 */
  async login(loginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    try {
      const { email, password } = loginDto;
      // 유저 존재하지 않을 때
      const user = await this.prisma.user.findUnique({ where: { email } });
      if (!user) throw new NotFoundException('존재하지 않는 이메일입니다.');
      // 비밀번호 비교 후 일치하지 않을 떄
      if (!(await bcrypt.compare(password, user.password)))
        throw new NotFoundException('비밀번호가 일치하지 않습니다.');
      // 유저 토큰생성(Secret + Payload)
      const payload = { email };
      const accessToken = await this.jwtService.sign(payload);

      return { accessToken };
    } catch (err) {
      console.error(err.message);
    }
  }
}
