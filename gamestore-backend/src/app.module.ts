import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';
import { Game } from './entities/game.entity';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Game]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        synchronize: true,
        entities: [__dirname + '/entities/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GameModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
  ],
})
export class AppModule {}
