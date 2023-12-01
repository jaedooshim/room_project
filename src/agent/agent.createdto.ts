import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class CreateAgentDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[가-힣]/)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  @Matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
  tel: string;

  @IsString()
  @IsNotEmpty()
  company: string;
}

export { CreateAgentDto };
