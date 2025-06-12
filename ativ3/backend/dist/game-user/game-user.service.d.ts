import { Repository } from 'typeorm';
import { GameUser } from './game-user.entity';
import { CreateGameUserDto, UpdateGameUserDto } from './game-user.dto';
export declare class GameUserService {
    private gameUserRepository;
    constructor(gameUserRepository: Repository<GameUser>);
    findAll(): Promise<GameUser[]>;
    findOne(id: number): Promise<GameUser>;
    create(createGameUserDto: CreateGameUserDto): Promise<GameUser>;
    update(id: number, updateGameUserDto: UpdateGameUserDto): Promise<GameUser>;
    remove(id: number): Promise<void>;
}
