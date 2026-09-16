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
exports.ReservasiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ReservasiService = class ReservasiService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createMember(dto, userId) {
        const member = await this.prisma.member.findUnique({
            where: { id_user: userId }
        });
        if (!member)
            throw new common_1.NotFoundException('Member not found');
        const space = await this.prisma.space.findUnique({
            where: { id: dto.id_space }
        });
        if (!space)
            throw new common_1.NotFoundException('Space tidak ditemukan');
        const startHour = parseInt(dto.jam_mulai.split(':')[0]);
        const endHour = startHour + dto.durasi_jam;
        const jam_selesai = `${endHour.toString().padStart(2, '0')}:00`;
        const total_harga_awal = space.harga_per_jam * dto.durasi_jam;
        let potongan_diskon = 0;
        let id_diskon = null;
        if (dto.id_diskon || dto.kode_promo) {
            const diskon = await this.prisma.diskon.findFirst({
                where: {
                    OR: [
                        { id: dto.id_diskon || -1 },
                        { nama_diskon: dto.kode_promo || '' },
                    ]
                }
            });
            if (diskon) {
                const now = new Date();
                if (now >= diskon.tanggal_awal && now <= diskon.tanggal_akhir) {
                    potongan_diskon = (total_harga_awal * diskon.persentase_diskon) / 100;
                    id_diskon = diskon.id;
                }
            }
        }
        const total_bayar = total_harga_awal - potongan_diskon;
        const kode_booking = `BOOK-${new Date().getFullYear()}${new Date().getMonth() + 1}${new Date().getDate()}-${Math.floor(Math.random() * 10000)}`;
        const reservasi = await this.prisma.reservasi.create({
            data: {
                kode_booking,
                tanggal_reservasi: dto.tanggal_reservasi,
                jam_mulai: dto.jam_mulai,
                durasi_jam: dto.durasi_jam,
                status: 'belum_dikonfirm',
                id_member: member.id,
                detail: {
                    create: {
                        id_space: space.id,
                        id_diskon: id_diskon,
                        total_harga_awal,
                        potongan_diskon,
                        total_bayar
                    }
                }
            },
            include: { detail: true }
        });
        return {
            id: reservasi.id,
            kode_booking: reservasi.kode_booking,
            id_member: reservasi.id_member,
            id_space: reservasi.detail.id_space,
            id_diskon: reservasi.detail.id_diskon,
            tanggal_reservasi: reservasi.tanggal_reservasi,
            jam_mulai: reservasi.jam_mulai,
            jam_selesai,
            durasi_jam: reservasi.durasi_jam,
            harga_per_jam: space.harga_per_jam,
            total_harga_awal,
            potongan_diskon,
            total_bayar,
            status: reservasi.status,
            created_at: reservasi.createdAt || new Date()
        };
    }
    async findAllMember(userId) {
        const member = await this.prisma.member.findUnique({
            where: { id_user: userId }
        });
        if (!member)
            return [];
        const list = await this.prisma.reservasi.findMany({
            where: { id_member: member.id },
            include: { detail: { include: { space: true } } }
        });
        return list.map((r) => {
            const startHour = parseInt(r.jam_mulai.split(':')[0]);
            return {
                id: r.id,
                kode_booking: r.kode_booking,
                tanggal_reservasi: r.tanggal_reservasi,
                jam_mulai: r.jam_mulai,
                jam_selesai: `${(startHour + r.durasi_jam).toString().padStart(2, '0')}:00`,
                durasi_jam: r.durasi_jam,
                total_bayar: r.detail.total_bayar,
                status: r.status,
                space: {
                    id: r.detail.space.id,
                    nama_space: r.detail.space.nama_space,
                    tipe: r.detail.space.tipe
                }
            };
        });
    }
    async historyMember(userId, month, year) {
        const member = await this.prisma.member.findUnique({
            where: { id_user: userId }
        });
        if (!member)
            return null;
        const where = {
            id_member: member.id,
            status: 'selesai'
        };
        if (month || year) {
            const y = year || new Date().getFullYear().toString();
            const m = month ? month.padStart(2, '0') : new Date().getMonth() + 1 + '';
            where.tanggal_reservasi = { startsWith: `${y}-${m}` };
        }
        const list = await this.prisma.reservasi.findMany({
            where,
            include: { detail: { include: { space: true } } }
        });
        const total_pengeluaran = list.reduce((sum, item) => sum + item.detail.total_bayar, 0);
        return {
            month: month ? parseInt(month) : new Date().getMonth() + 1,
            year: year ? parseInt(year) : new Date().getFullYear(),
            total_reservasi: list.length,
            total_pengeluaran,
            items: list.map((r) => {
                const startHour = parseInt(r.jam_mulai.split(':')[0]);
                return {
                    id: r.id,
                    kode_booking: r.kode_booking,
                    tanggal_reservasi: r.tanggal_reservasi,
                    jam_mulai: r.jam_mulai,
                    jam_selesai: `${(startHour + r.durasi_jam).toString().padStart(2, '0')}:00`,
                    durasi_jam: r.durasi_jam,
                    total_bayar: r.detail.total_bayar,
                    status: r.status,
                    space_name: r.detail.space.nama_space
                };
            })
        };
    }
    async findOneDetail(id) {
        const reservasi = await this.prisma.reservasi.findFirst({
            where: { id },
            include: {
                member: true,
                detail: { include: { space: true, diskon: true } }
            }
        });
        if (!reservasi)
            throw new common_1.NotFoundException('Reservasi tidak ditemukan');
        const startHour = parseInt(reservasi.jam_mulai.split(':')[0]);
        return {
            id: reservasi.id,
            kode_booking: reservasi.kode_booking,
            id_member: reservasi.id_member,
            id_space: reservasi.detail.id_space,
            tanggal_reservasi: reservasi.tanggal_reservasi,
            jam_mulai: reservasi.jam_mulai,
            jam_selesai: `${(startHour + reservasi.durasi_jam).toString().padStart(2, '0')}:00`,
            durasi_jam: reservasi.durasi_jam,
            total_bayar: reservasi.detail.total_bayar,
            status: reservasi.status,
            member: {
                nama_member: reservasi.member.nama_member,
                telp: reservasi.member.telp,
                instansi: reservasi.member.instansi
            },
            space: {
                nama_space: reservasi.detail.space.nama_space,
                harga_per_jam: reservasi.detail.space.harga_per_jam,
                tipe: reservasi.detail.space.tipe
            }
        };
    }
    async getETicket(id) {
        const res = await this.findOneDetail(id);
        return {
            e_ticket_number: `TICKET-${res.kode_booking}`,
            kode_booking: res.kode_booking,
            coworking_space: {
                nama: 'Space',
                telepon: ''
            },
            member: {
                nama: res.member.nama_member,
                instansi: res.member.instansi,
                telp: res.member.telp
            },
            space: {
                nama: res.space.nama_space,
                tipe: res.space.tipe,
                harga_per_jam: res.space.harga_per_jam
            },
            jadwal: {
                tanggal: res.tanggal_reservasi,
                jam_mulai: res.jam_mulai,
                jam_selesai: res.jam_selesai,
                durasi: `${res.durasi_jam} Jam`
            },
            rincian_pembayaran: {
                total_dibayar: res.total_bayar
            },
            status_reservasi: res.status,
            qr_code_payload: `VERIFY-RESERVASI-${id}-`
        };
    }
    async cancelMember(id, userId) {
        const member = await this.prisma.member.findUnique({
            where: { id_user: userId }
        });
        if (!member)
            throw new common_1.NotFoundException('Member not found');
        const res = await this.prisma.reservasi.findFirst({
            where: { id, id_member: member.id }
        });
        if (!res)
            throw new common_1.NotFoundException('Reservasi tidak ditemukan');
        const updated = await this.prisma.reservasi.update({
            where: { id },
            data: { status: 'dibatalkan' }
        });
        return {
            id: updated.id,
            status: updated.status,
            updated_at: updated.updatedAt
        };
    }
    async findAllAdmin(userId, filters) {
        const owner = await this.prisma.spaceOwner.findUnique({
            where: { id_user: userId }
        });
        if (!owner)
            return [];
        const where = {
            detail: { space: { id_owner: owner.id } }
        };
        if (filters.status)
            where.status = filters.status;
        if (filters.id_space)
            where.detail = { ...where.detail, id_space: parseInt(filters.id_space) };
        if (filters.tanggal)
            where.tanggal_reservasi = filters.tanggal;
        else if (filters.month || filters.year) {
            const y = filters.year || new Date().getFullYear().toString();
            const m = filters.month
                ? filters.month.padStart(2, '0')
                : new Date().getMonth() + 1 + '';
            where.tanggal_reservasi = { startsWith: `${y}-${m}` };
        }
        const list = await this.prisma.reservasi.findMany({
            where,
            include: { detail: { include: { space: true } }, member: true }
        });
        return list.map((r) => {
            const startHour = parseInt(r.jam_mulai.split(':')[0]);
            return {
                id: r.id,
                kode_booking: r.kode_booking,
                tanggal_reservasi: r.tanggal_reservasi,
                jam_mulai: r.jam_mulai,
                jam_selesai: `${(startHour + r.durasi_jam).toString().padStart(2, '0')}:00`,
                durasi_jam: r.durasi_jam,
                total_harga_awal: r.detail.total_harga_awal,
                potongan_diskon: r.detail.potongan_diskon,
                total_bayar: r.detail.total_bayar,
                status: r.status,
                member: {
                    id: r.member.id,
                    nama_member: r.member.nama_member,
                    telp: r.member.telp
                },
                space: {
                    id: r.detail.space.id,
                    nama_space: r.detail.space.nama_space,
                    tipe: r.detail.space.tipe
                }
            };
        });
    }
    async updateStatusAdmin(id, status) {
        const res = await this.prisma.reservasi.update({
            where: { id },
            data: { status }
        });
        return {
            id: res.id,
            status: res.status,
            updated_at: res.updatedAt
        };
    }
    async checkInAdmin(id) {
        return this.updateStatusAdmin(id, 'aktif');
    }
    async checkOutAdmin(id) {
        return this.updateStatusAdmin(id, 'selesai');
    }
};
exports.ReservasiService = ReservasiService;
exports.ReservasiService = ReservasiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ReservasiService);
//# sourceMappingURL=reservasi.service.js.map