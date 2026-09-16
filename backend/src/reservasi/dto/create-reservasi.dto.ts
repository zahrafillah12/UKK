import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateReservasiDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  id_space: number;

  @ApiProperty({ example: '2026-08-30' })
  @IsNotEmpty()
  @IsString()
  tanggal_reservasi: string;

  @ApiProperty({ example: '09:00' })
  @IsNotEmpty()
  @IsString()
  jam_mulai: string;

  @ApiProperty({ example: 3 })
  @IsNotEmpty()
  @IsNumber()
  durasi_jam: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @IsNumber()
  id_diskon?: number;

  @ApiPropertyOptional({ example: 'DISKONHEMAT20' })
  @IsOptional()
  @IsString()
  kode_promo?: string;
}
