import { BaseEntity, Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
import { Token } from './Token';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({})
  password: string;

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToOne(() => Token, (token) => token.user)
  refreshToken: Token;
}
