import { PrismaService } from '../prisma/prisma.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
export declare class SpacesService {
    private prisma;
    constructor(prisma: PrismaService);
    getTypes(): Promise<{
        tipe: string;
        label: string;
        deskripsi: string;
    }[]>;
    getAvailability(id_space: number, tanggal: string, jam_mulai: string, durasi_jam: number): Promise<{
        available: boolean;
        id_space: number;
        nama_space: string;
        tanggal: string;
        jam_mulai: string;
        jam_selesai: string;
        durasi_jam: number;
        harga_per_jam: number;
        estimasi_total: number;
    }>;
    findAllPublic(tipe?: string, search?: string): Promise<{
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        foto: string | null;
        deskripsi: string | null;
        id_owner: number;
        owner: {
            telp: string;
            nama_coworking: string;
            nama_pemilik: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            id_user: number;
        };
        foto_url: string | null;
    }[]>;
    findOnePublic(id: number): Promise<{
        foto_url: string | null;
        owner: {
            telp: string;
            nama_coworking: string;
            nama_pemilik: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            id_user: number;
        };
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    findAllAdmin(userId: number): Promise<{
        foto_url: string | null;
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }[]>;
    createAdmin(dto: CreateSpaceDto, userId: number): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    findOneAdmin(id: number, userId: number): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    updateAdmin(id: number, dto: UpdateSpaceDto, userId: number): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    removeAdmin(id: number, userId: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
