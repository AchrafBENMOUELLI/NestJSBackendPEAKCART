import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';
import { User } from './users/user.entity';
import { ProductModule } from './product/product.module';
import { Product } from './product/product.entity';

// Load .env file
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User,Product],
      synchronize: true,
      logging: true,
    }),
    UsersModule,
    AuthModule,
    ProductModule,
      ],
})
export class AppModule {}
