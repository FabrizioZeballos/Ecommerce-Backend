import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dtos/signIn.dto';
import { CreateUserDto } from '../users/dtos/createUser.dto';
import { User } from '../../entities/users.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(
    @Body() credentials: LoginUserDto,
  ): Promise<{ message: string; token: string }> {
    const { email, password } = credentials;

    return await this.authService.signIn(email, password);
  }

  @Post('signup')
  async signUp(@Body() user: CreateUserDto): Promise<User> {
    return await this.authService.signUp(user);
  }
}
