import { IsNotEmpty, IsString } from 'class-validator';

class UpdateAgentDto {
  @IsString()
  @IsNotEmpty()
  company: string;
}

export { UpdateAgentDto };
