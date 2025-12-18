import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
export declare class CommentController {
    private commentRepository;
    constructor(commentRepository: Repository<Comment>);
    getCommentsByPost(postId: number): Promise<Comment[]>;
    createComment(req: any, body: {
        content: string;
        postId: number;
    }): Promise<{
        message: string;
        comment: Comment;
    }>;
    deleteComment(req: any, id: number): Promise<{
        message: string;
    }>;
}
