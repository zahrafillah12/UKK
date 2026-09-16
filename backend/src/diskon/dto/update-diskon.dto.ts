import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDiskonDto {
  @ApiPropertyOptional({ example: 'PROMOAGUSTUS2026' })
  @IsOptional()
  @IsString()
  nama_diskon?: string;

  @ApiPropertyOptional({ example: 25 })
  @IsOptional()
  @IsNumber()
  persentase_diskon?: number;

  @ApiPropertyOptional({ example: '2026-08-01T00:00:00Z' })
  @IsOptional()
  @IsString()
  tanggal_awal?: string;

  @ApiPropertyOptional({ example: '2026-09-15T23:59:59Z' })
  @IsOptional()
  @IsString()
  tanggal_akhir?: string;
}
