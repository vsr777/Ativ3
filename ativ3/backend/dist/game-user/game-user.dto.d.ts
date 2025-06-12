export declare class CreateGameUserDto {
    username: string;
    email: string;
    password: string;
    avatarUrl?: string;
    level?: number;
    experience?: number;
    coins?: number;
    role?: string;
    gameStats?: Record<string, any>;
    achievements?: any[];
    inventory?: any[];
}
export declare class UpdateGameUserDto {
    username?: string;
    email?: string;
    password?: string;
    avatarUrl?: string;
    level?: number;
    experience?: number;
    coins?: number;
    isActive?: boolean;
    role?: string;
    gameStats?: Record<string, any>;
    achievements?: any[];
    inventory?: any[];
}
