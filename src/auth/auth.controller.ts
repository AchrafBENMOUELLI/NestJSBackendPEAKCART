import { Controller, Post, Body, BadRequestException, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema } from '../common/dto/create-user.dto';
import type { CreateUserDto } from '../common/dto/create-user.dto';
import { loginSchema } from '../common/dto/login.dto';
import type { LoginDto } from '../common/dto/login.dto';
import { JwtService } from '@nestjs/jwt';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
     private readonly jwtService: JwtService, // Add this
  ) {}

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const parsed = createUserSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(e => ({ field: e.path[0], message: e.message }));
      throw new BadRequestException(errors);
    }

    return await this.authService.register(parsed.data);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      const errors = parsed.error.issues.map(e => ({ field: e.path[0], message: e.message }));
      throw new BadRequestException(errors);
    }

    return await this.authService.login(parsed.data.email, parsed.data.password);
  }

  @Get('me')
async getMe(@Headers('authorization') auth: string) {
  console.log('Authorization header:', auth); // ADD THIS

  if (!auth) {
    throw new UnauthorizedException('No token provided');
  }

  const token = auth.replace('Bearer ', '');
  console.log('Extracted token:', token); // ADD THIS

  try {
    const payload = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET || 'secretKey',
    });

    console.log('Token payload:', payload); // ADD THIS

    return {
      id: payload.sub,
      email: payload.email,
      isVerified: false,
    };
  } catch (error) {
    console.log('Token verification error:', error.message); // ADD THIS
    throw new UnauthorizedException('Invalid token');
  }
}
}
