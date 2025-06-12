"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameUserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const game_user_entity_1 = require("./game-user.entity");
const bcrypt = require("bcrypt");
let GameUserService = class GameUserService {
    gameUserRepository;
    constructor(gameUserRepository) {
        this.gameUserRepository = gameUserRepository;
    }
    async findAll() {
        return this.gameUserRepository.find({
            select: ['id', 'username', 'email', 'level', 'experience', 'coins', 'isActive', 'avatarUrl', 'role', 'gameStats', 'achievements', 'inventory', 'createdAt', 'updatedAt']
        });
    }
    async findOne(id) {
        const user = await this.gameUserRepository.findOne({
            where: { id },
            select: ['id', 'username', 'email', 'level', 'experience', 'coins', 'isActive', 'avatarUrl', 'role', 'gameStats', 'achievements', 'inventory', 'createdAt', 'updatedAt']
        });
        if (!user) {
            throw new common_1.NotFoundException(`Usuário com ID ${id} não encontrado`);
        }
        return user;
    }
    async create(createGameUserDto) {
        const newUser = this.gameUserRepository.create(createGameUserDto);
        if (newUser.password) {
            const salt = await bcrypt.genSalt();
            newUser.password = await bcrypt.hash(newUser.password, salt);
        }
        return this.gameUserRepository.save(newUser);
    }
    async update(id, updateGameUserDto) {
        const user = await this.findOne(id);
        if (updateGameUserDto.password) {
            const salt = await bcrypt.genSalt();
            updateGameUserDto.password = await bcrypt.hash(updateGameUserDto.password, salt);
        }
        const updatedUser = Object.assign(user, updateGameUserDto);
        await this.gameUserRepository.save(updatedUser);
        return this.findOne(id);
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.gameUserRepository.remove(user);
    }
};
exports.GameUserService = GameUserService;
exports.GameUserService = GameUserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(game_user_entity_1.GameUser)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], GameUserService);
//# sourceMappingURL=game-user.service.js.map