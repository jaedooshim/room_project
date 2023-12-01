import { Agent as PrismaAgent } from '@prisma/client';

export interface IFindAgent extends PrismaAgent {
  Id?: string;
}
