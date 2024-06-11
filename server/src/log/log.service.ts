import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private clientRepository: Repository<Log>,
  ) {}
  create(createLogDto: CreateLogDto) {
    return this.clientRepository.save(createLogDto);
  }

  findOneByClientId(id: number) {
    return this.clientRepository.findOne({ where: { client: { id } } });
  }
}
