"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const post_entity_1 = require("../entities/post.entity");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let PostController = class PostController {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async getAllPosts() {
        const posts = await this.postRepository.find({
            relations: ['author', 'category', 'comments'],
            order: { createdAt: 'DESC' },
        });
        return posts;
    }
    async getPost(id) {
        const post = await this.postRepository.findOne({
            where: { id },
            relations: ['author', 'category', 'comments', 'comments.user'],
        });
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        return post;
    }
    async createPost(req, body) {
        if (req.user.role !== 'teacher') {
            throw new common_1.HttpException('Only teachers can create posts', common_1.HttpStatus.FORBIDDEN);
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
    async updatePost(req, id, body) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (post.authorId !== req.user.id) {
            throw new common_1.HttpException('You can only update your own posts', common_1.HttpStatus.FORBIDDEN);
        }
        if (body.title)
            post.title = body.title;
        if (body.content)
            post.content = body.content;
        if (body.imageUrl)
            post.imageUrl = body.imageUrl;
        if (body.categoryId)
            post.categoryId = body.categoryId;
        post.updatedAt = new Date();
        await this.postRepository.save(post);
        return {
            message: 'Post updated successfully',
            post,
        };
    }
    async deletePost(req, id) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (post.authorId !== req.user.id) {
            throw new common_1.HttpException('You can only delete your own posts', common_1.HttpStatus.FORBIDDEN);
        }
        await this.postRepository.remove(post);
        return {
            message: 'Post deleted successfully',
        };
    }
    async likePost(id) {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
            throw new common_1.HttpException('Post not found', common_1.HttpStatus.NOT_FOUND);
        }
        post.likes += 1;
        await this.postRepository.save(post);
        return {
            message: 'Post liked',
            likes: post.likes,
        };
    }
};
exports.PostController = PostController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getAllPosts", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "getPost", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "createPost", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "updatePost", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "deletePost", null);
__decorate([
    (0, common_1.Post)(':id/like'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PostController.prototype, "likePost", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('posts'),
    __param(0, (0, typeorm_1.InjectRepository)(post_entity_1.Post)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostController);
//# sourceMappingURL=post.controller.js.map