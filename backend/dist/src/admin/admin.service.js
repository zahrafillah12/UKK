"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
let AdminService = class AdminService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getProfile(userId) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            throw new common_1.NotFoundException('Profile not found');
        return {
            id: owner.id,
            nama_coworking: owner.nama_coworking,
            nama_pemilik: owner.nama_pemilik,
            telp: owner.telp
        };
    }
    async updateProfile(userId, dto) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            throw new common_1.NotFoundException('Profile not found');
        const updated = await this.prisma.spaceOwner.update({
            where: { id: owner.id },
            data: dto
        });
        return {
            id: updated.id,
            nama_coworking: updated.nama_coworking,
            nama_pemilik: updated.nama_pemilik,
            telp: updated.telp
        };
    }
    async findAllMembers(search) {
        const where = {};
        if (search) {
            where.OR = [
                { nama_member: { contains: search } },
                { instansi: { contains: search } },
                { telp: { contains: search } },
            ];
        }
        const members = await this.prisma.member.findMany({
            where,
            include: { user: true }
        });
        return members.map((m) => ({
            id: m.id,
            nama_member: m.nama_member,
            instansi: m.instansi,
            alamat: m.alamat,
            telp: m.telp,
            foto: m.foto
        }));
    }
    async createMember(dto) {
        const existing = await this.prisma.user.findFirst({
            where: { username: dto.username }
        });
        if (existing)
            throw new common_1.BadRequestException('Username sudah ada');
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                role: 'member',
                member: {
                    create: {
                        nama_member: dto.nama_member,
                        instansi: dto.instansi,
                        alamat: dto.alamat,
                        telp: dto.telp,
                        foto: dto.foto
                    }
                }
            },
            include: { member: true }
        });
        return {
            id: user.member.id,
            nama_member: user.member.nama_member,
            instansi: user.member.instansi,
            alamat: user.member.alamat,
            telp: user.member.telp,
            foto: user.member.foto
        };
    }
    async findOneMember(id) {
        const member = await this.prisma.member.findFirst({
            where: { id },
            include: { user: true }
        });
        if (!member)
            throw new common_1.NotFoundException('Member tidak ditemukan');
        return {
            id: member.id,
            nama_member: member.nama_member,
            instansi: member.instansi,
            alamat: member.alamat,
            telp: member.telp,
            foto: member.foto
        };
    }
    async updateMember(id, dto) {
        const member = await this.prisma.member.findFirst({
            where: { id },
            include: { user: true }
        });
        if (!member)
            throw new common_1.NotFoundException('Member tidak ditemukan');
        const updateData = {};
        if (dto.nama_member)
            updateData.nama_member = dto.nama_member;
        if (dto.instansi)
            updateData.instansi = dto.instansi;
        if (dto.alamat)
            updateData.alamat = dto.alamat;
        if (dto.telp)
            updateData.telp = dto.telp;
        if (dto.foto)
            updateData.foto = dto.foto;
        const updated = await this.prisma.member.update({
            where: { id: member.id },
            data: updateData
        });
        if (dto.password) {
            const hashedPassword = await bcrypt.hash(dto.password, 10);
            await this.prisma.user.update({
                where: { id: member.id_user },
                data: { password: hashedPassword }
            });
        }
        return {
            id: updated.id,
            nama_member: updated.nama_member,
            instansi: updated.instansi,
            alamat: updated.alamat,
            telp: updated.telp
        };
    }
    async removeMember(id) {
        const member = await this.prisma.member.findFirst({
            where: { id }
        });
        if (!member)
            throw new common_1.NotFoundException('Member tidak ditemukan');
        await this.prisma.user.delete({
            where: { id: member.id_user }
        });
        return { id, deleted: true };
    }
    async getMonthlyReport(userId, month, year) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            throw new common_1.NotFoundException('Space Owner not found');
        const y = year || new Date().getFullYear().toString();
        const m = month ? month.padStart(2, '0') : new Date().getMonth() + 1 + '';
        const prefix = `${y}-${m}`;
        const reservasi = await this.prisma.reservasi.findMany({
            where: {
                status: 'selesai',
                tanggal_reservasi: { startsWith: prefix },
                detail: { space: { id_owner: owner.id } }
            },
            include: { detail: { include: { space: true } } }
        });
        const total_transaksi = reservasi.length;
        const total_jam_terpakai = reservasi.reduce((sum, item) => sum + item.durasi_jam, 0);
        const estimasi_pendapatan_kotor = reservasi.reduce((sum, item) => sum + item.detail.total_harga_awal, 0);
        const total_potongan_diskon = reservasi.reduce((sum, item) => sum + item.detail.potongan_diskon, 0);
        const realisasi_pendapatan_bersih = reservasi.reduce((sum, item) => sum + item.detail.total_bayar, 0);
        const rincianMap = {};
        reservasi.forEach((res) => {
            const tipe = res.detail.space.tipe;
            if (!rincianMap[tipe]) {
                let label = tipe;
                if (tipe === 'desk')
                    label = 'Personal Desk';
                if (tipe === 'meeting_room')
                    label = 'Meeting Room';
                if (tipe === 'private_office')
                    label = 'Private Office';
                rincianMap[tipe] = {
                    tipe,
                    label,
                    total_booking: 0,
                    total_jam: 0,
                    total_pendapatan: 0
                };
            }
            rincianMap[tipe].total_booking += 1;
            rincianMap[tipe].total_jam += res.durasi_jam;
            rincianMap[tipe].total_pendapatan += res.detail.total_bayar;
        });
        return {
            month: parseInt(m),
            year: parseInt(y),
            total_transaksi,
            total_jam_terpakai,
            estimasi_pendapatan_kotor,
            total_potongan_diskon,
            realisasi_pendapatan_bersih,
            rincian_per_tipe_space: Object.values(rincianMap)
        };
    }
    async getIncomeReport(userId, month, year) {
        const report = await this.getMonthlyReport(userId, month, year);
        return {
            month: report.month,
            year: report.year,
            realisasi_pendapatan_bersih: report.realisasi_pendapatan_bersih
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map