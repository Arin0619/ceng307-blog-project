import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entities/post.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  // Tüm yazıları getir (herkes görebilir)
  @Get()
  async getAllPosts() {
    const posts = await this.postRepository.find({
      relations: ['author', 'category', 'comments'],
      order: { createdAt: 'DESC' },
    });
    return posts;
  }

  // Tek bir yazıyı getir
  @Get(':id')
  async getPost(@Param('id') id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['author', 'category', 'comments', 'comments.user'],
    });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    return post;
  }

  // Yeni yazı oluştur (sadece teacher)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createPost(@Request() req, @Body() body: { title: string; content: string; imageUrl?: string; categoryId: number }) {
    // Sadece teacher yazı yazabilir
    if (req.user.role !== 'teacher') {
      throw new HttpException('Only teachers can create posts', HttpStatus.FORBIDDEN);
    }

    const post = this.postRepository.create({
      title: body.title,
      content: body.content,
      imageUrl: body.imageUrl,
      categoryId: body.categoryId,
      authorId: req.user.id,
    });

    await this.postRepository.save(post);

    return {
      message: 'Post created successfully',
      post,
    };
  }

  // Yazıyı güncelle (sadece yazarı)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updatePost(@Request() req, @Param('id') id: number, @Body() body: { title?: string; content?: string; imageUrl?: string; categoryId?: number }) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    // Sadece yazarı güncelleyebilir
    if (post.authorId !== req.user.id) {
      throw new HttpException('You can only update your own posts', HttpStatus.FORBIDDEN);
    }

    if (body.title) post.title = body.title;
    if (body.content) post.content = body.content;
    if (body.imageUrl) post.imageUrl = body.imageUrl;
    if (body.categoryId) post.categoryId = body.categoryId;
    post.updatedAt = new Date();

    await this.postRepository.save(post);

    return {
      message: 'Post updated successfully',
      post,
    };
  }

  // Yazıyı sil (sadece yazarı)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deletePost(@Request() req, @Param('id') id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    // Sadece yazarı silebilir
    if (post.authorId !== req.user.id) {
      throw new HttpException('You can only delete your own posts', HttpStatus.FORBIDDEN);
    }

    await this.postRepository.remove(post);

    return {
      message: 'Post deleted successfully',
    };
  }

  // Yazıyı beğen
  @Post(':id/like')
  @UseGuards(JwtAuthGuard)
  async likePost(@Param('id') id: number) {
    const post = await this.postRepository.findOne({ where: { id } });

    if (!post) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }

    post.likes += 1;
    await this.postRepository.save(post);

    return {
      message: 'Post liked',
      likes: post.likes,
    };
  }
}
