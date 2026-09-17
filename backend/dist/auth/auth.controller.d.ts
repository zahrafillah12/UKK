import { AuthService } from './auth.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin-space.dto';
import { LoginUserDto } from './dto/login-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    registerMember(dto: RegisterMemberDto, req: any): Promise<{
        message: string;
        data: {
            id: number;
            username: string;
            role: string;
            member: {
                id: number;
                user_id: number;
                nama_member: string;
                instansi: string | null;
                alamat: string | null;
                telp: string | null;
                foto: string | null;
                created_at: string;
                updated_at: string;
            };
            access_token: string;
        };
    }>;
    registerAdminSpace(dto: RegisterAdminSpaceDto, req: any): Promise<{
        message: string;
        data: {
            id: number;
            username: string;
            role: string;
            space_owner: {
                id: number;
                user_id: number;
                nama_coworking: string;
                nama_pemilik: string;
                telp: string;
                created_at: string;
                updated_at: string;
            };
            access_token: string;
        };
    }>;
    login(dto: LoginUserDto, req: any): Promise<{
        id: number;
        username: string;
        role: string;
        member: {
            id: number;
            nama_member: string;
            instansi: string | null;
            alamat: string | null;
            telp: string | null;
            foto: string | null;
            id_user: number;
        } | null;
        space_owner: {
            id: number;
            telp: string;
            id_user: number;
            nama_coworking: string;
            nama_pemilik: string;
        } | null;
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        id: number;
        username: string;
        role: string;
        member: {
            id: number;
            nama_member: string;
            instansi: string | null;
            alamat: string | null;
            telp: string | null;
            foto: string | null;
            id_user: number;
        } | null;
        space_owner: {
            id: number;
            telp: string;
            id_user: number;
            nama_coworking: string;
            nama_pemilik: string;
        } | null;
    }>;
}
