// users/users.controller.ts
import { Controller, Get, Param, NotFoundException, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Get all users
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  // Get a single user by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.usersService.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  // Find user by email
  @Get('by-email')
  async findByEmail(@Query('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
