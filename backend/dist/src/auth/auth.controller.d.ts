import { AuthService } from './auth.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin-space.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerMember(dto: RegisterMemberDto, req: any): Promise<{
        id: number;
        username: string;
        role: string;
        member: {
            nama_member: string;
            instansi: string | null;
            alamat: string | null;
            telp: string | null;
            foto: string | null;
            id: number;
            id_user: number;
        } | null;
        access_token: string;
    }>;
    registerAdminSpace(dto: RegisterAdminSpaceDto, req: any): Promise<{
        id: number;
        username: string;
        role: string;
        space_owner: {
            telp: string;
            nama_coworking: string;
            nama_pemilik: string;
            id: number;
            id_user: number;
        } | null;
        access_token: string;
    }>;
    login(dto: LoginUserDto, req: any): Promise<{
        id: number;
        username: string;
        role: string;
        member: {
            nama_member: string;
            instansi: string | null;
            alamat: string | null;
            telp: string | null;
            foto: string | null;
            id: number;
            id_user: number;
        } | null;
        space_owner: {
            telp: string;
            nama_coworking: string;
            nama_pemilik: string;
            id: number;
            id_user: number;
        } | null;
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        role: string;
        member: {
            nama_member: string;
            instansi: string | null;
            alamat: string | null;
            telp: string | null;
            foto: string | null;
            id: number;
            id_user: number;
        } | null;
        space_owner: {
            telp: string;
            nama_coworking: string;
            nama_pemilik: string;
            id: number;
            id_user: number;
        } | null;
    }>;
}
