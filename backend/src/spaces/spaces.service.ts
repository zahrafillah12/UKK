import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@Injectable()
export class SpacesService {
  constructor(private prisma: PrismaService) {}

  async getTypes() {
    return [
      {
        tipe: 'desk',
        label: 'Personal Desk',
        deskripsi:
          'Meja kerja individual yang nyaman dengan fasilitas colokan listrik, WiFi kencang, dan air minum.' },
      {
        tipe: 'meeting_room',
        label: 'Meeting Room',
        deskripsi:
          'Ruang rapat tertutup dengan fasilitas proyektor/TV LED, whiteboard, sound system, dan AC dingin.' },
      {
        tipe: 'private_office',
        label: 'Private Office',
        deskripsi:
          'Ruang kantor privat eksklusif untuk tim kecil hingga menengah dengan akses fleksibel dan keamanan 24 jam.' },
    ];
  }

  async getAvailability(
    id_space: number,
    tanggal: string,
    jam_mulai: string,
    durasi_jam: number,
    ) {
    const space = await this.prisma.space.findFirst({
      where: { id: id_space } });

    if (!space) throw new NotFoundException('Space tidak ditemukan');

    // Simple overlapping check
    // In real app we parse time. Here we just return mock available.
    // Assuming 09:00 + 3 = 12:00
    const startHour = parseInt(jam_mulai.split(':')[0]);
    const endHour = startHour + durasi_jam;
    const jam_selesai = `${endHour.toString().padStart(2, '0')}:00`;

    // Check overlap in database
    const conflicts = await this.prisma.reservasi.findMany({
      where: {
        detail: { id_space: id_space },
        tanggal_reservasi: tanggal,
        status: { in: ['belum_dikonfirm', 'disetujui', 'aktif'] } } });

    for (const conflict of conflicts) {
      const conflictStart = parseInt(conflict.jam_mulai.split(':')[0]);
      const conflictEnd = conflictStart + conflict.durasi_jam;

      if (startHour < conflictEnd && endHour > conflictStart) {
        throw new NotFoundException(
          'Maaf, space sudah terisi atau dibooking pada jam tersebut!',
        );
      }
    }

    const harga_per_jam = space.harga_per_jam;
    const estimasi_total = harga_per_jam * durasi_jam;

    return {
      available: true,
      id_space: space.id,
      nama_space: space.nama_space,
      tanggal,
      jam_mulai,
      jam_selesai,
      durasi_jam,
      harga_per_jam,
      estimasi_total };
  }

  async findAllPublic(tipe?: string, search?: string) {
    const where: any = { };
    if (tipe) where.tipe = tipe;
    if (search) where.nama_space = { contains: search };

    const spaces = await this.prisma.space.findMany({
      where,
      include: {
        owner: true } });

    return spaces.map((s) => ({
      id: s.id,
      nama_space: s.nama_space,
      harga_per_jam: s.harga_per_jam,
      tipe: s.tipe,
      kapasitas: s.kapasitas,
      foto: s.foto,
      deskripsi: s.deskripsi,
      id_owner: s.id_owner,
      owner: s.owner,
      foto_url: s.foto
        ? `http://localhost:3000/uploads/spaces/${s.foto}`
        : null }));
  }

  async findOnePublic(id: number, ) {
    const space = await this.prisma.space.findFirst({
      where: { id },
      include: { owner: true } });

    if (!space)
      throw new NotFoundException('Space dengan ID tersebut tidak ditemukan!');

    return {
      ...space,
      foto_url: space.foto
        ? `http://localhost:3000/uploads/spaces/${space.foto}`
        : null };
  }

  // Admin Methods
  async findAllAdmin(userId: number) {
    // Only return spaces owned by the admin space (userId maps to spaceOwner)
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) return [];

    const spaces = await this.prisma.space.findMany({
      where: { id_owner: owner.id } });

    return spaces.map((s) => ({
      ...s,
      foto_url: s.foto
        ? `http://localhost:3000/uploads/spaces/${s.foto}`
        : null }));
  }

  async createAdmin(dto: CreateSpaceDto, userId: number) {
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) throw new NotFoundException('Space Owner not found');

    return this.prisma.space.create({
      data: {
        ...dto,
        id_owner: owner.id } });
  }

  async findOneAdmin(id: number, userId: number) {
    const owner = await this.prisma.spaceOwner.findUnique({
      where: { id_user: userId } });
    if (!owner) throw new NotFoundException('Space Owner not found');

    const space = await this.prisma.space.findFirst({
      where: { id, id_owner: owner.id } });

    if (!space) throw new NotFoundException('Space not found');
    return space;
  }

  async updateAdmin(
    id: number,
    dto: UpdateSpaceDto,
    userId: number,
  ) {
    const space = await this.findOneAdmin(id, userId);

    return this.prisma.space.update({
      where: { id: space.id },
      data: dto });
  }

  async removeAdmin(id: number, userId: number) {
    const space = await this.findOneAdmin(id, userId);

    await this.prisma.space.delete({
      where: { id: space.id } });

    return { id, deleted: true };
  }
}
