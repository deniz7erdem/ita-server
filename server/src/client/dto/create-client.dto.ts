import { Role } from 'src/auth/role.enum';
import { User } from 'src/user/entities/user.entity';

export class CreateClientDto {
  name: string;
  token?: string;
  role?: Role;
}
