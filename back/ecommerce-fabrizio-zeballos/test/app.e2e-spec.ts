import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  ExecutionContext,
  HttpException,
  HttpStatus,
  INestApplication,
  NotFoundException,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { AuthService } from '../src/modules/auth/auth.service';
import { CreateUserDto } from '../src/modules/users/dtos/createUser.dto';
import { AuthGuard } from '../src/modules/auth/guards/auth.guard';
import { Observable } from 'rxjs';
import { RolesGuard } from '../src/modules/auth/guards/roles.guard';
import { UsersService } from '../src/modules/users/users.service';
import { User } from '../src/entities/users.entity';
import { UpdateUserDto } from '../src/modules/users/dtos/updateUser.dto';
import { ProductsService } from '../src/modules/products/products.service';
import { Product } from '../src/entities/products.entity';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  class MockAuthGuard extends AuthGuard {
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      return true;
    }
  }

  let mockUser: User = {
    id: '1a2b3c4d-1234-5678-9101-112131415161',
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'hashedpassword1',
    isAdmin: false,
    phone: 1234567890,
    address: '123 Elm St',
    country: 'United States',
    city: 'New York',
    orders: [],
  };

  describe('UsersController', () => {
    beforeEach(async () => {
      class MockRolesGuard extends RolesGuard {
        canActivate(
          context: ExecutionContext,
        ): boolean | Promise<boolean> | Observable<boolean> {
          return true;
        }
      }

      class MockUsersService extends UsersService {
        async getUsers(page: number, limit: number): Promise<User[]> {
          const users: User[] = [
            {
              id: '1a2b3c4d-1234-5678-9101-112131415161',
              name: 'John Doe',
              email: 'john.doe@example.com',
              password: 'hashedpassword1',
              isAdmin: false,
              phone: 1234567890,
              address: '123 Elm St',
              country: 'United States',
              city: 'New York',
              orders: [],
            },
            {
              id: '2a3b4c5d-2345-6789-1011-213141516171',
              name: 'Jane Smith',
              email: 'jane.smith@example.com',
              password: 'hashedpassword2',
              isAdmin: false,
              phone: 9876543210,
              address: '456 Oak Ave',
              country: 'United Kingdom',
              city: 'London',
              orders: [],
            },
            {
              id: '3a4b5c6d-3456-7890-1121-314151617181',
              name: 'Alice Johnson',
              email: 'alice.johnson@example.com',
              password: 'hashedpassword3',
              isAdmin: false,
              phone: 1231231234,
              address: '789 Pine Ln',
              country: 'Canada',
              city: 'Toronto',
              orders: [],
            },
            {
              id: '4a5b6c7d-4567-8901-2131-415161718191',
              name: 'Bob Williams',
              email: 'bob.williams@example.com',
              password: 'hashedpassword4',
              isAdmin: true,
              phone: 9879879876,
              address: '101 Birch Blvd',
              country: 'Australia',
              city: 'Sydney',
              orders: [],
            },
            {
              id: '5a6b7c8d-5678-9012-3141-516171819202',
              name: 'Charlie Brown',
              email: 'charlie.brown@example.com',
              password: 'hashedpassword5',
              isAdmin: false,
              phone: 2223334444,
              address: '202 Cedar Ct',
              country: 'Germany',
              city: 'Berlin',
              orders: [],
            },
            {
              id: '6a7b8c9d-6789-0123-4151-617181920212',
              name: 'Daisy Lee',
              email: 'daisy.lee@example.com',
              password: 'hashedpassword6',
              isAdmin: false,
              phone: 3334445555,
              address: '303 Maple Dr',
              country: 'Japan',
              city: 'Tokyo',
              orders: [],
            },
          ];

          if (!users.length) {
            throw new HttpException('No users found', HttpStatus.NOT_FOUND);
          }

          if (!page) page = 1;
          if (!limit) limit = 5;

          const start = (page - 1) * limit;
          const end = start + limit;

          const usersSlice = users.slice(start, end);

          usersSlice.map((user) => {
            delete user.password;
          });

          return usersSlice;
        }

        async getUserById(id: string): Promise<User> {
          if (id === mockUser.id) return mockUser;
          else throw new NotFoundException('User not found');
        }

        async updateUser(id: string, userData: UpdateUserDto): Promise<User> {
          if (id !== mockUser.id) throw new NotFoundException('User not found');

          mockUser.name = userData.name ?? mockUser.name;
          mockUser.email = userData.email ?? mockUser.email;
          mockUser.password = userData.password ?? mockUser.password;
          mockUser.address = userData.address ?? mockUser.address;
          mockUser.phone = userData.phone ?? mockUser.phone;
          mockUser.city = userData.city ?? mockUser.city;
          mockUser.country = userData.country ?? mockUser.country;

          delete mockUser.password;
          delete mockUser.isAdmin;

          return mockUser;
        }

        async deleteUser(id: string): Promise<User> {
          if (id !== mockUser.id) throw new NotFoundException('User not found');

          return mockUser;
        }
      }

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideGuard(AuthGuard)
        .useClass(MockAuthGuard)
        .overrideGuard(RolesGuard)
        .useClass(MockRolesGuard)
        .overrideProvider(UsersService)
        .useClass(MockUsersService)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('Get /users', () => {
      it('should return an OK status code and an array of Users', async () => {
        const res = await request(app.getHttpServer()).get('/users');

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
      });
    });

    describe('Get /users/id', () => {
      it('should return an OK status code and a User', async () => {
        const validUserId = '1a2b3c4d-1234-5678-9101-112131415161';

        const res = await request(app.getHttpServer()).get(
          `/users/${validUserId}`,
        );

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
      });

      it('should return a Not Found error with a 404 status code', async () => {
        const invalidUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

        const res = await request(app.getHttpServer()).get(
          `/users/${invalidUserId}`,
        );

        expect(res.status).toBe(404);
      });
    });

    describe('Put /users/id', () => {
      it('should return an OK status code and the updated User', async () => {
        const validUserId = '1a2b3c4d-1234-5678-9101-112131415161';

        const res = await request(app.getHttpServer()).put(
          `/users/${validUserId}`,
        );

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
      });

      it('should return a Not Found error with a 404 status code', async () => {
        const invalidUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

        const res = await request(app.getHttpServer()).put(
          `/users/${invalidUserId}`,
        );

        expect(res.status).toBe(404);
      });
    });

    describe('Delete /users/id', () => {
      it('should return an OK status code and the deleted User', async () => {
        const validUserId = '1a2b3c4d-1234-5678-9101-112131415161';

        const res = await request(app.getHttpServer()).delete(
          `/users/${validUserId}`,
        );

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
      });

      it('should return a Not Found error with a 404 status code', async () => {
        const invalidUserId = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';

        const res = await request(app.getHttpServer()).delete(
          `/users/${invalidUserId}`,
        );

        expect(res.status).toBe(404);
      });
    });
  });

  describe('AuthController', () => {
    beforeEach(async () => {
      class MockAuthService extends AuthService {
        async signUp(user: CreateUserDto): Promise<User> {
          if (user.email === mockUser.email)
            throw new BadRequestException('User already exists');

          const newUser: User = new User();
          newUser.name = user.name;
          newUser.email = user.email;
          newUser.password = user.password;
          newUser.phone = user.phone;
          newUser.address = user.address;
          if (user.country) newUser.country = user.country;
          if (user.city) newUser.city = user.city;

          delete newUser.password;
          delete newUser.isAdmin;

          return newUser;
        }
      }

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideGuard(AuthGuard)
        .useClass(MockAuthGuard)
        .overrideProvider(AuthService)
        .useClass(MockAuthService)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('Post /signup', () => {
      it('should return an OK status code and the new User', async () => {
        let mockNewUser = {
          id: '4a5b6c7d-4567-8901-2131-415161718191',
          name: 'Bob Williams',
          email: 'bob.williams@example.com',
          password: 'hashedpassword4',
          isAdmin: true,
          phone: 9879879876,
          address: '101 Birch Blvd',
          country: 'Australia',
          city: 'Sydney',
          orders: [],
        };

        const res = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(mockNewUser);

        expect(res.status).toBe(201);
      });

      it('should return a Bad Request error with a 400 status code when user already exists', async () => {
        const res = await request(app.getHttpServer())
          .post('/auth/signup')
          .send(mockUser);

        expect(res.status).toBe(400);
      });
    });
  });

  describe('ProductsController', () => {
    beforeEach(async () => {
      let mockProduct: Product = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Laptop',
        description: 'Powerful laptop for all your computing needs',
        price: 999.99,
        stock: 10,
        imgUrl:
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
        category: {
          id: '3d5c15c7-bb10-4fc4-9c7f-f3ab476dfe83',
          name: 'Electronics',
          products: [],
        },
      };

      class MockProductsService extends ProductsService {
        async getProductById(id: string): Promise<Product> {
          if (id !== mockProduct.id)
            throw new NotFoundException('Product not found');

          return mockProduct;
        }
      }

      const moduleFixture: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(ProductsService)
        .useClass(MockProductsService)
        .compile();

      app = moduleFixture.createNestApplication();
      await app.init();
    });

    describe('Get /products/id', () => {
      it('should return an OK status code when called with an id of an existing product', async () => {
        const validId = '123e4567-e89b-12d3-a456-426614174000';

        const res = await request(app.getHttpServer()).get(
          `/products/${validId}`,
        );

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
      });

      it('should return a Not Found error with an status code of 404 when called with an id of product that doesnt exist', async () => {
        const invalidId = '523e4567-e89b-1233-a456-426614174001';

        const res = await request(app.getHttpServer()).get(
          `/products/${invalidId}`,
        );

        expect(res.status).toBe(404);
      });
    });
  });
});
