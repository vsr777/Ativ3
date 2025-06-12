export declare class GameUser {
    id: number;
    username: string;
    email: string;
    password: string;
    level: number;
    experience: number;
    coins: number;
    isActive: boolean;
    avatarUrl: string;
    role: string;
    gameStats: Record<string, any>;
    achievements: any[];
    inventory: any[];
    createdAt: Date;
    updatedAt: Date;
}
