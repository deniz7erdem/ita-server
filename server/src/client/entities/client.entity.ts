import { Role } from 'src/auth/role.enum';
import { Log } from 'src/log/entities/log.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  token: string;

  @Column({ nullable: true })
  os: string;

  @Column({ nullable: true })
  ip: string;

  @Column({ nullable: true })
  lastActiveAt: Date;

  @Column({ default: Role.Client })
  role: Role;

  @OneToMany(() => Log, (log) => log.client)
  logs: Log[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
