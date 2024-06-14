import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { Log } from './entities/log.entity';
import { Between, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(Log)
    private logRepository: Repository<Log>,
  ) {}
  create(createLogDto: CreateLogDto) {
    return this.logRepository.save(createLogDto);
  }

  findOneByClientId(id: number) {
    let now = new Date();
    let tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() - 1);
    return this.logRepository.find({
      where: { client: { id }, 
      // createdAt: Between(tomorrow, now)
     },
      order: { createdAt: 'ASC' },
      take: 20,
    });
  }
}
