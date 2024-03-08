import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './modules/auth/auth.module';
import { GameModule } from './modules/game/game.module';
import { Game } from './entities/game.entity';
import { AwsModule } from './modules/aws/aws.module';
import { JwtModule } from './modules/jwt/jwt.module';
import { BucketModule } from './modules/bucket/bucket.module';

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
        ssl: {
          rejectUnauthorized: true,
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUS7DNakLpVnbvQjxiFSiEqr43Jo4wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvZDMyMjk1MGItZTRjYy00NTdiLTk5MDktN2VhYjE2YzVl
MzY5IFByb2plY3QgQ0EwHhcNMjMxMTA0MTgxNDUxWhcNMzMxMTAxMTgxNDUxWjA6
MTgwNgYDVQQDDC9kMzIyOTUwYi1lNGNjLTQ1N2ItOTkwOS03ZWFiMTZjNWUzNjkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAObMZj1w
2MT2673QqLRrKunJnrGgVJ81RXrCuYm1HcRuBLuIHar9tjilZ/wHGzjbQYGQcok5
XAoSTcgSNczNuWyN/+g4olwM3nlMnqBVfx6SL5ZrMwSLht6YhxmpBBJyHM6MTDXI
aFthbok3KkhTkJjWbxsTfMDUQJmJTn3MCRp2DCiOSeyrOKrYy6FKkqh5teHQ3XZ9
Ehtj2/5BsiLvyd0I43AUTcHE2k3ROhlmF4ahUR35lexnasCjgtm718sMrkisQTS1
xjZZnijex8EKC+2UhmbjzjBJaNj+lcKG2gO/dPE/5d6Nht7acMHuY4npkbhrz+Bt
K/JQT4zGRYDPfhSAl9aVVWw2MttZUoAUxQ7+yF+n5MI8y/CuFqB+L/wG6v14KEfw
YnuTQl07hcu35D6S8c3eTQ0JH8afuZjGAbT5UujlRASfDuVBdEjnWhHPvPJxaMCl
tKc/DwWjq0olLSY+Sh9dSUE0hzf7Qvlq42xuCACPbwAnv50epDNSZ6QSSwIDAQAB
oz8wPTAdBgNVHQ4EFgQU6zlJZ58KJ8BxGoVt/fzgho3hTugwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAEmJb8uS4RbTmMWY
SeBEXLRlOBcgb7fLaSoZrJj8UgYAKEoGGj6JF1XaP6NiTqaojyCmGdM8WsVY033z
dsrwluvLg+5yrE75HfxawTfjftpfP5WOiJR1/QGr+5RwXgZbbpKQv5eDCjvNqcak
tNg8AbbXhwXeXpZxG6qUrvtJplvF0Kv8rmIR1+k2SEy2k8kzXEaJ3N5zbcmnjwyN
DQX8uQE1sy7DugxFT3JNKi8r3ytahkI9xalwCCLvSuxmOxTLxk00Is9FXPdPBoMl
bRod7ni7cuJOnO2uT66DieJmfR+OtUFcjNjO5cJG7BD54TjDQDQ4XK89bIlc8wwK
O45WwmUsX7UJF6oTsbw4Qa1tdcsfN3dVXAzF8Mbf2/x/lSgeM3WY3/Iujc7ZBeCL
Spz4fj0b3QJW10VGZHSp8L/8m/JgNzQxt9gBMyF/Nya/jcrllpRf44M8NmdSx5+/
u+eHFzRpOTaR2MKFOKcUve8gR0Zmk7yLAZn4wreHz1Jh+GovUA==
-----END CERTIFICATE-----`,
        },
        entities: [__dirname + '/entities/*.entity{.js, .ts}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    GameModule,
    AwsModule,
    JwtModule,
    BucketModule,
  ],
  providers: [AppService],
})
export class AppModule {}
