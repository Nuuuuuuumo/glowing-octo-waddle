import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { JwtGuard } from '../../guards/jwt-auth.guard';
import { LoginDto } from './dtos/login.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegistrationDto } from './dtos/registration.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 200, description: 'User registration.' })
  @Post('/registration')
  registerUser(@Body() registrationDto: RegistrationDto, @Res() res: Response) {
    return this.authService.registerUser(registrationDto, res);
  }

  @ApiResponse({ status: 200, description: 'User login.' })
  @Post('/login')
  loginUser(@Body() loginDto: LoginDto, @Res() res: Response) {
    return this.authService.loginUser(loginDto, res);
  }

  @ApiResponse({ status: 200, description: 'Verify User' })
  @UseGuards(JwtGuard)
  @Post('/me')
  fetchMe(@Req() req: Request) {
    return req.user;
  }
  @ApiResponse({ status: 200, description: 'User logout.' })
  @UseGuards(JwtGuard)
  @Post('/logout')
  logoutUser(@Req() req: Request, @Res() res: Response) {
    return this.authService.logoutUser(req, res);
  }
  @ApiResponse({
    status: 200,
    description: 'Update refresh and access token.',
    headers: {
      'Set-Cookie': {
        description: 'Required: The authentication cookie.',
      },
    },
  })
  @Get('/refresh')
  refreshToken(@Req() req: Request, @Res() res: Response) {
    return this.authService.refreshToken(req, res);
  }
}
