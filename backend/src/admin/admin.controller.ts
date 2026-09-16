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
import { AdminService } from './admin.service';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader,
  ApiQuery } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';
import { UpdateCoworkingProfileDto } from './dto/update-coworking-profile.dto';
import { CreateMemberAdminDto } from './dto/create-member-admin.dto';
import { UpdateMemberAdminDto } from './dto/update-member-admin.dto';

@ApiTags('Panel Admin Space')
@Controller('api/admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('profile')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lihat Data Profil Lokasi Coworking Space' })
  getProfile(@Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.getProfile(req.user.sub);
  }

  @Put('profile')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Profil Lokasi Coworking Space' })
  updateProfile(@Body() dto: UpdateCoworkingProfileDto, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.updateProfile(req.user.sub, dto);
  }

  @Get('members')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Daftar Semua Member / Pelanggan Coworking' })
  @ApiQuery({ name: 'search', required: false })
  findAllMembers(@Query('search') search: string, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.findAllMembers(search);
  }

  @Post('members')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah Data Member Baru' })
  createMember(@Body() dto: CreateMemberAdminDto, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.createMember(dto);
  }

  @Get('members/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Detail Data Member Berdasarkan ID' })
  findOneMember(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.findOneMember(+id);
  }

  @Put('members/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Data Member / Pelanggan' })
  updateMember(
    @Param('id') id: number,
    @Body() dto: UpdateMemberAdminDto,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.updateMember(+id, dto);
  }

  @Delete('members/:id')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus Data Member / Pelanggan' })
  removeMember(@Param('id') id: number, @Req() req) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.removeMember(+id);
  }

  @Get('reports/monthly')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Rekapitulasi Estimasi & Realisasi Pendapatan Per Bulan' })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  getMonthlyReport(
    @Query('month') month: string,
    @Query('year') year: string,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.getMonthlyReport(
      req.user.sub,
      month,
      year,
    );
  }

  @Get('reports/income')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Alias Rekapitulasi Pendapatan Bulanan' })
  @ApiQuery({ name: 'month', required: false })
  @ApiQuery({ name: 'year', required: false })
  getIncomeReport(
    @Query('month') month: string,
    @Query('year') year: string,
    @Req() req,
  ) {
    if (req.user.role !== 'admin_space') throw new Error('Unauthorized');
    return this.adminService.getIncomeReport(
      req.user.sub,
      month,
      year,
    );
  }
}
