import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterMemberDto {
  @ApiProperty({ example: 'johndoe' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'Secret123!' })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  @IsString()
  nama_member: string;

  @ApiProperty({ example: 'Universitas Indonesia / PT Maju Mundur' })
  @IsNotEmpty()
  @IsString()
  instansi: string;

  @ApiProperty({ example: 'Jl. Sudirman No. 123, Jakarta Selatan' })
  @IsNotEmpty()
  @IsString()
  alamat: string;

  @ApiProperty({ example: '081234567890' })
  @IsNotEmpty()
  @IsString()
  telp: string;

  @ApiPropertyOptional({ example: 'member_john.jpg' })
  @IsOptional()
  @IsString()
  foto?: string;
}
