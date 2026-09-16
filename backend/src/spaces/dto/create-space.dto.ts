import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty({ example: 'Personal Desk Alpha 01' })
  @IsNotEmpty()
  @IsString()
  nama_space: string;

  @ApiProperty({ example: 25000 })
  @IsNotEmpty()
  @IsNumber()
  harga_per_jam: number;

  @ApiProperty({ example: 'desk' })
  @IsNotEmpty()
  @IsString()
  tipe: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  kapasitas: number;

  @ApiProperty({ example: 'WiFi 100Mbps, stopkontak, coffee' })
  @IsNotEmpty()
  @IsString()
  deskripsi: string;

  @ApiPropertyOptional({ example: 'desk_alpha_01.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;
}
