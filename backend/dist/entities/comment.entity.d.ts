import { User } from './user.entity';
import { Post } from './post.entity';
export declare class Comment {
    id: number;
    content: string;
    createdAt: Date;
    user: User;
    userId: number;
    post: Post;
    postId: number;
}
