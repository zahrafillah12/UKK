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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const register_member_dto_1 = require("./dto/register-member.dto");
const register_admin_space_dto_1 = require("./dto/register-admin-space.dto");
const login_user_dto_1 = require("./dto/login-user.dto");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../common/guards/user.guard");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    registerMember(dto, req) {
        return this.authService.registerMember(dto);
    }
    registerAdminSpace(dto, req) {
        return this.authService.registerAdminSpace(dto);
    }
    login(dto, req) {
        return this.authService.login(dto);
    }
    getProfile(req) {
        return this.authService.getProfile(req.user.sub);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('register/member'),
    (0, swagger_1.ApiOperation)({ summary: 'Registrasi Akun Member / Pelanggan Baru' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_member_dto_1.RegisterMemberDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerMember", null);
__decorate([
    (0, common_1.Post)('register/admin-space'),
    (0, swagger_1.ApiOperation)({
        summary: 'Registrasi Pengelola Lokasi / Admin Coworking Space'
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_admin_space_dto_1.RegisterAdminSpaceDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerAdminSpace", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, swagger_1.ApiOperation)({ summary: 'Login Akun Pengguna (Member atau Admin Space)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Profil Pengguna yang Sedang Login' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('api/auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map