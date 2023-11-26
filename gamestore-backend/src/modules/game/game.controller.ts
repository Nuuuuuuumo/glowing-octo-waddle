import {
  Body,
  Controller,
  Get,
  Param,
  ParseArrayPipe,
  Post,
  Query,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ApiConsumes, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { Response, Request } from 'express';
import { JwtGuard } from '../../common/guards/jwt-auth.guard';
import { GiftGameDto } from './dtos/giftGame.dto';
import { QueryParamsTypes } from './types/QueryParams.types';
import { FileInterceptor } from '@nestjs/platform-express';
import { AddGameDto } from './dtos/addGame.dto';

@ApiTags('Game')
@Controller('games')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtGuard)
  @Post('/addGame')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  addGame(
    @UploadedFile() image: Express.Multer.File,
    @Body() formData: Record<string, string>,
    @Res() res: Response,
  ) {
    const addGameDto: AddGameDto = JSON.parse(formData['data']);
    return this.gameService.addGame(res, addGameDto, image);
  }

  @UseGuards(JwtGuard)
  @Post('/giftGame')
  giftGame(@Body() giftGameDto: GiftGameDto, @Res() res: Response) {
    return this.gameService.giftGame(giftGameDto, res);
  }

  @UseGuards(JwtGuard)
  @Get('game/:id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    return this.gameService.getGameById(id, res);
  }

  @Get('/')
  getGames(@Res() res: Response) {
    return this.gameService.getGames(res);
  }

  @ApiOperation({ summary: 'Get Activity Post Pagination Enabled' })
  @ApiQuery({ name: 'title', required: false, type: String })
  @ApiQuery({ name: 'rating', required: false, type: Number })
  @ApiQuery({ name: 'genres', required: false, type: Array<string> })
  @ApiQuery({ name: 'platforms', required: false, type: Array<string> })
  @Get('/filteredGames')
  getFilteredGames(
    @Res() res: Response,
    @Req() req: Request,
    @Query('title') title: string,
    @Query('rating') rating: string,
    @Query('genres', new ParseArrayPipe({ separator: ',', optional: true }))
    genres: string[],
    @Query('platforms', new ParseArrayPipe({ separator: ',', optional: true }))
    platforms: string[],
  ) {
    const queryParams: QueryParamsTypes = {
      title: title,
      rating: rating,
      genres: genres,
      platforms: platforms,
    };
    return this.gameService.getFilteredGames(req, res, queryParams);
  }

  @UseGuards(JwtGuard)
  @Get('/getGenresAndPlatforms')
  getGenresAndPlatforms(@Res() res: Response) {
    return this.gameService.getGenresAndPlatforms(res);
  }
}
