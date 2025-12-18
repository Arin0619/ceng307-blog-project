import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
export declare class CategoryController {
    private categoryRepository;
    constructor(categoryRepository: Repository<Category>);
    getAllCategories(): Promise<Category[]>;
    getCategory(id: number): Promise<Category>;
    createCategory(req: any, body: {
        name: string;
        description?: string;
    }): Promise<{
        message: string;
        category: Category;
    }>;
    updateCategory(req: any, id: number, body: {
        name?: string;
        description?: string;
    }): Promise<{
        message: string;
        category: Category;
    }>;
    deleteCategory(req: any, id: number): Promise<{
        message: string;
    }>;
}
