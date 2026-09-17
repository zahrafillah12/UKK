import {
  BadRequestException,
  Injectable,
  UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin-space.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async registerMember(dto: RegisterMemberDto, ) {
    const existing = await this.prisma.user.findFirst({
      where: { username: dto.username } });

    if (existing) {
      throw new BadRequestException('Username sudah digunakan oleh akun lain!');
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
            foto: dto.foto } } },
      include: { member: true } });

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: 'Registrasi Member berhasil!',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        member: {
          id: user.member!.id,
          user_id: user.member!.id_user,
          nama_member: user.member!.nama_member,
          instansi: user.member!.instansi,
          alamat: user.member!.alamat,
          telp: user.member!.telp,
          foto: user.member!.foto,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        access_token
      }
    };
  }

  async registerAdminSpace(dto: RegisterAdminSpaceDto, ) {
    const existing = await this.prisma.user.findFirst({
      where: { username: dto.username } });

    if (existing) {
      throw new BadRequestException('Username sudah digunakan oleh akun lain!');
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
            telp: dto.telp } } },
      include: { spaceOwner: true } });

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      message: 'Registrasi Admin Space berhasil!',
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
        space_owner: {
          id: user.spaceOwner!.id,
          user_id: user.spaceOwner!.id_user,
          nama_coworking: user.spaceOwner!.nama_coworking,
          nama_pemilik: user.spaceOwner!.nama_pemilik,
          telp: user.spaceOwner!.telp,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        access_token
      }
    };
  }

  async login(dto: LoginUserDto, ) {
    const user = await this.prisma.user.findFirst({
      where: { username: dto.username },
      include: { member: true, spaceOwner: true } });

    if (!user) {
      throw new UnauthorizedException('Username atau Password salah!');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Username atau Password salah!');
    }

    const payload = { sub: user.id, username: user.username, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      member: user.member || null,
      space_owner: user.spaceOwner || null,
      access_token };
  }

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { member: true, spaceOwner: true } });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      member: user.member || null,
      space_owner: user.spaceOwner || null };
  }
}
