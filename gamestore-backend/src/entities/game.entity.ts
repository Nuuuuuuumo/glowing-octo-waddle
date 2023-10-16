import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import {
  IsArray,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Validate,
} from 'class-validator';
import { IsDecimalMin } from '../validators/number/IsDecimalMin';
import { IsTrimmedNotEmpty } from '../validators/string/IsNotEmptyAfterTrim';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

@Entity('Game')
export class Game {
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'The name of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  title!: string;

  @ApiProperty({ description: 'The genre of the game' })
  @IsString()
  @IsNotEmpty()
  @Column()
  genre!: string;

  @ApiProperty({
    description: 'The price of the game',
    default: 1.11,
    type: Number,
  })
  @Column({ type: 'decimal', precision: 10, scale: 2 }) // Adjust precision and scale as needed
  @IsNotEmpty()
  @IsDecimal(
    { decimal_digits: '2' },
    { message: 'Price should be two numbers after dot. For example: 25.99' },
  )
  @Validate(IsDecimalMin)
  price: number;

  @ApiProperty({ description: 'The description of the game' })
  @IsString()
  @Column('text')
  description!: string;

  @Exclude()
  @ApiProperty({ description: 'Users, who have this game' })
  @Column('varchar', { array: true, default: [] })
  @IsArray()
  @ManyToMany(() => User, (user) => user.games, {
    cascade: ['insert', 'update'],
  })
  @JoinTable()
  usersOwned: User[];

  @ApiProperty({ description: 'The platform of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  platform: string;

  @ApiProperty({ description: 'The publisher of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  publisher: string;

  @ApiProperty({ description: 'The developer of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  developer: string;

  @ApiProperty({ description: 'The rating of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column()
  rating: string;

  @ApiProperty({ description: 'The imageUrl of the game' })
  @IsString()
  @Validate(IsTrimmedNotEmpty)
  @Column('text')
  imageUrl: string;

  @ApiProperty({ description: 'The stockQuantity of the game' })
  @IsInt()
  @IsNotEmpty()
  @Column('integer')
  stockQuantity: number;

  @ApiProperty({ description: 'Is multiplayer support' })
  @IsBoolean()
  @IsNotEmpty()
  @Column({ type: 'boolean' })
  multiplayerSupport: boolean;

  @ApiProperty({ description: 'Is multiplayer support' })
  @IsDate()
  @CreateDateColumn()
  createdAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
