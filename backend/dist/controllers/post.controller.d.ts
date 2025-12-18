import { Repository } from 'typeorm';
import { Post as PostEntity } from '../entities/post.entity';
export declare class PostController {
    private postRepository;
    constructor(postRepository: Repository<PostEntity>);
    getAllPosts(): Promise<PostEntity[]>;
    getPost(id: number): Promise<PostEntity>;
    createPost(req: any, body: {
        title: string;
        content: string;
        imageUrl?: string;
        categoryId: number;
    }): Promise<{
        message: string;
        post: PostEntity;
    }>;
    updatePost(req: any, id: number, body: {
        title?: string;
        content?: string;
        imageUrl?: string;
        categoryId?: number;
    }): Promise<{
        message: string;
        post: PostEntity;
    }>;
    deletePost(req: any, id: number): Promise<{
        message: string;
    }>;
    likePost(id: number): Promise<{
        message: string;
        likes: number;
    }>;
}
