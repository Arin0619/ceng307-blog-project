import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Post } from './post.entity';
import { Comment } from './comment.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({ default: 'student' }) // 'student' veya 'teacher'
  role: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  // Kullanıcının yazdığı yazılar (sadece teacher için)
  @OneToMany(() => Post, post => post.author)
  posts: Post[];

  // Kullanıcının yaptığı yorumlar
  @OneToMany(() => Comment, comment => comment.user)
  comments: Comment[];
}
