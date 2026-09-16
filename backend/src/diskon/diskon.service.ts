import {
  BadRequestException,
  Injectable,
  NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CheckPromoDto } from './dto/check-promo.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';

@Injectable()
export class DiskonService {
  constructor(private prisma: PrismaService) {}

  async findActivePublic() {
    const now = new Date();
    return this.prisma.diskon.findMany({
      where: {
        tanggal_awal: { lte: now },
        tanggal_akhir: { gte: now } },
      select: {
        id: true,
        nama_diskon: true,
        persentase_diskon: true,
        tanggal_awal: true,
        tanggal_akhir: true } });
  }

  async checkPromo(dto: CheckPromoDto, ) {
    const diskon = await this.prisma.diskon.findFirst({
      where: { nama_diskon: dto.nama_diskon } });

    if (!diskon) {
      throw new BadRequestException(
        'Kode promo tidak ditemukan atau sudah kedaluwarsa!',
      );
    }

    const now = new Date();
    if (now < diskon.tanggal_awal || now > diskon.tanggal_akhir) {
      throw new BadRequestException(
        'Kode promo tidak ditemukan atau sudah kedaluwarsa!',
      );
    }

    return {
      id: diskon.id,
      nama_diskon: diskon.nama_diskon,
      persentase_diskon: diskon.persentase_diskon,
      tanggal_awal: diskon.tanggal_awal,
      tanggal_akhir: diskon.tanggal_akhir,
      is_active: true };
  }

  async findOnePublic(id: number, ) {
    const diskon = await this.prisma.diskon.findFirst({
      where: { id } });

    if (!diskon) throw new NotFoundException('Diskon tidak ditemukan');
    return diskon;
  }

  // Admin Methods
  async findAllAdmin(userId: number) {
    // Ideally check if user is admin of the space, but diskons are global to the maker according to the schema
    return this.prisma.diskon.findMany({
      where: { } });
  }

  async createAdmin(dto: CreateDiskonDto, ) {
    return this.prisma.diskon.create({
      data: {
        nama_diskon: dto.nama_diskon,
        persentase_diskon: dto.persentase_diskon,
        tanggal_awal: new Date(dto.tanggal_awal),
        tanggal_akhir: new Date(dto.tanggal_akhir) } });
  }

  async findOneAdmin(id: number, ) {
    const diskon = await this.prisma.diskon.findFirst({
      where: { id } });
    if (!diskon) throw new NotFoundException('Diskon tidak ditemukan');
    return diskon;
  }

  async updateAdmin(id: number, dto: UpdateDiskonDto, ) {
    const diskon = await this.findOneAdmin(id);

    const dataToUpdate: any = {};
    if (dto.nama_diskon !== undefined)
      dataToUpdate.nama_diskon = dto.nama_diskon;
    if (dto.persentase_diskon !== undefined)
      dataToUpdate.persentase_diskon = dto.persentase_diskon;
    if (dto.tanggal_awal !== undefined)
      dataToUpdate.tanggal_awal = new Date(dto.tanggal_awal);
    if (dto.tanggal_akhir !== undefined)
      dataToUpdate.tanggal_akhir = new Date(dto.tanggal_akhir);

    return this.prisma.diskon.update({
      where: { id: diskon.id },
      data: dataToUpdate });
  }

  async removeAdmin(id: number, ) {
    const diskon = await this.findOneAdmin(id);
    await this.prisma.diskon.delete({
      where: { id: diskon.id } });
    return { id, deleted: true };
  }
}
