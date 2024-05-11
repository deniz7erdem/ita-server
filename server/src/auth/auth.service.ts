import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async loginUser(loginDto: loginDto) {
    const user = await this.userService.findOneByEmail(loginDto.mail);
    if (!user) {
      throw new UnauthorizedException('Wrong mail/password');
    }
    if (await bcrypt.compare(loginDto.password, user.password)) {
      const { password, ...res } = user;
      return { access_token: await this.jwtService.signAsync(res) };
    }
    throw new UnauthorizedException('Wrong mail/password');
  }
}
