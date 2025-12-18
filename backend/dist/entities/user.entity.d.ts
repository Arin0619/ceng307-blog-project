import { Post } from './post.entity';
import { Comment } from './comment.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    createdAt: Date;
    posts: Post[];
    comments: Comment[];
}
