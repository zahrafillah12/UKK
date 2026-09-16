import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCoworkingProfileDto {
  @ApiProperty({ example: 'Moklet Hub Coworking Space' })
  @IsNotEmpty()
  @IsString()
  nama_coworking: string;

  @ApiProperty({ example: 'Ahmad Bidin, S.Kom' })
  @IsNotEmpty()
  @IsString()
  nama_pemilik: string;

  @ApiProperty({ example: '081298765432' })
  @IsNotEmpty()
  @IsString()
  telp: string;
}
