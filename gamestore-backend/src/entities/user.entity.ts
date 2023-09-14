import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Game } from './game.entity';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('User')
export class User {
  @IsUUID()
  @IsNotEmpty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column('varchar', { array: true, default: [] })
  @ManyToMany(() => Game, (game) => game.usersOwned)
  games: Game[];

  @Column({ unique: true })
  email!: string;

  @Column()
  @Exclude()
  password!: string;

  @CreateDateColumn()
  createdAt: Date;
}
