import { PrismaService } from '../prisma/prisma.service';
import { UpdateCoworkingProfileDto } from './dto/update-coworking-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member-admin.dto';
import { UpdateMemberAdminDto } from './dto/update-member-admin.dto';
export declare class AdminService {
    private prisma;
    constructor(prisma: PrismaService);
    getProfile(userId: number): Promise<{
        id: number;
        nama_coworking: string;
        nama_pemilik: string;
        telp: string;
    }>;
    updateProfile(userId: number, dto: UpdateCoworkingProfileDto): Promise<{
        id: number;
        nama_coworking: string;
        nama_pemilik: string;
        telp: string;
    }>;
    findAllMembers(search?: string): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }[]>;
    createMember(dto: CreateMemberAdminDto): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }>;
    findOneMember(id: number): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }>;
    updateMember(id: number, dto: UpdateMemberAdminDto): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
    }>;
    removeMember(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
    getMonthlyReport(userId: number, month?: string, year?: string): Promise<{
        month: number;
        year: number;
        total_transaksi: number;
        total_jam_terpakai: number;
        estimasi_pendapatan_kotor: number;
        total_potongan_diskon: number;
        realisasi_pendapatan_bersih: number;
        rincian_per_tipe_space: unknown[];
    }>;
    getIncomeReport(userId: number, month?: string, year?: string): Promise<{
        month: number;
        year: number;
        realisasi_pendapatan_bersih: number;
    }>;
}
