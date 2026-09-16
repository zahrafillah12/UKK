import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards } from '@nestjs/common';
import { DiskonService } from './diskon.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { CheckPromoDto } from './dto/check-promo.dto';
import { CreateDiskonDto } from './dto/create-diskon.dto';
import { UpdateDiskonDto } from './dto/update-diskon.dto';

@ApiTags('Diskon & Promo')
@Controller()
export class DiskonController {
  constructor(private readonly diskonService: DiskonService) {}

  @Get('api/diskon/active')
  @ApiOperation({ summary: 'Daftar Promo / Diskon yang Sedang Aktif' })
  findActivePublic(@Req() req) {
    return this.diskonService.findActivePublic();
  }

  @Post('api/diskon/check')
  @ApiOperation({ summary: 'Periksa Validitas & Hitung Potongan Kode Promo' })
  checkPromo(@Body() dto: CheckPromoDto, @Req() req) {
    return this.diskonService.checkPromo(dto, );
  }

  @Get('api/diskon/:id')
  @ApiOperation({ summary: 'Lihat Detail Diskon Berdasarkan ID' })
  findOnePublic(@Param('id') id: number, @Req() req) {
    return this.diskonService.findOnePublic(+id, );
  }

  // Admin Endpoints
  @Get('api/admin/diskon')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Daftar Semua Kode Promo / Diskon Event' })
  findAllAdmin(@Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.diskonService.findAllAdmin(req.user.sub);
  }

  @Post('api/admin/diskon')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah Kode Promo / Event Diskon Baru' })
  createAdmin(@Body() dto: CreateDiskonDto, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.diskonService.createAdmin(dto, );
  }

  @Get('api/admin/diskon/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Detail Data Diskon Berdasarkan ID' })
  findOneAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.diskonService.findOneAdmin(+id, );
  }

  @Put('api/admin/diskon/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Kode Promo & Periode Diskon' })
  updateAdmin(
    @Param('id') id: number,
    @Body() dto: UpdateDiskonDto,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.diskonService.updateAdmin(+id, dto, );
  }

  @Delete('api/admin/diskon/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus Kode Promo / Diskon' })
  removeAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.diskonService.removeAdmin(+id, );
  }
}
