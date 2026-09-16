import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateSpaceDto {
  @ApiPropertyOptional({ example: 'Personal Desk Alpha 01 (Updated)' })
  @IsOptional()
  @IsString()
  nama_space?: string;

  @ApiPropertyOptional({ example: 30000 })
  @IsOptional()
  @IsNumber()
  harga_per_jam?: number;

  @ApiPropertyOptional({ example: 'desk' })
  @IsOptional()
  @IsString()
  tipe?: string;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @IsNumber()
  kapasitas?: number;

  @ApiPropertyOptional({ example: 'Fasilitas upgrade monitor 27 inch 4K' })
  @IsOptional()
  @IsString()
  deskripsi?: string;

  @ApiPropertyOptional({ example: 'desk_alpha_new.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;
}
