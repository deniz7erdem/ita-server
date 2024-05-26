import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { loginClientDto } from './dto/loginClient.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  loginUser(@Body() loginDto: loginDto) {
    return this.authService.loginUser(loginDto);
  }

  @Public()
  @Post('loginClient')
  loginClient(@Body() loginDto: loginClientDto) {
    return this.authService.loginClient(loginDto);
  }
}
