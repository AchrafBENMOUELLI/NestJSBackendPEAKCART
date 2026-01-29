import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../common/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.userRepo.create({ ...createUserDto, password: hashedPassword });
    return await this.userRepo.save(user);
  }

  async findByEmail(email: string) {
    return await this.userRepo.findOneBy({ email });
  }

  async findAll() {
    return await this.userRepo.find();
  }

  async findById(id: string) {
    return await this.userRepo.findOne({ where: { id } });
  }
}
