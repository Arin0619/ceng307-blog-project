import { User } from './user.entity';
import { Category } from './category.entity';
import { Comment } from './comment.entity';
export declare class Post {
    id: number;
    title: string;
    content: string;
    imageUrl: string;
    likes: number;
    createdAt: Date;
    updatedAt: Date;
    author: User;
    authorId: number;
    category: Category;
    categoryId: number;
    comments: Comment[];
}
