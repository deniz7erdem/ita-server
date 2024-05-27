import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { loginClientDto } from './dto/loginClient.dto';
import { ClientService } from 'src/client/client.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private clientService: ClientService,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: loginDto) {
    console.log(loginDto);

    const user = await this.userService.findOneByEmail(loginDto.email);
    console.log(user);

    if (!user) {
      throw new UnauthorizedException('Wrong mail/password');
    }
    if (await bcrypt.compare(loginDto.password, user.password)) {
      const { password, ...res } = user;
      return { access_token: await this.jwtService.signAsync(res) };
    }
    throw new UnauthorizedException('Wrong mail/password');
  }

  async loginClient(loginClientDto: loginClientDto) {
    const client = await this.clientService.findOneByToken(
      loginClientDto.token,
    );
    if (!client) {
      throw new UnauthorizedException('Wrong token');
    }
    if (loginClientDto.token == client.token) {
      const { token, ...res } = client;
      return { access_token: this.jwtService.sign(res) };
    }
    throw new UnauthorizedException('Wrong token');
  }
}
