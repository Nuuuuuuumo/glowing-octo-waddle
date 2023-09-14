import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GameService } from './game.service';
import { AddGameDto } from './dtos/addGame.dto';
import { Response } from 'express';
import { JwtGuard } from '../../guards/jwt-auth.guard';
import { GiftGameDto } from './dtos/giftGame.dto';

@ApiTags('Game')
@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(JwtGuard)
  @Post('/addGame')
  addGame(@Body() addGameDto: AddGameDto, @Res() res: Response) {
    return this.gameService.addGame(addGameDto, res);
  }

  @UseGuards(JwtGuard)
  @Post('/giftGame')
  @ApiBearerAuth('JWT-auth')
  giftGame(@Body() giftGameDto: GiftGameDto, @Res() res: Response) {
    return this.gameService.giftGame(giftGameDto, res);
  }

  @Get('getOne/:id')
  getOne(@Param('id') id: string, @Res() res: Response) {
    return this.gameService.getGameById(id, res);
  }
}
