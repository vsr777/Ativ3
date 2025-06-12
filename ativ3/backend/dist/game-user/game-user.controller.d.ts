import { GameUserService } from './game-user.service';
import { CreateGameUserDto, UpdateGameUserDto } from './game-user.dto';
import { GameUser } from './game-user.entity';
export declare class GameUserController {
    private readonly gameUserService;
    constructor(gameUserService: GameUserService);
    findAll(): Promise<GameUser[]>;
    findOne(id: string): Promise<GameUser>;
    create(createGameUserDto: CreateGameUserDto): Promise<GameUser>;
    update(id: string, updateGameUserDto: UpdateGameUserDto): Promise<GameUser>;
    remove(id: string): Promise<void>;
}
