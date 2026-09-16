import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservasiStatusDto {
  @ApiProperty({
    example: 'disetujui',
    description:
      "'belum_dikonfirm', 'disetujui', 'aktif', 'selesai', 'dibatalkan'",
  })
  @IsNotEmpty()
  @IsString()
  status: string;
}
