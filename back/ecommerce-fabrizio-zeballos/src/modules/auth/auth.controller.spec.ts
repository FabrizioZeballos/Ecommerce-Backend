import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;

  let mockLoggedIn = {
    message: 'User logged in',
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvaG5kb2UifQ.fake_signature',
  };

  let mockService: Partial<AuthService> = {
    signIn: (email: string, password: string) => Promise.resolve(mockLoggedIn),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('service should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('signIn', () => {
    it('should return an object with a message and a token', async () => {
      const credentials = {
        email: 'fabrizio.zeballos@gmail.com',
        password: '123456',
      };

      const result = await controller.signIn(credentials);

      expect(result).toEqual(mockLoggedIn);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
