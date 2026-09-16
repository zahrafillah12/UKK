import { DiskonService } from './diskon.service';
import { CheckPromoDto } from './dto/check-promo.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';
export declare class DiskonController {
    private readonly diskonService;
    constructor(diskonService: DiskonService);
    findActivePublic(req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }[]>;
    checkPromo(dto: CheckPromoDto, req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
        is_active: boolean;
    }>;
    findOnePublic(id: number, req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    findAllAdmin(req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }[]>;
    createAdmin(dto: CreateDiskonDto, req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    findOneAdmin(id: number, req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    updateAdmin(id: number, dto: UpdateDiskonDto, req: any): Promise<{
        id: number;
        nama_diskon: string;
        persentase_diskon: number;
        tanggal_awal: Date;
        tanggal_akhir: Date;
    }>;
    removeAdmin(id: number, req: any): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
