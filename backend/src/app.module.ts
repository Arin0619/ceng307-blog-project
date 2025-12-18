import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

// Entities
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Category } from './entities/category.entity';

// Controllers
import { AuthController } from './controllers/auth.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { CategoryController } from './controllers/category.controller';

// Strategies
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    // SQLite veritabanı bağlantısı
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      entities: [User, Post, Comment, Category],
      synchronize: true, // Otomatik tablo oluşturma (production'da false olmalı)
    }),
    // Repository'leri kullanıma aç
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    // JWT modülü
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '7d' }, // 7 gün geçerli
    }),
  ],
  controllers: [
    AuthController,
    PostController,
    CommentController,
    CategoryController,
  ],
  providers: [JwtStrategy],
})
export class AppModule {}
