import { Body, Controller, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.creatdto';
import { User } from '@prisma/client';
import { IMessage } from '../_common/message.interface';
import { UpdateUserDto } from './user.update.dto';
import { IFindUser } from './user.interface';

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
  async findByUser(@Param('id') id: string): Promise<IFindUser> {
    // 인코딩 함수
    if (id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      return this.userservice.findByUser(id);
    } else {
      // 디코딩 함수
      return this.userservice.getFindByUser(id);
    }
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
