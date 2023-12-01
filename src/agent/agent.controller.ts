import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AgentService } from './agent.service';
import { CreateAgentDto } from './agent.createdto';
import { IMessage } from '../_common/message.interface';
import { Agent } from '@prisma/client';
import { IFindAgent } from './agent.interface';
import { UpdateAgentDto } from './agent.update.dto';

@Controller('agent')
export class AgentController {
  constructor(private readonly agentservice: AgentService) {}

  /* 중개인 회원가입 */
  @Post()
  async create(@Body() data: CreateAgentDto): Promise<IMessage> {
    return await this.agentservice.create(data);
  }

  /* 중개인 전체조회 */
  @Get()
  async findAllAgent(): Promise<Agent[] | undefined> {
    return await this.agentservice.findAllAgent();
  }

  /* 중개인 개별조회 */
  @Get(':id')
  async findByAgent(@Param('id') id: string): Promise<IFindAgent> {
    if (id.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/)) {
      return this.agentservice.findByAgent(id);
    } else {
      return this.agentservice.getFindByAgent(id);
    }
  }

  /* 중개인 소속수정 */
  @Patch(':id')
  async updateAgent(@Param('id') id: string, @Body() data: UpdateAgentDto): Promise<IMessage> {
    const { company } = data;
    return this.agentservice.updateAgent(id, company);
  }

  /* 중개인 삭제 */
  @Delete(':id')
  async deleteAgent(@Param('id') id: string): Promise<IMessage> {
    return await this.agentservice.deleteAgent(id);
  }
}
