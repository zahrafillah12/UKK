import { ReservasiService } from './reservasi.service';
import { CreateReservasiDto } from './dto/create-reservasi.dto';
import { UpdateReservasiStatusDto } from './dto/update-reservasi-status.dto';
export declare class ReservasiController {
    private readonly reservasiService;
    constructor(reservasiService: ReservasiService);
    createMember(dto: CreateReservasiDto, req: any): Promise<{
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
    findAllMember(req: any): Promise<{
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
    historyMember(month: string, year: string, req: any): Promise<{
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
    getETicket(id: number, req: any): Promise<{
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
    findOneDetail(id: number, req: any): Promise<{
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
    cancelMember(id: number, req: any): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    findAllAdmin(month: string, year: string, status: string, id_space: string, tanggal: string, req: any): Promise<{
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
    updateStatusAdmin(id: number, dto: UpdateReservasiStatusDto, req: any): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    checkInAdmin(id: number, req: any): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
    checkOutAdmin(id: number, req: any): Promise<{
        id: number;
        status: string;
        updated_at: Date;
    }>;
}
