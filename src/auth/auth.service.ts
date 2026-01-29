import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../common/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    // Create the user
    const user = await this.usersService.create(createUserDto);

    // Return simple response
    return { message: 'User registered', userId: user.id };
  }

  async login(email: string, password: string) {
    // Find user by email
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare password
    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) throw new UnauthorizedException('Invalid credentials');

    // Sign JWT
    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    return { access_token };
  }
}
