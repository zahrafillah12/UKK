import { AdminService } from './admin.service';
import { UpdateCoworkingProfileDto } from './dto/update-coworking-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member-admin.dto';
import { UpdateMemberAdminDto } from './dto/update-member-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getProfile(req: any): Promise<{
        id: number;
        nama_coworking: string;
        nama_pemilik: string;
        telp: string;
    }>;
    updateProfile(dto: UpdateCoworkingProfileDto, req: any): Promise<{
        id: number;
        nama_coworking: string;
        nama_pemilik: string;
        telp: string;
    }>;
    findAllMembers(search: string, req: any): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }[]>;
    createMember(dto: CreateMemberAdminDto, req: any): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }>;
    findOneMember(id: number, req: any): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
        foto: string | null;
    }>;
    updateMember(id: number, dto: UpdateMemberAdminDto, req: any): Promise<{
        id: number;
        nama_member: string;
        instansi: string | null;
        alamat: string | null;
        telp: string | null;
    }>;
    removeMember(id: number, req: any): Promise<{
        id: number;
        deleted: boolean;
    }>;
    getMonthlyReport(month: string, year: string, req: any): Promise<{
        month: number;
        year: number;
        total_transaksi: number;
        total_jam_terpakai: number;
        estimasi_pendapatan_kotor: number;
        total_potongan_diskon: number;
        realisasi_pendapatan_bersih: number;
        rincian_per_tipe_space: unknown[];
    }>;
    getIncomeReport(month: string, year: string, req: any): Promise<{
        month: number;
        year: number;
        realisasi_pendapatan_bersih: number;
    }>;
}
