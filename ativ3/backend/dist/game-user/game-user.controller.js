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
exports.GameUserController = void 0;
const common_1 = require("@nestjs/common");
const game_user_service_1 = require("./game-user.service");
const game_user_dto_1 = require("./game-user.dto");
let GameUserController = class GameUserController {
    gameUserService;
    constructor(gameUserService) {
        this.gameUserService = gameUserService;
    }
    findAll() {
        return this.gameUserService.findAll();
    }
    findOne(id) {
        return this.gameUserService.findOne(+id);
    }
    create(createGameUserDto) {
        return this.gameUserService.create(createGameUserDto);
    }
    update(id, updateGameUserDto) {
        return this.gameUserService.update(+id, updateGameUserDto);
    }
    remove(id) {
        return this.gameUserService.remove(+id);
    }
};
exports.GameUserController = GameUserController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GameUserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameUserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [game_user_dto_1.CreateGameUserDto]),
    __metadata("design:returntype", Promise)
], GameUserController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, game_user_dto_1.UpdateGameUserDto]),
    __metadata("design:returntype", Promise)
], GameUserController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GameUserController.prototype, "remove", null);
exports.GameUserController = GameUserController = __decorate([
    (0, common_1.Controller)('users'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    __metadata("design:paramtypes", [game_user_service_1.GameUserService])
], GameUserController);
//# sourceMappingURL=game-user.controller.js.map