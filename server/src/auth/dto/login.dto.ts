import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class loginDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
