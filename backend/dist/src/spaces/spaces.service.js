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
exports.SpacesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let SpacesService = class SpacesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTypes() {
        return [
            {
                tipe: 'desk',
                label: 'Personal Desk',
                deskripsi: 'Meja kerja individual yang nyaman dengan fasilitas colokan listrik, WiFi kencang, dan air minum.'
            },
            {
                tipe: 'meeting_room',
                label: 'Meeting Room',
                deskripsi: 'Ruang rapat tertutup dengan fasilitas proyektor/TV LED, whiteboard, sound system, dan AC dingin.'
            },
            {
                tipe: 'private_office',
                label: 'Private Office',
                deskripsi: 'Ruang kantor privat eksklusif untuk tim kecil hingga menengah dengan akses fleksibel dan keamanan 24 jam.'
            },
        ];
    }
    async getAvailability(id_space, tanggal, jam_mulai, durasi_jam) {
        const space = await this.prisma.space.findFirst({
            where: { id: id_space }
        });
        if (!space)
            throw new common_1.NotFoundException('Space tidak ditemukan');
        const startHour = parseInt(jam_mulai.split(':')[0]);
        const endHour = startHour + durasi_jam;
        const jam_selesai = `${endHour.toString().padStart(2, '0')}:00`;
        const conflicts = await this.prisma.reservasi.findMany({
            where: {
                detail: { id_space: id_space },
                tanggal_reservasi: tanggal,
                status: { in: ['belum_dikonfirm', 'disetujui', 'aktif'] }
            }
        });
        for (const conflict of conflicts) {
            const conflictStart = parseInt(conflict.jam_mulai.split(':')[0]);
            const conflictEnd = conflictStart + conflict.durasi_jam;
            if (startHour < conflictEnd && endHour > conflictStart) {
                throw new common_1.NotFoundException('Maaf, space sudah terisi atau dibooking pada jam tersebut!');
            }
        }
        const harga_per_jam = space.harga_per_jam;
        const estimasi_total = harga_per_jam * durasi_jam;
        return {
            available: true,
            id_space: space.id,
            nama_space: space.nama_space,
            tanggal,
            jam_mulai,
            jam_selesai,
            durasi_jam,
            harga_per_jam,
            estimasi_total
        };
    }
    async findAllPublic(tipe, search) {
        const where = {};
        if (tipe)
            where.tipe = tipe;
        if (search)
            where.nama_space = { contains: search };
        const spaces = await this.prisma.space.findMany({
            where,
            include: {
                owner: true
            }
        });
        return spaces.map((s) => ({
            id: s.id,
            nama_space: s.nama_space,
            harga_per_jam: s.harga_per_jam,
            tipe: s.tipe,
            kapasitas: s.kapasitas,
            foto: s.foto,
            deskripsi: s.deskripsi,
            id_owner: s.id_owner,
            owner: s.owner,
            foto_url: s.foto
                ? `http://localhost:3000/uploads/spaces/${s.foto}`
                : null
        }));
    }
    async findOnePublic(id) {
        const space = await this.prisma.space.findFirst({
            where: { id },
            include: { owner: true }
        });
        if (!space)
            throw new common_1.NotFoundException('Space dengan ID tersebut tidak ditemukan!');
        return {
            ...space,
            foto_url: space.foto
                ? `http://localhost:3000/uploads/spaces/${space.foto}`
                : null
        };
    }
    async findAllAdmin(userId) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            return [];
        const spaces = await this.prisma.space.findMany({
            where: { id_owner: owner.id }
        });
        return spaces.map((s) => ({
            ...s,
            foto_url: s.foto
                ? `http://localhost:3000/uploads/spaces/${s.foto}`
                : null
        }));
    }
    async createAdmin(dto, userId) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            throw new common_1.NotFoundException('Space Owner not found');
        return this.prisma.space.create({
            data: {
                ...dto,
                id_owner: owner.id
            }
        });
    }
    async findOneAdmin(id, userId) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            throw new common_1.NotFoundException('Space Owner not found');
        const space = await this.prisma.space.findFirst({
            where: { id, id_owner: owner.id }
        });
        if (!space)
            throw new common_1.NotFoundException('Space not found');
        return space;
    }
    async updateAdmin(id, dto, userId) {
        const space = await this.findOneAdmin(id, userId);
        return this.prisma.space.update({
            where: { id: space.id },
            data: dto
        });
    }
    async removeAdmin(id, userId) {
        const space = await this.findOneAdmin(id, userId);
        await this.prisma.space.delete({
            where: { id: space.id }
        });
        return { id, deleted: true };
    }
};
exports.SpacesService = SpacesService;
exports.SpacesService = SpacesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpacesService);
//# sourceMappingURL=spaces.service.js.map