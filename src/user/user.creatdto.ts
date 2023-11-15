import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator';

class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(4)
  @MinLength(2)
  @Matches(/[가-힣]/)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(8)
  @MinLength(2)
  @Matches(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/)
  nickname: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(16)
  @MinLength(8)
  @Matches(/^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])/)
  password: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  @Matches(/^01(?:0|1|[6-9])-(?:\d{3}|\d{4})-\d{4}$/)
  tel: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  subAddress: string;

  @IsBoolean()
  @IsNotEmpty()
  role: boolean;
}
export { CreateUserDto };
