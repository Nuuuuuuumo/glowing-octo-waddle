import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Bucket } from '../../entities/bucket.entity';
import { DeleteGameFromBucketDto } from './dtos/deleteGameFromBucket.dto';

@Injectable()
export class BucketRepository extends Repository<Bucket> {
  constructor(dataSource: DataSource) {
    super(Bucket, dataSource.createEntityManager());
  }
  public async addGameToUserBucket(dto: { gameId: string; bucketId: string }) {
    await this.createQueryBuilder()
      .relation(Bucket, 'games')
      .of(dto.bucketId)
      .add(dto.gameId);
  }

  public async deleteGameFromUserBucket(dto: DeleteGameFromBucketDto) {
    await this.createQueryBuilder()
      .relation(Bucket, 'games')
      .of(dto.bucketId)
      .remove(dto.gameId);
  }
}
