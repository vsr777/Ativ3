import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GameUser } from './game-user.entity';
import { CreateGameUserDto, UpdateGameUserDto } from './game-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class GameUserService {
  constructor(
    @InjectRepository(GameUser)
    private gameUserRepository: Repository<GameUser>,
  ) {}

  async findAll(): Promise<GameUser[]> {
    return this.gameUserRepository.find({ 
      select: ['id', 'username', 'email', 'level', 'experience', 'coins', 'isActive', 'avatarUrl', 'role', 'gameStats', 'achievements', 'inventory', 'createdAt', 'updatedAt'] 
    });
  }

  async findOne(id: number): Promise<GameUser> {
    const user = await this.gameUserRepository.findOne({ 
      where: { id },
      select: ['id', 'username', 'email', 'level', 'experience', 'coins', 'isActive', 'avatarUrl', 'role', 'gameStats', 'achievements', 'inventory', 'createdAt', 'updatedAt']
    });
    
    if (!user) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    
    return user;
  }

  async create(createGameUserDto: CreateGameUserDto): Promise<GameUser> {
    const newUser = this.gameUserRepository.create(createGameUserDto);
    
    // Hash de senha
    if (newUser.password) {
      const salt = await bcrypt.genSalt();
      newUser.password = await bcrypt.hash(newUser.password, salt);
    }
    
    return this.gameUserRepository.save(newUser);
  }

  async update(id: number, updateGameUserDto: UpdateGameUserDto): Promise<GameUser> {
    const user = await this.findOne(id);
    
    // Hash de senha se fornecida
    if (updateGameUserDto.password) {
      const salt = await bcrypt.genSalt();
      updateGameUserDto.password = await bcrypt.hash(updateGameUserDto.password, salt);
    }
    
    const updatedUser = Object.assign(user, updateGameUserDto);
    await this.gameUserRepository.save(updatedUser);
    
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.gameUserRepository.remove(user);
  }
}