import { Role } from 'src/auth/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  token: string;

  @Column({ default: Role.Client })
  Role: Role;
}
