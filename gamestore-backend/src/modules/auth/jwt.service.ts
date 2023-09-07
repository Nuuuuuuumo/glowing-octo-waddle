import { Inject, Injectable, Res } from '@nestjs/common';
import { JwtService as JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';

@Injectable()
export class JWTService extends JwtService {
  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    super({ secret: configService.get('ACCESS_SECRET_KEY') });
  }

  async generateTokens(user: User, @Res() res) {
    const payload = {
      sub: {
        id: user.id,
        email: user.email,
      },
    };
    const accessToken = this.sign(payload, {
      expiresIn: '15m',
      secret: this.configService.get('ACCESS_SECRET_KEY'),
    });

    const refreshToken = this.sign(payload, {
      expiresIn: '7d',
      secret: this.configService.get('REFRESH_SECRET_KEY'),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return accessToken;
  }
}
