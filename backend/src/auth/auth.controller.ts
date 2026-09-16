import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterMemberDto } from './dto/register-member.dto';
import { RegisterAdminSpaceDto } from './dto/register-admin-space.dto';
import { LoginUserDto } from './dto/login-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiHeader } from '@nestjs/swagger';
import { UserGuard } from '../common/guards/user.guard';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/member')
  @ApiOperation({ summary: 'Registrasi Akun Member / Pelanggan Baru' })
  registerMember(@Body() dto: RegisterMemberDto, @Req() req) {
    return this.authService.registerMember(dto, );
  }

  @Post('register/admin-space')
  @ApiOperation({
    summary: 'Registrasi Pengelola Lokasi / Admin Coworking Space' })
  registerAdminSpace(@Body() dto: RegisterAdminSpaceDto, @Req() req) {
    return this.authService.registerAdminSpace(dto, );
  }

  @Post('login')
  @ApiOperation({ summary: 'Login Akun Pengguna (Member atau Admin Space)' })
  login(@Body() dto: LoginUserDto, @Req() req) {
    return this.authService.login(dto, );
  }

  @Get('profile')
  @UseGuards(UserGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lihat Profil Pengguna yang Sedang Login' })
  getProfile(@Req() req) {
    return this.authService.getProfile(req.user.sub);
  }
}
