import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMemberAdminDto {
  @ApiProperty({ example: 'user_budi' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Secret123!' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Budi Raharjo' })
  @IsNotEmpty()
  @IsString()
  nama_member: string;

  @ApiProperty({ example: 'SMK Telkom Malang' })
  @IsNotEmpty()
  @IsString()
  instansi: string;

  @ApiProperty({ example: 'Jl. Danau Ranau No. 1' })
  @IsNotEmpty()
  @IsString()
  alamat: string;

  @ApiProperty({ example: '085712345678' })
  @IsNotEmpty()
  @IsString()
  telp: string;

  @ApiPropertyOptional({ example: 'budi_raharjo.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;
}
