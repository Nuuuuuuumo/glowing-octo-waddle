import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';
import { Game } from '../../entities/game.entity';
import { BucketRepository } from './bucket.repository';
import { DeleteGameFromBucketDto } from './dtos/deleteGameFromBucket.dto';

@Injectable()
export class BucketService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Game) private readonly gameRepository: Repository<Game>,
    private readonly bucketRepository: BucketRepository,
  ) {}

  async getBucket(req: Request, res: Response) {
    const bucket = await this.bucketRepository.findOne({
      relations: ['games'],
      where: { user: { id: req.user['id'] } },
    });
    if (!bucket) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `User ${req.user} not found` });
    }
    bucket.totalPrice = bucket.games.reduce(
      (acc, game) => acc + +game.price,
      0,
    );

    return res.status(HttpStatus.OK).send(bucket);
  }

  async deleteGameFromBucket(dto: DeleteGameFromBucketDto, res: Response) {
    await this.bucketRepository.deleteGameFromUserBucket(dto);
    const bucket = await this.bucketRepository.findOne({
      where: { id: dto.bucketId },
      relations: ['games'],
    });
    return res.status(HttpStatus.OK).send(bucket);
  }

  async addGameToBucket(gameId: string, req: Request, res: Response) {
    const user = await this.userRepository.findOne({
      where: { id: req.user['id'] },
    });
    if (!user) {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: `User ${req.user} not found` });
    }
    let userBucket = await this.bucketRepository.findOneBy({
      user: { id: user.id },
    });
    if (!userBucket) {
      userBucket = await this.bucketRepository.save({
        user,
      });
    }
    const game = await this.gameRepository.findOne({ where: { id: gameId } });
    if (!game) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send({ message: `Game ${gameId} not found` });
    }

    await this.bucketRepository.addGameToUserBucket({
      bucketId: userBucket.id,
      gameId: game.id,
    });

    const bucket = await this.bucketRepository.findOne({
      where: { id: userBucket.id },
      relations: ['games'],
    });
    bucket.totalPrice = bucket.games.reduce(
      (acc, game) => acc + +game.price,
      0,
    );
    return res.status(HttpStatus.OK).send(bucket);
  }
}
