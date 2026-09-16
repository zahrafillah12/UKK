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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../common/guards/user.guard");
const update_coworking_profile_dto_1 = require("./dto/update-coworking-profile.dto");
const create_member_admin_dto_1 = require("./dto/create-member-admin.dto");
const update_member_admin_dto_1 = require("./dto/update-member-admin.dto");
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    getProfile(req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.getProfile(req.user.sub);
    }
    updateProfile(dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.updateProfile(req.user.sub, dto);
    }
    findAllMembers(search, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.findAllMembers(search);
    }
    createMember(dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.createMember(dto);
    }
    findOneMember(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.findOneMember(+id);
    }
    updateMember(id, dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.updateMember(+id, dto);
    }
    removeMember(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.removeMember(+id);
    }
    getMonthlyReport(month, year, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.getMonthlyReport(req.user.sub, month, year);
    }
    getIncomeReport(month, year, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.adminService.getIncomeReport(req.user.sub, month, year);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Data Profil Lokasi Coworking Space' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Put)('profile'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Data Profil Lokasi Coworking Space' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_coworking_profile_dto_1.UpdateCoworkingProfileDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)('members'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar Semua Member / Pelanggan Coworking' }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false }),
    __param(0, (0, common_1.Query)('search')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findAllMembers", null);
__decorate([
    (0, common_1.Post)('members'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah Data Member Baru' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_member_admin_dto_1.CreateMemberAdminDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createMember", null);
__decorate([
    (0, common_1.Get)('members/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Detail Data Member Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "findOneMember", null);
__decorate([
    (0, common_1.Put)('members/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Data Member / Pelanggan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_member_admin_dto_1.UpdateMemberAdminDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateMember", null);
__decorate([
    (0, common_1.Delete)('members/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus Data Member / Pelanggan' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "removeMember", null);
__decorate([
    (0, common_1.Get)('reports/monthly'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Rekapitulasi Estimasi & Realisasi Pendapatan Per Bulan'
    }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getMonthlyReport", null);
__decorate([
    (0, common_1.Get)('reports/income'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Alias Rekapitulasi Pendapatan Bulanan' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getIncomeReport", null);
exports.AdminController = AdminController = __decorate([
    (0, swagger_1.ApiTags)('Panel Admin Space'),
    (0, common_1.Controller)('api/admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map