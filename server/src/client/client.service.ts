import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}
  async create(createClientDto: CreateClientDto) {
    const generatedtoken = this.generateToken(10);
    const client = await this.clientRepository.findOne({
      where: { token: generatedtoken },
    });
    if (client) {
      this.create(createClientDto);
    }
    createClientDto.token = generatedtoken;

    return this.clientRepository.save(createClientDto);
  }

  findAll() {
    return this.clientRepository.find({
      select: ['id', 'name', 'os','ip', 'createdAt','lastActiveAt'],
    });
  }

  findOne(id: number) {
    return this.clientRepository.findOneBy({ id });
  }

  findOneByToken(token: string) {
    return this.clientRepository.findOne({ where: { token } });
  }

  update(id: number, updateClientDto: UpdateClientDto) {
    return `This action updates a #${id} client`;
  }

  updateOS(id: number, os: string) {
    return this.clientRepository.update({ id }, { os });
  }

  updateIP(id: number, ip: string) {
    return this.clientRepository.update({ id }, { ip });
  }

  updateLastActiveAt(id: number) {
    return this.clientRepository.update({ id }, { lastActiveAt: new Date() });
  }

  remove(id: number) {
    return this.clientRepository.softDelete(id);
  }

  generateToken(length) {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
}
