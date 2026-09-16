import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterAdminSpaceDto {
  @ApiProperty({ example: 'admin_space1' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Admin123!' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'Moklet Hub Coworking' })
  @IsNotEmpty()
  @IsString()
  nama_coworking: string;

  @ApiProperty({ example: 'Ahmad Bidin' })
  @IsNotEmpty()
  @IsString()
  nama_pemilik: string;

  @ApiProperty({ example: '081298765432' })
  @IsNotEmpty()
  @IsString()
  telp: string;
}
