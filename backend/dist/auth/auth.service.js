"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async registerMember(dto) {
        const existing = await this.prisma.user.findFirst({
            where: { username: dto.username }
        });
        if (existing) {
            throw new common_1.BadRequestException('Username sudah digunakan oleh akun lain!');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                role: 'member',
                member: {
                    create: {
                        nama_member: dto.nama_member,
                        instansi: dto.instansi,
                        alamat: dto.alamat,
                        telp: dto.telp,
                        foto: dto.foto
                    }
                }
            },
            include: { member: true }
        });
        const payload = { sub: user.id, username: user.username, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            message: 'Registrasi Member berhasil!',
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                member: {
                    id: user.member.id,
                    user_id: user.member.id_user,
                    nama_member: user.member.nama_member,
                    instansi: user.member.instansi,
                    alamat: user.member.alamat,
                    telp: user.member.telp,
                    foto: user.member.foto,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                access_token
            }
        };
    }
    async registerAdminSpace(dto) {
        const existing = await this.prisma.user.findFirst({
            where: { username: dto.username }
        });
        if (existing) {
            throw new common_1.BadRequestException('Username sudah digunakan oleh akun lain!');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = await this.prisma.user.create({
            data: {
                username: dto.username,
                password: hashedPassword,
                role: 'admin_space',
                spaceOwner: {
                    create: {
                        nama_coworking: dto.nama_coworking,
                        nama_pemilik: dto.nama_pemilik,
                        telp: dto.telp
                    }
                }
            },
            include: { spaceOwner: true }
        });
        const payload = { sub: user.id, username: user.username, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            message: 'Registrasi Admin Space berhasil!',
            data: {
                id: user.id,
                username: user.username,
                role: user.role,
                space_owner: {
                    id: user.spaceOwner.id,
                    user_id: user.spaceOwner.id_user,
                    nama_coworking: user.spaceOwner.nama_coworking,
                    nama_pemilik: user.spaceOwner.nama_pemilik,
                    telp: user.spaceOwner.telp,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString()
                },
                access_token
            }
        };
    }
    async login(dto) {
        const user = await this.prisma.user.findFirst({
            where: { username: dto.username },
            include: { member: true, spaceOwner: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Username atau Password salah!');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Username atau Password salah!');
        }
        const payload = { sub: user.id, username: user.username, role: user.role };
        const access_token = await this.jwtService.signAsync(payload);
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            member: user.member || null,
            space_owner: user.spaceOwner || null,
            access_token
        };
    }
    async getProfile(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: { member: true, spaceOwner: true }
        });
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        return {
            id: user.id,
            username: user.username,
            role: user.role,
            member: user.member || null,
            space_owner: user.spaceOwner || null
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map