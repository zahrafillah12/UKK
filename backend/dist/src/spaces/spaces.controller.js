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
exports.SpacesController = void 0;
const common_1 = require("@nestjs/common");
const spaces_service_1 = require("./spaces.service");
const swagger_1 = require("@nestjs/swagger");
const user_guard_1 = require("../common/guards/user.guard");
const create_space_dto_1 = require("./dto/create-space.dto");
const update_space_dto_1 = require("./dto/update-space.dto");
let SpacesController = class SpacesController {
    spacesService;
    constructor(spacesService) {
        this.spacesService = spacesService;
    }
    getTypes() {
        return this.spacesService.getTypes();
    }
    getAvailability(id_space, tanggal, jam_mulai, durasi_jam, req) {
        return this.spacesService.getAvailability(+id_space, tanggal, jam_mulai, +durasi_jam);
    }
    findAllPublic(tipe, search, req) {
        return this.spacesService.findAllPublic(tipe, search);
    }
    findOnePublic(id, req) {
        return this.spacesService.findOnePublic(+id);
    }
    findAllAdmin(req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.spacesService.findAllAdmin(req.user.sub);
    }
    createAdmin(dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.spacesService.createAdmin(dto, req.user.sub);
    }
    findOneAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.spacesService.findOneAdmin(+id, req.user.sub);
    }
    updateAdmin(id, dto, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.spacesService.updateAdmin(+id, dto, req.user.sub);
    }
    removeAdmin(id, req) {
        if (req.user.role !== 'admin_space')
            throw new Error('Unauthorized');
        return this.spacesService.removeAdmin(+id, req.user.sub);
    }
};
exports.SpacesController = SpacesController;
__decorate([
    (0, common_1.Get)('api/spaces/types'),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar Tipe Space' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "getTypes", null);
__decorate([
    (0, common_1.Get)('api/spaces/availability'),
    (0, swagger_1.ApiOperation)({ summary: 'Cek Ketersediaan Space Berdasarkan Tanggal & Jam' }),
    (0, swagger_1.ApiQuery)({ name: 'id_space', type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'tanggal', type: String }),
    (0, swagger_1.ApiQuery)({ name: 'jam_mulai', type: String }),
    (0, swagger_1.ApiQuery)({ name: 'durasi_jam', type: Number }),
    __param(0, (0, common_1.Query)('id_space')),
    __param(1, (0, common_1.Query)('tanggal')),
    __param(2, (0, common_1.Query)('jam_mulai')),
    __param(3, (0, common_1.Query)('durasi_jam')),
    __param(4, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Number, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "getAvailability", null);
__decorate([
    (0, common_1.Get)('api/spaces'),
    (0, swagger_1.ApiOperation)({
        summary: 'Lihat Semua Space Coworking (Katalog Meja/Ruangan)'
    }),
    (0, swagger_1.ApiQuery)({ name: 'tipe', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'search', required: false, type: String }),
    __param(0, (0, common_1.Query)('tipe')),
    __param(1, (0, common_1.Query)('search')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "findAllPublic", null);
__decorate([
    (0, common_1.Get)('api/spaces/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lihat Detail Space Coworking Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "findOnePublic", null);
__decorate([
    (0, common_1.Get)('api/admin/spaces'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Daftar Semua Ruangan & Meja Milik Admin' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "findAllAdmin", null);
__decorate([
    (0, common_1.Post)('api/admin/spaces'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Tambah Ruangan / Meja Space Baru' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_space_dto_1.CreateSpaceDto, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Get)('api/admin/spaces/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Detail Data Space Berdasarkan ID' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "findOneAdmin", null);
__decorate([
    (0, common_1.Put)('api/admin/spaces/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Update Data Ruangan & Fasilitas Space' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_space_dto_1.UpdateSpaceDto, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Delete)('api/admin/spaces/:id'),
    (0, common_1.UseGuards)(user_guard_1.UserGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ summary: 'Hapus Data Ruangan / Meja Space' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], SpacesController.prototype, "removeAdmin", null);
exports.SpacesController = SpacesController = __decorate([
    (0, swagger_1.ApiTags)('Space Coworking'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [spaces_service_1.SpacesService])
], SpacesController);
//# sourceMappingURL=spaces.controller.js.map