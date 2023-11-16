import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(8)
  @MinLength(2)
  @Matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/)
  nickname: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  subAddress: string;
}

export { UpdateUserDto };
