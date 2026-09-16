import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards } from '@nestjs/common';
import { ReservasiService } from './reservasi.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { CreateReservasiDto } from './dto/create-reservasi.dto';
import { UpdateReservasiStatusDto } from './dto/update-reservasi-status.dto';

@ApiTags('Reservasi Member')
@Controller()
export class ReservasiController {
  constructor(private readonly reservasiService: ReservasiService) {}

  @Post('api/reservasi')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat Pemesanan Space Baru (Member)' })
  createMember(@Body() dto: CreateReservasiDto, @Req() req) {
    if (req.user.role !== 'member') throw new Error('Unauthorized');
    return this.reservasiService.createMember(dto, req.user.sub);
  }

  @Get('api/reservasi/my')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lihat Status Semua Pemesanan Saya (Member)' })
  findAllMember(@Req() req) {
    if (req.user.role !== 'member') throw new Error('Unauthorized');
    return this.reservasiService.findAllMember(req.user.sub);
  }

  @Get('api/reservasi/my/history')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Lihat Histori Pemesanan Berdasarkan Bulan & Tahun (Member)' })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  historyMember(
    @Query('month') month: string,
    @Query('year') year: string,
    @Req() req,
  ) {
    if (req.user.role !== 'member') throw new Error('Unauthorized');
    return this.reservasiService.historyMember(
      req.user.sub,
      month,
      year,
    );
  }

  @Get('api/reservasi/:id/e-ticket')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cetak E-Ticket / Bukti Nota Digital Reservasi' })
  getETicket(@Param('id') id: number, @Req() req) {
    return this.reservasiService.getETicket(+id, );
  }

  @Get('api/reservasi/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lihat Detail Reservasi Berdasarkan ID' })
  findOneDetail(@Param('id') id: number, @Req() req) {
    return this.reservasiService.findOneDetail(+id, );
  }

  @Patch('api/reservasi/:id/cancel')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Batalkan Pemesanan (Member)' })
  cancelMember(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'member') throw new Error('Unauthorized');
    return this.reservasiService.cancelMember(+id, req.user.sub);
  }

  // Admin Endpoints
  @Get('api/admin/reservasi')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lihat Seluruh Data Reservasi Coworking Space' })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  @ApiQuery({ name: 'status', required: false })
  @ApiQuery({ name: 'id_space', required: false })
  @ApiQuery({ name: 'tanggal', required: false })
  findAllAdmin(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('status') status: string,
    @Query('id_space') id_space: string,
    @Query('tanggal') tanggal: string,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.reservasiService.findAllAdmin(req.user.sub, {
      month,
      year,
      status,
      id_space,
      tanggal });
  }

  @Patch('api/admin/reservasi/:id/status')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Konfirmasi & Ubah Status Pemesanan (Admin)' })
  updateStatusAdmin(
    @Param('id') id: number,
    @Body() dto: UpdateReservasiStatusDto,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.reservasiService.updateStatusAdmin(
      +id,
      dto.status,
      );
  }

  @Post('api/admin/reservasi/:id/check-in')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check-In Pelanggan (Aktif)' })
  checkInAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.reservasiService.checkInAdmin(+id, );
  }

  @Post('api/admin/reservasi/:id/check-out')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Check-Out Pelanggan (Selesai)' })
  checkOutAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.reservasiService.checkOutAdmin(+id, );
  }
}
