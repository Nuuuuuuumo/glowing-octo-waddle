import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { BucketService } from './bucket.service';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../../common/guards/jwt-auth.guard';
import { DeleteGameFromBucketDto } from './dtos/deleteGameFromBucket.dto';

@ApiTags('Bucket')
@Controller('bucket')
export class BucketController {
  constructor(private readonly bucketService: BucketService) {}

  @Post('/addGameToBucket')
  @UseGuards(JwtGuard)
  async addGameToBucket(
    @Body('gameId') gameId: string,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    return this.bucketService.addGameToBucket(gameId, request, response);
  }

  @Get('/getBucket')
  @UseGuards(JwtGuard)
  async getBucket(@Req() request: Request, @Res() response: Response) {
    return this.bucketService.getBucket(request, response);
  }

  @Post('/deleteGameFromBucket')
  @UseGuards(JwtGuard)
  async deleteGameFromBucket(
    @Body() dto: DeleteGameFromBucketDto,
    @Res() response: Response,
  ) {
    return this.bucketService.deleteGameFromBucket(dto, response);
  }
}
