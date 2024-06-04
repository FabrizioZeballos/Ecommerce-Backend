import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from '../../entities/orders.entity';
import { JwtService } from '@nestjs/jwt';

describe('OrdersController', () => {
  let controller: OrdersController;

  let orderMock: Order = {
    id: '1f4ab3e7-85d1-4a27-a1a7-8f863750c3f1',
    user: {
      id: '2d6ea48b-04b8-45a5-b308-96fd1fde3f65',
      name: 'John Doe',
      email: 'john.doe@example.com',
      password: 'hashedpassword',
      isAdmin: false,
      phone: 1234567890,
      address: '123 Fake Street',
      country: 'Fake Country',
      city: 'Fake City',
      orders: [],
    },
    date: new Date(),
    orderDetail: {
      id: '3cddae99-d7f5-41e6-9b2e-1872dbecb86e',
      price: 99.99,
      products: [
        {
          id: '4a914285-93e0-4d82-9ff3-3ae476b0e53c',
          name: 'Product 1',
          description: 'Description of Product 1',
          price: 19.99,
          stock: 100,
          imgUrl: 'https://example.com/product1.jpg',
          category: {
            id: 'fake-category-id-1',
            name: 'Category 1',
            products: [],
          },
        },
        {
          id: '5f79c6c9-1168-458a-a28b-7bb05a131e0f',
          name: 'Product 2',
          description: 'Description of Product 2',
          price: 29.99,
          stock: 50,
          imgUrl: 'https://example.com/product2.jpg',
          category: {
            id: 'fake-category-id-2',
            name: 'Category 2',
            products: [],
          },
        },
      ],
    },
  };

  let serviceMock: Partial<OrdersService> = {
    getOrder: (id: string): Promise<Order> => Promise.resolve(orderMock),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        JwtService,
        { provide: OrdersService, useValue: serviceMock },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOrder', () => {
    it('should return an Order', async () => {
      const id = '6e98f1c7-7123-4f8c-b6b9-98a721dfc42d';

      const result = await controller.getOrder(id);
      expect(result).toEqual(orderMock);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
