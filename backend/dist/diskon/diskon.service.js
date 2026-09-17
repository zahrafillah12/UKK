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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiskonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let DiskonService = class DiskonService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findActivePublic() {
        const now = new Date();
        return this.prisma.diskon.findMany({
            where: {
                tanggal_awal: { lte: now },
                tanggal_akhir: { gte: now }
            },
            select: {
                id: true,
                nama_diskon: true,
                persentase_diskon: true,
                tanggal_awal: true,
                tanggal_akhir: true
            }
        });
    }
    async checkPromo(dto) {
        const diskon = await this.prisma.diskon.findFirst({
            where: { nama_diskon: dto.nama_diskon }
        });
        if (!diskon) {
            throw new common_1.BadRequestException('Kode promo tidak ditemukan atau sudah kedaluwarsa!');
        }
        const now = new Date();
        if (now < diskon.tanggal_awal || now > diskon.tanggal_akhir) {
            throw new common_1.BadRequestException('Kode promo tidak ditemukan atau sudah kedaluwarsa!');
        }
        return {
            id: diskon.id,
            nama_diskon: diskon.nama_diskon,
            persentase_diskon: diskon.persentase_diskon,
            tanggal_awal: diskon.tanggal_awal,
            tanggal_akhir: diskon.tanggal_akhir,
            is_active: true
        };
    }
    async findOnePublic(id) {
        const diskon = await this.prisma.diskon.findFirst({
            where: { id }
        });
        if (!diskon)
            throw new common_1.NotFoundException('Diskon tidak ditemukan');
        return diskon;
    }
    async findAllAdmin(userId) {
        return this.prisma.diskon.findMany({
            where: {}
        });
    }
    async createAdmin(dto) {
        return this.prisma.diskon.create({
            data: {
                nama_diskon: dto.nama_diskon,
                persentase_diskon: dto.persentase_diskon,
                tanggal_awal: new Date(dto.tanggal_awal),
                tanggal_akhir: new Date(dto.tanggal_akhir)
            }
        });
    }
    async findOneAdmin(id) {
        const diskon = await this.prisma.diskon.findFirst({
            where: { id }
        });
        if (!diskon)
            throw new common_1.NotFoundException('Diskon tidak ditemukan');
        return diskon;
    }
    async updateAdmin(id, dto) {
        const diskon = await this.findOneAdmin(id);
        const dataToUpdate = {};
        if (dto.nama_diskon !== undefined)
            dataToUpdate.nama_diskon = dto.nama_diskon;
        if (dto.persentase_diskon !== undefined)
            dataToUpdate.persentase_diskon = dto.persentase_diskon;
        if (dto.tanggal_awal !== undefined)
            dataToUpdate.tanggal_awal = new Date(dto.tanggal_awal);
        if (dto.tanggal_akhir !== undefined)
            dataToUpdate.tanggal_akhir = new Date(dto.tanggal_akhir);
        return this.prisma.diskon.update({
            where: { id: diskon.id },
            data: dataToUpdate
        });
    }
    async removeAdmin(id) {
        const diskon = await this.findOneAdmin(id);
        await this.prisma.diskon.delete({
            where: { id: diskon.id }
        });
        return { id, deleted: true };
    }
};
exports.DiskonService = DiskonService;
exports.DiskonService = DiskonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DiskonService);
//# sourceMappingURL=diskon.service.js.map