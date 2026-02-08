import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Add CORS to allow frontend to connect
  app.enableCors({
    origin: 'http://localhost:3001', // Your Next.js frontend URL
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
