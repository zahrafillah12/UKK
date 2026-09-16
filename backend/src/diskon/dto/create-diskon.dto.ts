import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDiskonDto {
  @ApiProperty({ example: 'PROMOAGUSTUS' })
  @IsNotEmpty()
  @IsString()
  nama_diskon: string;

  @ApiProperty({ example: 20 })
  @IsNotEmpty()
  @IsNumber()
  persentase_diskon: number;

  @ApiProperty({ example: '2026-08-01T00:00:00Z' })
  @IsNotEmpty()
  @IsString()
  tanggal_awal: string;

  @ApiProperty({ example: '2026-08-31T23:59:59Z' })
  @IsNotEmpty()
  @IsString()
  tanggal_akhir: string;
}
