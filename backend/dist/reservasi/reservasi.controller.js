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
exports.ReservasiController = void 0;
const common_1 = require("@nestjs/common");
const reservasi_service_1 = require("./reservasi.service");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../common/guards/user.guard");
const create_reservasi_dto_1 = require("./dto/create-reservasi.dto");
const update_reservasi_status_dto_1 = require("./dto/update-reservasi-status.dto");
let ReservasiController = class ReservasiController {
    reservasiService;
    constructor(reservasiService) {
        this.reservasiService = reservasiService;
    }
    createMember(dto, req) {
        if (req.user.role !== 'member')
            throw new Error('Unauthorized');
        return this.reservasiService.createMember(dto, req.user.sub);
    }
    findAllMember(req) {
        if (req.user.role !== 'member')
            throw new Error('Unauthorized');
        return this.reservasiService.findAllMember(req.user.sub);
    }
    historyMember(month, year, req) {
        if (req.user.role !== 'member')
            throw new Error('Unauthorized');
        return this.reservasiService.historyMember(req.user.sub, month, year);
    }
    getETicket(id, req) {
        return this.reservasiService.getETicket(+id);
    }
    findOneDetail(id, req) {
        return this.reservasiService.findOneDetail(+id);
    }
    cancelMember(id, req) {
        if (req.user.role !== 'member')
            throw new Error('Unauthorized');
        return this.reservasiService.cancelMember(+id, req.user.sub);
    }
    findAllAdmin(month, year, status, id_space, tanggal, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.reservasiService.findAllAdmin(req.user.sub, {
            month,
            year,
            status,
            id_space,
            tanggal
        });
    }
    updateStatusAdmin(id, dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.reservasiService.updateStatusAdmin(+id, dto.status);
    }
    checkInAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.reservasiService.checkInAdmin(+id);
    }
    checkOutAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.reservasiService.checkOutAdmin(+id);
    }
};
exports.ReservasiController = ReservasiController;
__decorate([
    (0, common_1.Post)('api/reservasi'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Buat Pemesanan Space Baru (Member)' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_reservasi_dto_1.CreateReservasiDto, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "createMember", null);
__decorate([
    (0, common_1.Get)('api/reservasi/my'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Status Semua Pemesanan Saya (Member)' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "findAllMember", null);
__decorate([
    (0, common_1.Get)('api/reservasi/my/history'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        summary: 'Lihat Histori Pemesanan Berdasarkan Bulan & Tahun (Member)'
    }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "historyMember", null);
__decorate([
    (0, common_1.Get)('api/reservasi/:id/e-ticket'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Cetak E-Ticket / Bukti Nota Digital Reservasi' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "getETicket", null);
__decorate([
    (0, common_1.Get)('api/reservasi/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Detail Reservasi Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "findOneDetail", null);
__decorate([
    (0, common_1.Patch)('api/reservasi/:id/cancel'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Batalkan Pemesanan (Member)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "cancelMember", null);
__decorate([
    (0, common_1.Get)('api/admin/reservasi'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Seluruh Data Reservasi Coworking Space' }),
    (0, swagger_1.ApiQuery)({ name: 'month', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'year', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'status', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'id_space', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'tanggal', required: false }),
    __param(0, (0, common_1.Query)('month')),
    __param(1, (0, common_1.Query)('year')),
    __param(2, (0, common_1.Query)('status')),
    __param(3, (0, common_1.Query)('id_space')),
    __param(4, (0, common_1.Query)('tanggal')),
    __param(5, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Patch)('api/admin/reservasi/:id/status'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Konfirmasi & Ubah Status Pemesanan (Admin)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_reservasi_status_dto_1.UpdateReservasiStatusDto, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "updateStatusAdmin", null);
__decorate([
    (0, common_1.Post)('api/admin/reservasi/:id/check-in'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check-In Pelanggan (Aktif)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "checkInAdmin", null);
__decorate([
    (0, common_1.Post)('api/admin/reservasi/:id/check-out'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Check-Out Pelanggan (Selesai)' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], ReservasiController.prototype, "checkOutAdmin", null);
exports.ReservasiController = ReservasiController = __decorate([
    (0, swagger_1.ApiTags)('Reservasi Member'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [reservasi_service_1.ReservasiService])
], ReservasiController);
//# sourceMappingURL=reservasi.controller.js.map