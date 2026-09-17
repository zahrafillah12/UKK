import { PrismaService } from '../prisma/prisma.service';
import { CreateReservasiDto } from './dto/create-reservasi.dto';
export declare class ReservasiService {
    private prisma;
    constructor(prisma: PrismaService);
    createMember(dto: CreateReservasiDto, userId: number): Promise<{
        id: number;
        kode_booking: string;
        id_member: number;
        id_space: number;
        id_diskon: number | null;
        tanggal_reservasi: string;
        jam_mulai: string;
        jam_selesai: string;
        durasi_jam: number;
        harga_per_jam: number;
        total_harga_awal: number;
        potongan_diskon: number;
        total_bayar: number;
        status: string;
        created_at: any;
    }>;
    findAllMember(userId: number): Promise<{
        id: number;
        kode_booking: string;
        tanggal_reservasi: string;
        jam_mulai: string;
        jam_selesai: string;
        durasi_jam: number;
        total_bayar: number;
        status: string;
        space: {
            id: number;
            nama_space: string;
            tipe: string;
        };
    }[]>;
    historyMember(userId: number, month?: string, year?: string): Promise<{
        month: number;
        year: number;
        total_reservasi: number;
        total_pengeluaran: number;
        items: {
            id: number;
            kode_booking: string;
            tanggal_reservasi: string;
            jam_mulai: string;
            jam_selesai: string;
            durasi_jam: number;
            total_bayar: number;
            status: string;
            space_name: string;
        }[];
    } | null>;
    findOneDetail(id: number): Promise<{
        id: number;
        kode_booking: string;
        id_member: number;
        id_space: number;
        tanggal_reservasi: string;
        jam_mulai: string;
        jam_selesai: string;
        durasi_jam: number;
        total_bayar: number;
        status: string;
        member: {
            nama_member: string;
            telp: string | null;
            instansi: string | null;
        };
        space: {
            nama_space: string;
            harga_per_jam: number;
            tipe: string;
        };
    }>;
    getETicket(id: number): Promise<{
        e_ticket_number: string;
        kode_booking: string;
        coworking_space: {
            nama: string;
            telepon: string;
        };
        member: {
            nama: string;
            instansi: string | null;
            telp: string | null;
        };
        space: {
            nama: string;
            tipe: string;
            harga_per_jam: number;
        };
        jadwal: {
            tanggal: string;
            jam_mulai: string;
            jam_selesai: string;
            durasi: string;
        };
        rincian_pembayaran: {
            total_dibayar: number;
        };
        status_reservasi: string;
        qr_code_payload: string;
    }>;
    cancelMember(id: number, userId: number): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    findAllAdmin(userId: number, filters: {
        month?: string;
        year?: string;
        status?: string;
        id_space?: string;
        tanggal?: string;
    }): Promise<{
        id: number;
        kode_booking: string;
        tanggal_reservasi: string;
        jam_mulai: string;
        jam_selesai: string;
        durasi_jam: number;
        total_harga_awal: number;
        potongan_diskon: number;
        total_bayar: number;
        status: string;
        member: {
            id: number;
            nama_member: string;
            telp: string | null;
        };
        space: {
            id: number;
            nama_space: string;
            tipe: string;
        };
    }[]>;
    updateStatusAdmin(id: number, status: string): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    checkInAdmin(id: number): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    checkOutAdmin(id: number): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
}
