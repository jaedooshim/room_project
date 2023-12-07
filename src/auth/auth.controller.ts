import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './auth.login.dto';
import { AuthGuard } from '@nestjs/passport';
import { DUser } from '../_common/decorator/user.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authservice: AuthService) {}

  /* 일반 로그인 */
  @Post('login')
  async login(@Body(ValidationPipe) loginDto: AuthLoginDto): Promise<{ accessToken }> {
    return this.authservice.login(loginDto);
  }

  // 커스텀 데코 테스트
  @Post('test')
  @UseGuards(AuthGuard())
  test(@DUser() user: User) {
    console.log('user', user);
  }
}
