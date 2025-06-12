import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { GameUserService } from './game-user.service';
import { CreateGameUserDto, UpdateGameUserDto } from './game-user.dto';
import { GameUser } from './game-user.entity';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class GameUserController {
  constructor(private readonly gameUserService: GameUserService) {}

  @Get()
  findAll(): Promise<GameUser[]> {
    return this.gameUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GameUser> {
    return this.gameUserService.findOne(+id);
  }

  @Post()
  create(@Body() createGameUserDto: CreateGameUserDto): Promise<GameUser> {
    return this.gameUserService.create(createGameUserDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateGameUserDto: UpdateGameUserDto): Promise<GameUser> {
    return this.gameUserService.update(+id, updateGameUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string): Promise<void> {
    return this.gameUserService.remove(+id);
  }
}