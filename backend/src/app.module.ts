import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { Category } from './entities/category.entity';

import { AuthController } from './controllers/auth.controller';
import { PostController } from './controllers/post.controller';
import { CommentController } from './controllers/comment.controller';
import { CategoryController } from './controllers/category.controller';

import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'blog.db',
      entities: [User, Post, Comment, Category],
      synchronize: true, 
    }),
    TypeOrmModule.forFeature([User, Post, Comment, Category]),
    PassportModule,
    JwtModule.register({
      secret: 'your-secret-key-change-in-production',
      signOptions: { expiresIn: '7d' }, 
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
