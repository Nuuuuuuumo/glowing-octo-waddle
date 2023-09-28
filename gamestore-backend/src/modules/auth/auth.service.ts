import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JWTService } from './jwt.service';
import { LoginDto } from './dtos/login.dto';
import { RegistrationDto } from './dtos/registration.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly jwtService: JWTService,
  ) {}

  //REGISTER USER
  async registerUser(registrationDto: RegistrationDto, res: Response) {
    const { firstName, lastName, email, password } = registrationDto;
    if (
      !firstName?.trim() ||
      !lastName?.trim() ||
      !email?.trim() ||
      !password?.trim()
    ) {
      return res
        .status(500)
        .send({ message: 'Not all required fields have been filled in.' });
    }
    try {
      const hashSalt = await bcrypt.genSalt(7);
      const hashedPassword = await bcrypt.hash(password, hashSalt);
      const newUser = await this.userRepository.save({
        ...registrationDto,
        password: hashedPassword,
      });
      const accessToken = await this.jwtService.generateTokens(newUser, res);
      return res.status(200).send({ ...newUser, accessToken });
    } catch (error) {
      if (error.code === '23505') {
        return res
          .status(500)
          .send({ message: 'There is already a user with this email.' });
      }
      return res.status(500).send({ message: error.message });
    }
  }

  //LOGIN USER
  async loginUser(loginDto: LoginDto, res: Response) {
    const { email, password } = loginDto;

    if (!email?.trim() || !password.trim()) {
      return res
        .status(401)
        .send({ message: 'Not all required fields have been filled in.' });
    }
    const foundedUser = await this.userRepository.findOne({
      where: { email },
    });

    if (
      !foundedUser ||
      !(await bcrypt.compare(password, foundedUser.password))
    ) {
      return res.status(404).send({ message: 'Invalid Credentials.' });
    }
    delete foundedUser.createdAt;
    delete foundedUser.password;
    const accessToken = await this.jwtService.generateTokens(foundedUser, res);
    return res.status(200).send({ ...foundedUser, accessToken });
  }

  //REFRESH TOKEN
  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token not found' });
    }

    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get('REFRESH_SECRET_KEY'),
    });

    if (!payload) {
      return res.status(401).json({ message: 'Unauthenticated' });
    }

    const user = await this.userRepository.findOne({
      where: { id: payload.id },
    });

    if (!user) {
      return res.status(401).send({ message: 'Unauthenticated' });
    }

    const accessToken = await this.jwtService.generateTokens(user, res);
    return res.status(200).send(accessToken);
  }
}
