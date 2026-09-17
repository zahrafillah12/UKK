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
exports.DiskonController = void 0;
const common_1 = require("@nestjs/common");
const diskon_service_1 = require("./diskon.service");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../common/guards/user.guard");
const check_promo_dto_1 = require("./dto/check-promo.dto");
const create_diskon_dto_1 = require("./dto/create-diskon.dto");
const update_diskon_dto_1 = require("./dto/update-diskon.dto");
let DiskonController = class DiskonController {
    diskonService;
    constructor(diskonService) {
        this.diskonService = diskonService;
    }
    findActivePublic(req) {
        return this.diskonService.findActivePublic();
    }
    checkPromo(dto, req) {
        return this.diskonService.checkPromo(dto);
    }
    findOnePublic(id, req) {
        return this.diskonService.findOnePublic(+id);
    }
    findAllAdmin(req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.diskonService.findAllAdmin(req.user.sub);
    }
    createAdmin(dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.diskonService.createAdmin(dto);
    }
    findOneAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.diskonService.findOneAdmin(+id);
    }
    updateAdmin(id, dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.diskonService.updateAdmin(+id, dto);
    }
    removeAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.diskonService.removeAdmin(+id);
    }
};
exports.DiskonController = DiskonController;
__decorate([
    (0, common_1.Get)('api/diskon/active'),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar Promo / Diskon yang Sedang Aktif' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "findActivePublic", null);
__decorate([
    (0, common_1.Post)('api/diskon/check'),
    (0, swagger_1.ApiOperation)({ summary: 'Periksa Validitas & Hitung Potongan Kode Promo' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [check_promo_dto_1.CheckPromoDto, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "checkPromo", null);
__decorate([
    (0, common_1.Get)('api/diskon/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Detail Diskon Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "findOnePublic", null);
__decorate([
    (0, common_1.Get)('api/admin/diskon'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar Semua Kode Promo / Diskon Event' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Post)('api/admin/diskon'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah Kode Promo / Event Diskon Baru' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_diskon_dto_1.CreateDiskonDto, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Get)('api/admin/diskon/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Detail Data Diskon Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "findOneAdmin", null);
__decorate([
    (0, common_1.Put)('api/admin/diskon/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Data Kode Promo & Periode Diskon' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_diskon_dto_1.UpdateDiskonDto, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Delete)('api/admin/diskon/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus Kode Promo / Diskon' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], DiskonController.prototype, "removeAdmin", null);
exports.DiskonController = DiskonController = __decorate([
    (0, swagger_1.ApiTags)('Diskon & Promo'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [diskon_service_1.DiskonService])
], DiskonController);
//# sourceMappingURL=diskon.controller.js.map