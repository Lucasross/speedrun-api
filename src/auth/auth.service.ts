import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(login: LoginDto) {
    if (login.password !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { role: 'admin' };
    return { access_token: this.jwtService.sign(payload) };
  }
}