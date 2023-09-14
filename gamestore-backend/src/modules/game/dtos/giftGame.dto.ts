import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { PrimaryGeneratedColumn } from 'typeorm';

export class GiftGameDto {
  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  gameId: string;

  @ApiProperty({ type: String })
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  userId: string;
}
