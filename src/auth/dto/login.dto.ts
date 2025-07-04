import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ description: 'email' })
  @IsString()
  @IsDefined()
  email: string;

  @IsString()
  @IsDefined()
  @ApiProperty({ description: 'пароль' })
  password: string;
}
