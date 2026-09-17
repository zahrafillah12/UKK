import { SpacesService } from './spaces.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';
export declare class SpacesController {
    private readonly spacesService;
    constructor(spacesService: SpacesService);
    getTypes(): Promise<{
        tipe: string;
        label: string;
        deskripsi: string;
    }[]>;
    getAvailability(id_space: number, tanggal: string, jam_mulai: string, durasi_jam: number, req: any): Promise<{
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
    findAllPublic(tipe: string, search: string, req: any): Promise<{
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
    findOnePublic(id: number, req: any): Promise<{
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
    findAllAdmin(req: any): Promise<{
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
    createAdmin(dto: CreateSpaceDto, req: any): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    findOneAdmin(id: number, req: any): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    updateAdmin(id: number, dto: UpdateSpaceDto, req: any): Promise<{
        foto: string | null;
        id: number;
        nama_space: string;
        harga_per_jam: number;
        tipe: string;
        kapasitas: number;
        deskripsi: string | null;
        id_owner: number;
    }>;
    removeAdmin(id: number, req: any): Promise<{
        id: number;
        deleted: boolean;
    }>;
}
