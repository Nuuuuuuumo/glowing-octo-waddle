import { DataSource, Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { AddGameDto } from './dtos/addGame.dto';
import { Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { GiftGameDto } from './dtos/giftGame.dto';

@Injectable()
export class GameRepository extends Repository<Game> {
  constructor(dataSource: DataSource) {
    super(Game, dataSource.createEntityManager());
  }
  public async createGame(dto: AddGameDto) {
    const game = await this.save(dto);
    await this.createQueryBuilder()
      .relation(Game, 'platforms')
      .of(game)
      .add(dto.platforms);
    await this.createQueryBuilder()
      .relation(Game, 'genres')
      .of(game)
      .add(dto.genres);

    return game;
  }
  public async giftGame(dto: GiftGameDto) {
    await this.createQueryBuilder()
      .relation(User, 'games')
      .of(dto.gameId)
      .add(dto.userId);
  }
}
