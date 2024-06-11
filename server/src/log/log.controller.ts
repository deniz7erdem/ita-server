import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { Client } from 'src/client/entities/client.entity';
import { ClientDecorator } from 'src/auth/decorators/client.decorator';

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @Roles(Role.Client)
  create(
    @Body() createLogDto: CreateLogDto,
    @ClientDecorator() client: Client,
  ) {
    createLogDto.client = client;
    return this.logService.create(createLogDto);
  }


  @Get(':id')
  @Roles(Role.Admin)
  findOneByClientId(@Param('id') id: string) {
    return this.logService.findOneByClientId(+id);
  }
}
