"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("./entities/user.entity");
const post_entity_1 = require("./entities/post.entity");
const comment_entity_1 = require("./entities/comment.entity");
const category_entity_1 = require("./entities/category.entity");
const auth_controller_1 = require("./controllers/auth.controller");
const post_controller_1 = require("./controllers/post.controller");
const comment_controller_1 = require("./controllers/comment.controller");
const category_controller_1 = require("./controllers/category.controller");
const jwt_strategy_1 = require("./strategies/jwt.strategy");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'blog.db',
                entities: [user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment, category_entity_1.Category],
                synchronize: true,
            }),
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment, category_entity_1.Category]),
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: 'your-secret-key-change-in-production',
                signOptions: { expiresIn: '7d' },
            }),
        ],
        controllers: [
            auth_controller_1.AuthController,
            post_controller_1.PostController,
            comment_controller_1.CommentController,
            category_controller_1.CategoryController,
        ],
        providers: [jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map