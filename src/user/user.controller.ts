import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.creatdto';
import { UuidUtil } from '../_common/uuid.util';

import { User } from '@prisma/client';
import { IMessage } from '../_common/message.interface';
import { IRequest } from '../_common/Interface/request.interface';
import { UpdateUserDto } from './user.update.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userservice: UserService) {}

  /* 회원가입 */
  @Post()
  async create(@Body() data: CreateUserDto): Promise<IMessage> {
    return await this.userservice.create(data);
  }

  /* 회원정보 전체조회 */
  @Get()
  async findUser(): Promise<User[] | undefined> {
    return await this.userservice.findUser();
  }

  /* 회원정보 단일조회 */
  @Get(':id')
  async findByUser(@Param('id') id: string): Promise<User> {
    return await this.userservice.findByUser(id);
  }

  /* 회원정보 수정 */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<IMessage> {
    // return await this.userservice.update(id, data.nickname, data.address, data.subAddress);
    const { nickname, address, subAddress } = data;
    return this.userservice.update(id, nickname, address, subAddress);
  }

  /* 회원 삭제 */
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<IMessage> {
    return await this.userservice.delete(id);
  }
}
