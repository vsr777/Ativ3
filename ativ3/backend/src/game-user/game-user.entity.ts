import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class GameUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 100 })
  email: string;

  @Column({ type: 'varchar', length: 100, select: false })
  password: string;

  @Column({ default: 0 })
  level: number;

  @Column({ default: 0 })
  experience: number;

  @Column({ default: 1000 })
  coins: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true, type: 'varchar', length: 255 })
  avatarUrl: string;

  @Column({ default: 'user' })
  role: string;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  gameStats: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true, default: [] })
  achievements: any[];

  @Column({ type: 'jsonb', nullable: true, default: [] })
  inventory: any[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}