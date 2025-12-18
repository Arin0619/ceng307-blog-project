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
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
const jwt_auth_guard_1 = require("../guards/jwt-auth.guard");
let CommentController = class CommentController {
    constructor(commentRepository) {
        this.commentRepository = commentRepository;
    }
    async getCommentsByPost(postId) {
        const comments = await this.commentRepository.find({
            where: { postId },
            relations: ['user'],
            order: { createdAt: 'DESC' },
        });
        return comments;
    }
    async createComment(req, body) {
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
    async deleteComment(req, id) {
        const comment = await this.commentRepository.findOne({ where: { id } });
        if (!comment) {
            throw new common_1.HttpException('Comment not found', common_1.HttpStatus.NOT_FOUND);
        }
        if (comment.userId !== req.user.id && req.user.role !== 'teacher') {
            throw new common_1.HttpException('You can only delete your own comments', common_1.HttpStatus.FORBIDDEN);
        }
        await this.commentRepository.remove(comment);
        return {
            message: 'Comment deleted successfully',
        };
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Get)('post/:postId'),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getCommentsByPost", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createComment", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "deleteComment", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CommentController);
//# sourceMappingURL=comment.controller.js.map