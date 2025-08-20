import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(email: string, password: string) {
    if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
      throw new UnauthorizedException('Identifiants invalides');
    }

    const payload = { email, role: 'admin' };
    return { access_token: this.jwtService.sign(payload) };
  }
}