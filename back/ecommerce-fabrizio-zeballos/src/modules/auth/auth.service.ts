import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { User } from '../../entities/users.entity';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ message: string; token: string }> {
    const user: User = await this.usersRepository.getUserByEmail(email);

    if (!user)
      throw new UnauthorizedException('Invalid email address or password');

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches)
      throw new UnauthorizedException('Invalid email address or password');

    const userPayload = {
      sub: user.id,
      id: user.id,
      email: user.email,
      roles: [user.isAdmin ? Role.ADMIN : Role.USER],
    };
    const token = this.jwtService.sign(userPayload);

    if (!token)
      throw new BadRequestException('Failed to create authentication token');

    return { message: 'User logged in', token };
  }

  async signUp(user: CreateUserDto): Promise<User> {
    const foundUser: User = await this.usersRepository.getUserByEmail(
      user.email,
    );

    if (foundUser) throw new BadRequestException('User already exists');

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser: User = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.phone = user.phone;
    newUser.address = user.address;
    if (user.country) newUser.country = user.country;
    if (user.city) newUser.city = user.city;

    const registerdUser: User = await this.usersRepository.createUser(newUser);

    delete registerdUser.password;
    delete registerdUser.isAdmin;

    return registerdUser;
  }
}
