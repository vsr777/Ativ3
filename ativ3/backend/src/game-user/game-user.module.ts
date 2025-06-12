import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameUserController } from './game-user.controller';
import { GameUserService } from './game-user.service';
import { GameUser } from './game-user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GameUser])],
  controllers: [GameUserController],
  providers: [GameUserService],
  exports: [GameUserService],
})
export class GameUserModule {}