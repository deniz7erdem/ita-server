import { Role } from 'src/auth/role.enum';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
