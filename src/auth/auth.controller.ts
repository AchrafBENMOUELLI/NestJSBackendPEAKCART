import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserSchema } from '../common/dto/create-user.dto';
import type { CreateUserDto } from '../common/dto/create-user.dto';
import { loginSchema } from '../common/dto/login.dto';
import type { LoginDto } from '../common/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
}
