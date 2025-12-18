import { Post } from './post.entity';
export declare class Category {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    posts: Post[];
}
