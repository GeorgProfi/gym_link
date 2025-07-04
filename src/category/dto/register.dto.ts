import { IsDefined, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  @IsDefined()
  email: string;

  @ApiProperty({ description: 'Пароль пользователя' })
  @IsString()
  @IsDefined()
  password: string;

  refreshToken: string;
}
