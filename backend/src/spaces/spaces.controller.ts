import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards } from '@nestjs/common';
import { SpacesService } from './spaces.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { CreateSpaceDto } from './dto/create-space.dto';
import { UpdateSpaceDto } from './dto/update-space.dto';

@ApiTags('Space Coworking')
@Controller()
export class SpacesController {
  constructor(private readonly spacesService: SpacesService) {}

  @Get('api/spaces/types')
  @ApiOperation({ summary: 'Daftar Tipe Space' })
  getTypes() {
    return this.spacesService.getTypes();
  }

  @Get('api/spaces/availability')
  @ApiOperation({ summary: 'Cek Ketersediaan Space Berdasarkan Tanggal & Jam' })
  @ApiQuery({ name: 'id_space', type: Number })
  @ApiQuery({ name: 'tanggal', type: String })
  @ApiQuery({ name: 'jam_mulai', type: String })
  @ApiQuery({ name: 'durasi_jam', type: Number })
  getAvailability(
    @Query('id_space') id_space: number,
    @Query('tanggal') tanggal: string,
    @Query('jam_mulai') jam_mulai: string,
    @Query('durasi_jam') durasi_jam: number,
    @Req() req,
  ) {
    return this.spacesService.getAvailability(
      +id_space,
      tanggal,
      jam_mulai,
      +durasi_jam,
      );
  }

  @Get('api/spaces')
  @ApiOperation({
    summary: 'Lihat Semua Space Coworking (Katalog Meja/Ruangan)' })
  @ApiQuery({ name: 'tipe', required: false, type: String })
  @ApiQuery({ name: 'search', required: false, type: String })
  findAllPublic(
    @Query('tipe') tipe: string,
    @Query('search') search: string,
    @Req() req,
  ) {
    return this.spacesService.findAllPublic(tipe, search);
  }

  @Get('api/spaces/:id')
  @ApiOperation({ summary: 'Lihat Detail Space Coworking Berdasarkan ID' })
  findOnePublic(@Param('id') id: number, @Req() req) {
    return this.spacesService.findOnePublic(+id, );
  }

  // Admin Endpoints
  @Get('api/admin/spaces')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Daftar Semua Ruangan & Meja Milik Admin' })
  findAllAdmin(@Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.spacesService.findAllAdmin(req.user.sub);
  }

  @Post('api/admin/spaces')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah Ruangan / Meja Space Baru' })
  createAdmin(@Body() dto: CreateSpaceDto, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.spacesService.createAdmin(dto, req.user.sub);
  }

  @Get('api/admin/spaces/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Detail Data Space Berdasarkan ID' })
  findOneAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.spacesService.findOneAdmin(+id, req.user.sub);
  }

  @Put('api/admin/spaces/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Ruangan & Fasilitas Space' })
  updateAdmin(
    @Param('id') id: number,
    @Body() dto: UpdateSpaceDto,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.spacesService.updateAdmin(+id, dto, req.user.sub);
  }

  @Delete('api/admin/spaces/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus Data Ruangan / Meja Space' })
  removeAdmin(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.spacesService.removeAdmin(+id, req.user.sub);
  }
}
