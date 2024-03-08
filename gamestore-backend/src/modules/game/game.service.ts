import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AddGameDto } from './dtos/addGame.dto';
import { Response, Request } from 'express';
import { GiftGameDto } from './dtos/giftGame.dto';
import { User } from '../../entities/user.entity';
import { classToPlainFromExist } from 'class-transformer';
import { GameRepository } from './game.repository';
import { Platform } from '../../entities/platform.entity';
import { Genre } from '../../entities/genre.entity';
import { QueryParamsTypes } from './types/QueryParams.types';
import { AwsService } from '../aws/aws.service';

@Injectable()
export class GameService {
  constructor(
    private readonly gameRepository: GameRepository,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @Inject(AwsService)
    private readonly awsService: AwsService,
    @InjectRepository(Platform)
    private readonly platformRepository: Repository<Platform>,
  ) {}

  async addGame(res: Response, dto: AddGameDto, image?: Express.Multer.File) {
    const s3Response = await this.awsService.uploadImage(image);
    const newDto = { ...dto, imageUrl: s3Response };
    const game = await this.gameRepository.createGame(newDto);
    return res.status(HttpStatus.OK).send(game);
  }

  async deleteGame(id: string, res: Response) {
    await this.gameRepository.delete(id);
    return res.status(HttpStatus.OK).send('Successfully deleted');
  }

  async giftGame(dto: GiftGameDto, res: Response) {
    await this.gameRepository.giftGame(dto);
    return res.status(HttpStatus.OK).send('Successfully gifted');
  }

  async getGames(res: Response) {
    const games = await this.gameRepository.find();
    return res.status(HttpStatus.OK).send(games);
  }

  async getGameById(id: string, res: Response) {
    const game = await this.gameRepository.findOne({
      relations: ['usersOwned', 'genres', 'platforms'],
      where: { id },
    });
    return res.status(HttpStatus.OK).send(game);
  }

  async getFilteredGames(res: Response, queryParams?: QueryParamsTypes) {
    const { title, rating, genres, platforms } = queryParams;
    const mappedGenres = genres.map((item) => item.toLowerCase());
    const mappedPlatforms = platforms.map((item) => item.toLowerCase());
    const [builder] = await Promise.all([
      this.gameRepository
        .createQueryBuilder('game')
        .leftJoinAndSelect('game.genres', 'genres')
        .leftJoinAndSelect('game.platforms', 'platforms')
        .where('game.title ILIKE :title', { title: `%${title}%` }),
    ]);

    if (!isNaN(+rating) && rating !== '') {
      builder.andWhere('game.rating > :rating', { rating });
    }

    if (
      mappedGenres.length > 0 &&
      mappedGenres.every((item) => item.trim().length)
    ) {
      builder.andWhere('LOWER(genres.name) IN (:...mappedGenres)', {
        mappedGenres,
      });
    }
    if (
      mappedPlatforms.length > 0 &&
      mappedPlatforms.every((item) => item.trim().length)
    ) {
      builder.andWhere('LOWER(platforms.name) IN (:...mappedPlatforms)', {
        mappedPlatforms,
      });
    }

    const games = await builder.getMany();
    return res.status(HttpStatus.OK).send(games);
  }

  // TODO: MAKE SEPARATED MODULES
  async getGenresAndPlatforms(res: Response) {
    const genres = await this.genreRepository.find();
    const platforms = await this.platformRepository.find();
    const mappedGenres = classToPlainFromExist<Genre[]>(genres, {
      excludeExtraneousValues: true,
    }) as any;
    const mappedPlatforms = classToPlainFromExist<Platform[]>(platforms, {
      excludeExtraneousValues: true,
    }) as any;
    return res
      .status(200)
      .send({ genres: mappedGenres, platforms: mappedPlatforms });
  }
}
