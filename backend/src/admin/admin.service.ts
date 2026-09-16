import {
  BadRequestException,
  Injectable,
  NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCoworkingProfileDto } from './dto/update-coworking-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member-admin.dto';
import { UpdateMemberAdminDto } from './dto/update-member-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) throw new NotFoundException('Profile not found');

    return {
      id: owner.id,
      nama_coworking: owner.nama_coworking,
      nama_pemilik: owner.nama_pemilik,
      telp: owner.telp };
  }

  async updateProfile(
    userId: number,
    dto: UpdateCoworkingProfileDto,
  ) {
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) throw new NotFoundException('Profile not found');

    const updated = await this.prisma.spaceOwner.update({
      where: { id: owner.id },
      data: dto });

    return {
      id: updated.id,
      nama_coworking: updated.nama_coworking,
      nama_pemilik: updated.nama_pemilik,
      telp: updated.telp };
  }

  // Member Management
  async findAllMembers(search?: string) {
    const where: any = { };
    if (search) {
      where.OR = [
        { nama_member: { contains: search } },
        { instansi: { contains: search } },
        { telp: { contains: search } },
      ];
    }

    const members = await this.prisma.member.findMany({
      where,
      include: { user: true } });

    return members.map((m) => ({
      id: m.id,
      nama_member: m.nama_member,
      instansi: m.instansi,
      alamat: m.alamat,
      telp: m.telp,
      foto: m.foto }));
  }

  async createMember(dto: CreateMemberAdminDto) {
    const existing = await this.prisma.user.findFirst({
      where: { username: dto.username } });
    if (existing) throw new BadRequestException('Username sudah ada');

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

    return {
      id: user.member!.id,
      nama_member: user.member!.nama_member,
      instansi: user.member!.instansi,
      alamat: user.member!.alamat,
      telp: user.member!.telp,
      foto: user.member!.foto };
  }

  async findOneMember(id: number) {
    const member = await this.prisma.member.findFirst({
      where: { id },
      include: { user: true } });
    if (!member) throw new NotFoundException('Member tidak ditemukan');
    return {
      id: member.id,
      nama_member: member.nama_member,
      instansi: member.instansi,
      alamat: member.alamat,
      telp: member.telp,
      foto: member.foto };
  }

  async updateMember(id: number, dto: UpdateMemberAdminDto) {
    const member = await this.prisma.member.findFirst({
      where: { id },
      include: { user: true } });
    if (!member) throw new NotFoundException('Member tidak ditemukan');

    const updateData: any = {};
    if (dto.nama_member) updateData.nama_member = dto.nama_member;
    if (dto.instansi) updateData.instansi = dto.instansi;
    if (dto.alamat) updateData.alamat = dto.alamat;
    if (dto.telp) updateData.telp = dto.telp;
    if (dto.foto) updateData.foto = dto.foto;

    const updated = await this.prisma.member.update({
      where: { id: member.id },
      data: updateData });

    if (dto.password) {
      const hashedPassword = await bcrypt.hash(dto.password, 10);
      await this.prisma.user.update({
        where: { id: member.id_user },
        data: { password: hashedPassword } });
    }

    return {
      id: updated.id,
      nama_member: updated.nama_member,
      instansi: updated.instansi,
      alamat: updated.alamat,
      telp: updated.telp };
  }

  async removeMember(id: number) {
    const member = await this.prisma.member.findFirst({
      where: { id } });
    if (!member) throw new NotFoundException('Member tidak ditemukan');

    // Delete user (cascade deletes member)
    await this.prisma.user.delete({
      where: { id: member.id_user } });

    return { id, deleted: true };
  }

  // Reports
  async getMonthlyReport(
    userId: number,
    month?: string,
    year?: string,
  ) {
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) throw new NotFoundException('Space Owner not found');

    const y = year || new Date().getFullYear().toString();
    const m = month ? month.padStart(2, '0') : new Date().getMonth() + 1 + '';
    const prefix = `${y}-${m}`;

    const reservasi = await this.prisma.reservasi.findMany({
      where: {
        status: 'selesai',
        tanggal_reservasi: { startsWith: prefix },
        detail: { space: { id_owner: owner.id } } },
      include: { detail: { include: { space: true } } } });

    const total_transaksi = reservasi.length;
    const total_jam_terpakai = reservasi.reduce(
      (sum, item) => sum + item.durasi_jam,
      0,
    );
    const estimasi_pendapatan_kotor = reservasi.reduce(
      (sum, item) => sum + item.detail!.total_harga_awal,
      0,
    );
    const total_potongan_diskon = reservasi.reduce(
      (sum, item) => sum + item.detail!.potongan_diskon,
      0,
    );
    const realisasi_pendapatan_bersih = reservasi.reduce(
      (sum, item) => sum + item.detail!.total_bayar,
      0,
    );

    const rincianMap = {};
    reservasi.forEach((res) => {
      const tipe = res.detail!.space.tipe;
      if (!rincianMap[tipe]) {
        let label = tipe;
        if (tipe === 'desk') label = 'Personal Desk';
        if (tipe === 'meeting_room') label = 'Meeting Room';
        if (tipe === 'private_office') label = 'Private Office';

        rincianMap[tipe] = {
          tipe,
          label,
          total_booking: 0,
          total_jam: 0,
          total_pendapatan: 0 };
      }
      rincianMap[tipe].total_booking += 1;
      rincianMap[tipe].total_jam += res.durasi_jam;
      rincianMap[tipe].total_pendapatan += res.detail!.total_bayar;
    });

    return {
      month: parseInt(m),
      year: parseInt(y),
      total_transaksi,
      total_jam_terpakai,
      estimasi_pendapatan_kotor,
      total_potongan_diskon,
      realisasi_pendapatan_bersih,
      rincian_per_tipe_space: Object.values(rincianMap) };
  }

  async getIncomeReport(
    userId: number,
    month?: string,
    year?: string,
  ) {
    const report = await this.getMonthlyReport(userId, month, year);
    return {
      month: report.month,
      year: report.year,
      realisasi_pendapatan_bersih: report.realisasi_pendapatan_bersih };
  }
}
