import { PrismaService } from '../prisma/prisma.service';
import { CheckPromoDto } from './dto/check-promo.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';
export declare class DiskonService {
    private prisma;
    constructor(prisma: PrismaService);
    findActivePublic(): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }[]>;
    checkPromo(dto: CheckPromoDto): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
        is_active: boolean;
    }>;
    findOnePublic(id: number): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    findAllAdmin(userId: number): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }[]>;
    createAdmin(dto: CreateDiskonDto): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    findOneAdmin(id: number): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    updateAdmin(id: number, dto: UpdateDiskonDto): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    removeAdmin(id: number): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
