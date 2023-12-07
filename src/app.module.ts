import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AgentModule } from './agent/agent.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'process';
console.log(process.env);
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, PrismaModule, AgentModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
