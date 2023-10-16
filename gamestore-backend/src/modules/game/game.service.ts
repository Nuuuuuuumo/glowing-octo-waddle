import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGameDto } from './dtos/addGame.dto';
import { Response } from 'express';
import { GiftGameDto } from './dtos/giftGame.dto';
import { User } from '../../entities/user.entity';
import {
  classToClassFromExist,
  classToPlain,
  classToPlainFromExist,
} from 'class-transformer';
import { GameDto } from './dtos/game.dto';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async addGame(addGameDto: AddGameDto, res: Response) {
    if (!addGameDto) {
      return res
        .status(500)
        .send({ message: 'Please, enter data for create new game!' });
    }
    try {
      const newGame = await this.gameRepository.save(addGameDto);
      return res.status(200).send(newGame);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  async giftGame(giftGame: GiftGameDto, res: Response) {
    if (!giftGame) {
      return res
        .status(500)
        .send({ message: 'Please, enter data for gifting game!' });
    }
    try {
      const { userId, gameId } = giftGame;
      const game = await this.gameRepository.findOne({
        where: { id: gameId },
      });

      if (!game) {
        return res.status(500).send({ message: 'This game doesnt exist' });
      }
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        return res.status(500).send({ message: 'This user doesnt exist' });
      }
      await this.dataSource
        .createQueryBuilder()
        .relation(User, 'games')
        .of(user)
        .add(game);
      return res.status(200).send({
        message: `Game gifted to user ${user.firstName} ${user.lastName} successfully`,
      });
    } catch (error) {
      if (error.code === '23505') {
        return res
          .status(400)
          .send({ message: 'Game is already owned by this user' });
      }
      console.error('Error adding game to user:', error);
      return res.status(500).send({ message: 'Error adding game to user' });
    }
  }
  async getGameById(id: string, res: Response) {
    if (!id) {
      return res.status(500).send({ message: 'Provide game id, please' });
    }
    const game = await this.gameRepository.findOne({
      relations: ['usersOwned'],
      where: { id },
    });
    if (!game) {
      return res.status(500).send({ message: 'Incorrect id of game' });
    }
    return res.status(200).send(game);
  }

  async getAllGames(res: Response) {
    const games = await this.gameRepository.find({
      relations: ['usersOwned'],
    });
    if (!games) {
      return res.status(500).send({ message: 'Games didnt found' });
    }
    const mappedGames = classToPlainFromExist<Game[]>(games, {
      excludeExtraneousValues: true,
    }) as GameDto[];
    return res.status(200).send(mappedGames);
  }
}
