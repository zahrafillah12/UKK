import { PrismaService } from '../prisma/prisma.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin-space.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    registerMember(dto: RegisterMemberDto): Promise<{
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
    registerAdminSpace(dto: RegisterAdminSpaceDto): Promise<{
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
    login(dto: LoginUserDto): Promise<{
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
    getProfile(userId: number): Promise<{
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
