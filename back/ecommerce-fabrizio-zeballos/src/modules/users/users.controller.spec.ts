import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from '../../entities/users.entity';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

describe('UsersController', () => {
  let controller: UsersController;

  let userMock: User = {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    name: 'Fabrizio Zeballos',
    email: 'fabrizio@gmail.com',
    password: '$2b$10$tl3sYJlFVh2Wd0yOj4ZqMeelZyPzqoKXnJKpjsZIxVeMNs5pG5ZTK',
    phone: 261555555,
    address: 'Huarpes',
    country: 'Argentina',
    city: 'Las Heras',
    isAdmin: false,
    orders: [],
  };

  let serviceMock: Partial<UsersService> = {
    getUserById: (id: string): Promise<User> => Promise.resolve(userMock),
  };

  let authGuardMock: Partial<AuthGuard> = {
    canActivate: (
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> =>
      Promise.resolve(true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        JwtService,
        {
          provide: UsersService,
          useValue: serviceMock,
        },
        {
          provide: AuthGuard,
          useValue: authGuardMock,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUserById', () => {
    beforeEach(() => {});

    it('should return a User', async () => {
      const result = await controller.getUserById(userMock.id);

      expect(result).toEqual(userMock);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
