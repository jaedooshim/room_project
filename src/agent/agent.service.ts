import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAgentDto } from './agent.createdto';
import { IMessage } from '../_common/message.interface';
import { IFindAgent } from './agent.interface';
import { UuidUtil } from '../_common/uuid.util';
import { Agent } from '@prisma/client';
import { validate as validateUUID } from 'uuid-validate';

@Injectable()
export class AgentService {
  constructor(private prisma: PrismaService) {}

  /* 중개인 회원가입 */
  async create(data: CreateAgentDto): Promise<IMessage> {
    const { tel } = data;
    // 전화번호 중복 검증
    const existingTel = await this.prisma.agent.findUnique({ where: { tel } });
    if (existingTel) throw new HttpException('이미 사용중인 전화번호입니다. 다시 한번 확인해주세요.', 403);
    await this.prisma.agent.create({ data });
    return { message: '회원가입이 완료되었습니다.' };
  }

  /* 중개인 전체조회 */
  async findAllAgent(): Promise<IFindAgent[] | undefined> {
    const agents = await this.prisma.agent.findMany();
    const encodedAgentId = agents.map((agent) => {
      return {
        ...agent,
        Id: UuidUtil.toBase62(agent.id),
      };
    });
    return encodedAgentId;
  }

  /* 중개인 개별조회 */
  async findByAgent(uuid: string): Promise<Agent> {
    // uuid 인코딩
    const agent = (await this.prisma.agent.findUnique({ where: { id: uuid } })) as IFindAgent;
    if (!agent) throw new NotFoundException('등록된 중개인이 존재하지 않습니다.');
    agent.Id = UuidUtil.toBase62(agent.id);
    return agent;
  }
  // base62 디코딩
  async getFindByAgent(decodeId: string): Promise<Agent> {
    let uuid;
    if (!validateUUID(decodeId)) {
      throw new Error('유효하지 않은 UUID 값입니다.');
    }
    try {
      uuid = UuidUtil.fromBase62(decodeId);
    } catch (err) {
      console.error(err);
      throw new Error('유효하지 않은 uuid 값입니다.');
    }
    const agent = (await this.prisma.agent.findUnique({ where: { id: uuid } })) as IFindAgent;
    agent.Id = decodeId;
    return agent;
  }

  /* 중개인 소속수정 */
  async updateAgent(id: string, company: string): Promise<IMessage> {
    const agent = await this.prisma.agent.findUnique({ where: { id } });
    if (!agent) {
      throw new NotFoundException('등록된 중개인이 존재하지 않습니다.');
    }
    agent.company = company;
    await this.prisma.agent.update({ where: { id }, data: { company: company } });
    return { message: '중개인의 정보가 정상적으로 수정되었습니다.' };
  }

  /* 중개인 삭제 */
  async deleteAgent(id: string): Promise<IMessage> {
    const existingAgent = await this.prisma.agent.findUnique({ where: { id } });
    if (!existingAgent) {
      throw new NotFoundException('존재하지 않는 중개인입니다.');
    }
    await this.prisma.agent.delete({ where: { id } });
    return { message: '중개인 삭제처리가 완료되었습니다.' };
  }
}
