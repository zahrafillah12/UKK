import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CheckPromoDto {
  @ApiProperty({ example: 'DISKONHEMAT20' })
  @IsNotEmpty()
  @IsString()
  nama_diskon: string;
}
