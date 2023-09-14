import { OmitType } from '@nestjs/swagger';
import { Game } from '../../../entities/game.entity';

export class AddGameDto extends OmitType(Game, [
  'id',
  'createdAt',
  'usersOwned',
] as const) {}
