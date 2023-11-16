import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './user.creatdto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { IMessage } from '../_common/message.interface';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /* 회원가입 */
  async create(data: CreateUserDto): Promise<IMessage> {
    const { nickname, email, tel } = data;
    // 닉네임 중복검사
    const existNickname = await this.prisma.user.findUnique({ where: { nickname } });
    if (existNickname) throw new HttpException('이미 사용중인 닉네임입니다. 새로운 닉네임을 입력해주세요.', 403);
    // 이메일 중복검사
    const existEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existEmail) throw new HttpException('이미 사용중인 이메일입니다. 새로운 이메일을 입력해주세요.', 403);
    // 전화번호 중복검사
    const existTel = await this.prisma.user.findUnique({ where: { tel } });
    if (existTel) throw new HttpException('이미 사용중인 전화번호입니다. 다시 한번 확인해주세요.', 403);
    // 비밀번호 암호화
    data.password = await bcrypt.hash(data.password, 10);
    await this.prisma.user.create({ data });
    return { message: '회원가입이 완료되었습니다.' };
  }

  /* 회원정보 전체조회 */
  async findUser(): Promise<User[] | undefined> {
    return await this.prisma.user.findMany();
  }

  /* 회원정보 단일조회 */
  async findByUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new HttpException('사용자를 찾을 수 없습니다.', 403);
    return user;
  }

  /* 회원정보 수정 */
  async update(id: string, nickname: string, address: string, subAddress: string): Promise<IMessage> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('등록된 회원이 존재하지 않습니다.');
    }
    // 닉네임 중복검사
    const existNickName = await this.prisma.user.findUnique({ where: { nickname } });
    if (existNickName) throw new NotFoundException('이미 사용중인 닉네임입니다.');

    user.nickname = nickname;
    user.address = address;
    user.subAddress = subAddress;
    await this.prisma.user.update({
      where: { id },
      data: { nickname: nickname, address: address, subAddress: subAddress },
    });
    // console.log(id);
    return { message: '회원정보가 정상적으로 수정되었습니다.' };
  }

  /* 회원 삭제 */
  async delete(id: string): Promise<IMessage> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException('존재하지 않는 회원입니다.');
    }
    await this.prisma.user.delete({ where: { id } });
    return { message: '회원 삭제가 완료되었습니다.' };
  }
}
