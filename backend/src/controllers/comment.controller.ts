import { Controller, Get, Post, Delete, Body, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('comments')
export class CommentController {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}


  @Get('post/:postId')
  async getCommentsByPost(@Param('postId') postId: number) {
    const comments = await this.commentRepository.find({
      where: { postId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
    return comments;
  }


  @Post()
  @UseGuards(JwtAuthGuard)
  async createComment(@Request() req, @Body() body: { content: string; postId: number }) {
    const comment = this.commentRepository.create({
      content: body.content,
      postId: body.postId,
      userId: req.user.id,
    });

    await this.commentRepository.save(comment);

    return {
      message: 'Comment added successfully',
      comment,
    };
  }


  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteComment(@Request() req, @Param('id') id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });

    if (!comment) {
      throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
    }

    
    if (comment.userId !== req.user.id && req.user.role !== 'teacher') {
      throw new HttpException('You can only delete your own comments', HttpStatus.FORBIDDEN);
    }

    await this.commentRepository.remove(comment);

    return {
      message: 'Comment deleted successfully',
    };
  }
}
