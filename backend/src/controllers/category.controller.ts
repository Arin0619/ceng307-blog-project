import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Tüm kategorileri getir (herkes görebilir)
  @Get()
  async getAllCategories() {
    const categories = await this.categoryRepository.find({
      relations: ['posts'],
    });
    return categories;
  }

  // Tek bir kategoriyi getir
  @Get(':id')
  async getCategory(@Param('id') id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: ['posts', 'posts.author'],
    });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  // Yeni kategori oluştur (sadece teacher)
  @Post()
  @UseGuards(JwtAuthGuard)
  async createCategory(@Request() req, @Body() body: { name: string; description?: string }) {
    // Sadece teacher kategori oluşturabilir
    if (req.user.role !== 'teacher') {
      throw new HttpException('Only teachers can create categories', HttpStatus.FORBIDDEN);
    }

    const category = this.categoryRepository.create({
      name: body.name,
      description: body.description,
    });

    await this.categoryRepository.save(category);

    return {
      message: 'Category created successfully',
      category,
    };
  }

  // Kategoriyi güncelle (sadece teacher)
  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async updateCategory(@Request() req, @Param('id') id: number, @Body() body: { name?: string; description?: string }) {
    if (req.user.role !== 'teacher') {
      throw new HttpException('Only teachers can update categories', HttpStatus.FORBIDDEN);
    }

    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    if (body.name) category.name = body.name;
    if (body.description) category.description = body.description;

    await this.categoryRepository.save(category);

    return {
      message: 'Category updated successfully',
      category,
    };
  }

  // Kategoriyi sil (sadece teacher)
  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Request() req, @Param('id') id: number) {
    if (req.user.role !== 'teacher') {
      throw new HttpException('Only teachers can delete categories', HttpStatus.FORBIDDEN);
    }

    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }

    await this.categoryRepository.remove(category);

    return {
      message: 'Category deleted successfully',
    };
  }
}
