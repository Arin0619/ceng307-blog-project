import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS ayarları - Frontend'in backend'e erişmesi için
  app.enableCors({
  origin: [
    'http://localhost:3000',
    'https://ceng307-blog-project.vercel.app',
    'https://ceng307-blog-project-git-main-arins-projects-03227804.vercel.app',
    'https://ceng307-blog-project-npt8tqsl0-arins-projects-03227804.vercel.app'
  ],
  credentials: true,
});

  // Validasyon pipe'ı
  app.useGlobalPipes(new ValidationPipe());

  // API prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
await app.listen(port);
console.log(`🚀 Backend is running on port ${port}`);
}

bootstrap();
