import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class loginClientDto {
  @ApiProperty()
  @IsString()
  token: string;
}
