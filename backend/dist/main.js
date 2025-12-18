"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.setGlobalPrefix('api');
    await app.listen(5000);
    console.log('🚀 Backend is running on http://localhost:5000');
    console.log('📚 API Endpoints: http://localhost:5000/api');
}
bootstrap();
//# sourceMappingURL=main.js.map