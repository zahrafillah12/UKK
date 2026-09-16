import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateMemberAdminDto {
  @ApiPropertyOptional({ example: 'Budi Raharjo, S.T.' })
  @IsOptional()
  @IsString()
  nama_member?: string;

  @ApiPropertyOptional({ example: 'PT Teknologi Hebat' })
  @IsOptional()
  @IsString()
  instansi?: string;

  @ApiPropertyOptional({ example: 'Jl. Danau Ranau No. 2' })
  @IsOptional()
  @IsString()
  alamat?: string;

  @ApiPropertyOptional({ example: '085712345678' })
  @IsOptional()
  @IsString()
  telp?: string;

  @ApiPropertyOptional({ example: 'NewSecret123!' })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiPropertyOptional({ example: 'budi_new.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;
}
