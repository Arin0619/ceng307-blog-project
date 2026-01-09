import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}


  @Post('register')
  async register(@Body() body: { email: string; password: string; name: string; role: string }) {
    
    const existingUser = await this.userRepository.findOne({ where: { email: body.email } });
    if (existingUser) {
      throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    }


    const hashedPassword = await bcrypt.hash(body.password, 10);


    const user = this.userRepository.create({
      email: body.email,
      password: hashedPassword,
      name: body.name,
      role: body.role || 'student',
    });

    await this.userRepository.save(user);


    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });

    return {
      message: 'User registered successfully',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  }


  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
   
    const user = await this.userRepository.findOne({ where: { email: body.email } });
    if (!user) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }


    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    
    const token = this.jwtService.sign({ id: user.id, email: user.email, role: user.role });

    return {
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name, role: user.role },
      token,
    };
  }
}
