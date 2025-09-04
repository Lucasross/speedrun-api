import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiProperty, ApiBody } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'password123' })
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }
}
