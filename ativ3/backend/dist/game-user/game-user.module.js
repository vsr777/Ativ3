"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameUserModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const game_user_controller_1 = require("./game-user.controller");
const game_user_service_1 = require("./game-user.service");
const game_user_entity_1 = require("./game-user.entity");
let GameUserModule = class GameUserModule {
};
exports.GameUserModule = GameUserModule;
exports.GameUserModule = GameUserModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([game_user_entity_1.GameUser])],
        controllers: [game_user_controller_1.GameUserController],
        providers: [game_user_service_1.GameUserService],
        exports: [game_user_service_1.GameUserService],
    })
], GameUserModule);
//# sourceMappingURL=game-user.module.js.map