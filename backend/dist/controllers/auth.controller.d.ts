import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(body: {
        email: string;
        password: string;
        name: string;
        role: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
        token: string;
    }>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            name: string;
            role: string;
        };
        token: string;
    }>;
}
